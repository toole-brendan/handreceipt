import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Share, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from 'react-native-paper';

import { Screen } from '../../components/layout/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/feedback/Loading';
import { ErrorMessage } from '../../components/feedback/ErrorMessage';

import HandReceiptModule from '../../native/HandReceiptMobile';
import { useAuth } from '../../hooks/useAuth';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { ReportsStackNavigationProp, ReportsRouteProps } from '../../types/navigation';

type ClassificationLevel = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

interface Report {
  id: string;
  name: string;
  content: string;
  classification: ClassificationLevel;
  generatedDate: string;
  generatedBy: {
    id: string;
    name: string;
    rank: string;
  };
  metadata: {
    version: string;
    hash: string;
    signatures: string[];
  };
}

export const ReportViewerScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<ReportsStackNavigationProp>();
  const route = useRoute<ReportsRouteProps<'ReportViewer'>>();
  
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, [route.params?.reportId]);

  const loadReport = async () => {
    if (!route.params?.reportId) return;

    try {
      setLoading(true);
      setError('');
      const data = await HandReceiptModule.getReport({
        reportId: route.params.reportId,
        clearanceLevel: user?.clearanceLevel,
      });
      setReport(data);

      // Log access for audit trail
      await HandReceiptModule.logAudit({
        action: 'VIEW_REPORT',
        resourceId: route.params.reportId,
        resourceType: 'REPORT',
        classification: data.classification,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load report';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!report) return;

    try {
      await Share.share({
        title: report.name,
        message: `Report: ${report.name}\nGenerated: ${new Date(report.generatedDate).toLocaleString()}\nBy: ${report.generatedBy.rank} ${report.generatedBy.name}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share report');
    }
  };

  const handlePrint = async () => {
    if (!report) return;

    try {
      await HandReceiptModule.printReport({
        reportId: report.id,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to print report');
    }
  };

  const getClassificationIcon = (classification: ClassificationLevel) => {
    switch (classification) {
      case 'UNCLASSIFIED':
        return 'unlock';
      case 'CONFIDENTIAL':
        return 'lock';
      case 'SECRET':
        return 'shield';
      case 'TOP_SECRET':
        return 'shield-off';
      default:
        return 'help-circle';
    }
  };

  if (loading) {
    return <Loading message="Loading report..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadReport} />;
  }

  if (!report) {
    return <ErrorMessage message="Report not found" />;
  }

  return (
    <Screen
      title={report.name}
      rightAction={{
        icon: 'share-2',
        onPress: handleShare,
      }}
    >
      <View style={[
        styles.classificationBanner,
        styles[`classification${report.classification}Banner`],
      ]}>
        <Icon 
          name={getClassificationIcon(report.classification)}
          size={16}
          color="#666"
          style={styles.classificationIcon}
        />
        <Text style={styles.classificationText}>{report.classification}</Text>
      </View>

      <ScrollView>
        <Card
          title="Report Details"
          icon="info"
          style={styles.section}
        >
          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <View style={styles.metadataLabel}>
                <Icon name="calendar" size={14} color="#666" style={styles.metadataIcon} />
                <Text style={styles.metadataLabelText}>Generated:</Text>
              </View>
              <Text style={styles.metadataValue}>
                {new Date(report.generatedDate).toLocaleString()}
              </Text>
            </View>

            <View style={styles.metadataItem}>
              <View style={styles.metadataLabel}>
                <Icon name="user" size={14} color="#666" style={styles.metadataIcon} />
                <Text style={styles.metadataLabelText}>By:</Text>
              </View>
              <Text style={styles.metadataValue}>
                {report.generatedBy.rank} {report.generatedBy.name}
              </Text>
            </View>

            <View style={styles.metadataItem}>
              <View style={styles.metadataLabel}>
                <Icon name="tag" size={14} color="#666" style={styles.metadataIcon} />
                <Text style={styles.metadataLabelText}>Version:</Text>
              </View>
              <Text style={styles.metadataValue}>{report.metadata.version}</Text>
            </View>
          </View>
        </Card>

        <Card
          title="Content"
          icon="file-text"
          style={styles.section}
        >
          <Text style={styles.content}>{report.content}</Text>
        </Card>

        <Card
          title="Verification"
          icon="shield"
          style={styles.section}
        >
          <View style={styles.codeBlock}>
            <Icon name="key" size={14} color="#666" style={styles.codeIcon} />
            <Text style={styles.codeText}>Hash: {report.metadata.hash}</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            <Icon name="check-circle" size={14} color="#666" style={styles.subtitleIcon} />
            Digital Signatures
          </Text>
          {report.metadata.signatures.map((signature, index) => (
            <View key={index} style={styles.codeBlock}>
              <Icon name="check" size={14} color="#666" style={styles.codeIcon} />
              <Text style={styles.codeText}>{signature}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            icon="printer"
            onPress={handlePrint}
            style={styles.actionButton}
          >
            Print Report
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  classificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  classificationIcon: {
    marginRight: 8,
  },
  classificationUNCLASSIFIEDBanner: {
    backgroundColor: '#E8F5E9',
  },
  classificationCONFIDENTIALBanner: {
    backgroundColor: '#E3F2FD',
  },
  classificationSECRETBanner: {
    backgroundColor: '#FFF3E0',
  },
  classificationTOP_SECRETBanner: {
    backgroundColor: '#FFEBEE',
  },
  classificationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  metadata: {
    gap: 8,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataIcon: {
    marginRight: 4,
  },
  metadataLabelText: {
    color: '#666',
    fontWeight: '600',
  },
  metadataValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  content: {
    lineHeight: 24,
  },
  sectionSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitleIcon: {
    marginRight: 4,
  },
  codeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  codeIcon: {
    marginRight: 8,
  },
  codeText: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  actionButton: {
    minWidth: 200,
  },
});

export default ReportViewerScreen; 