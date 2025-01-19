import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, View, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { ReportsStackNavigationProp } from '../../types/navigation';

type Report = {
  id: string;
  name: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  generatedDate: string;
  status: 'Generated' | 'Processing' | 'Failed';
  type: string;
};

const REPORT_TEMPLATES = {
  PROPERTY_ACCOUNTABILITY: {
    id: 'property_accountability',
    name: 'Property Accountability',
    icon: 'box',
  },
  MAINTENANCE: {
    id: 'maintenance',
    name: 'Maintenance',
    icon: 'tool',
  },
  AUDIT: {
    id: 'audit',
    name: 'Audit',
    icon: 'check-square',
  },
  SECURITY: {
    id: 'security',
    name: 'Security',
    icon: 'shield',
  },
} as const;

type TemplateType = typeof REPORT_TEMPLATES[keyof typeof REPORT_TEMPLATES]['id'];

export const ReportsScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<ReportsStackNavigationProp>();
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(REPORT_TEMPLATES.PROPERTY_ACCOUNTABILITY.id);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await HandReceiptModule.getReports({
        type: selectedTemplate,
        unit: user?.unit || '',
      });
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedTemplate, user]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadReports();
  }, [loadReports]);

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  const handleReportPress = (report: Report) => {
    if (report.status === 'Generated') {
      navigation.navigate('ReportViewer', { reportId: report.id });
    } else {
      setError('Report is not ready for viewing');
    }
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError('');
      await HandReceiptModule.generateReport({
        type: selectedTemplate,
        unit: user?.unit || '',
      });
      await loadReports();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'Generated':
        return 'check-circle';
      case 'Processing':
        return 'clock';
      case 'Failed':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const getClassificationIcon = (classification: Report['classification']) => {
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

  const renderReport = ({ item: report }: { item: Report }) => (
    <Card
      title={report.name}
      subtitle={new Date(report.generatedDate).toLocaleDateString()}
      icon="file-text"
      onPress={() => handleReportPress(report)}
      style={styles.reportCard}
    >
      <View style={styles.reportDetails}>
        <View style={[
          styles.badge,
          styles[`classification${report.classification}`],
        ]}>
          <Icon name={getClassificationIcon(report.classification)} size={14} color="#666" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{report.classification}</Text>
        </View>
        <View style={[
          styles.badge,
          styles[`status${report.status}`],
        ]}>
          <Icon name={getStatusIcon(report.status)} size={14} color="#666" style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{report.status}</Text>
        </View>
      </View>
    </Card>
  );

  if (loading && !refreshing) {
    return <Loading message="Loading reports..." />;
  }

  return (
    <Screen
      title={`Reports - ${user?.unit || 'All Units'}`}
      rightAction={{
        icon: 'plus',
        onPress: handleGenerateReport,
      }}
    >
      <ScrollView
        horizontal
        style={styles.templateList}
        showsHorizontalScrollIndicator={false}
      >
        {Object.values(REPORT_TEMPLATES).map((template) => (
          <Button
            key={template.id}
            mode={template.id === selectedTemplate ? 'contained' : 'outlined'}
            onPress={() => handleTemplateSelect(template.id)}
            icon={template.icon}
            style={styles.templateButton}
            compact
          >
            {template.name}
          </Button>
        ))}
      </ScrollView>

      {error ? (
        <ErrorMessage message={error} onRetry={loadReports} />
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reportList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#2196F3"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="inbox" size={48} color="#666" />
              <Text style={styles.emptyStateText}>No reports found</Text>
            </View>
          }
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  templateList: {
    flexGrow: 0,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  templateButton: {
    marginRight: 8,
  },
  reportCard: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  reportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  classificationUNCLASSIFIED: {
    backgroundColor: '#E8F5E9',
  },
  classificationCONFIDENTIAL: {
    backgroundColor: '#E3F2FD',
  },
  classificationSECRET: {
    backgroundColor: '#FFF3E0',
  },
  classificationTOP_SECRET: {
    backgroundColor: '#FFEBEE',
  },
  statusGenerated: {
    backgroundColor: '#E8F5E9',
  },
  statusProcessing: {
    backgroundColor: '#E3F2FD',
  },
  statusFailed: {
    backgroundColor: '#FFEBEE',
  },
  reportList: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ReportsScreen; 