import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const SCREEN_WIDTH = Dimensions.get('window').width;

type ReportType = 'property' | 'maintenance' | 'audit' | 'security';

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

interface AnalyticsData {
  totalItems: number;
  activeTransfers: number;
  topHolders: Array<{ name: string; itemCount: number }>;
  transfersByMonth: Record<string, number>;
}

export const AnalyticsScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportType>('property');
  const [stats, setStats] = useState<StatCard[]>([]);

  const loadAnalytics = useCallback(async () => {
    try {
      const data: AnalyticsData = await HandReceiptModule.getUnitAnalytics({
        unit: user?.unit || '',
        timeframe: 'month',
      });

      setStats([
        {
          title: 'Total Items',
          value: data.totalItems,
          icon: 'box',
          color: '#2196F3',
        },
        {
          title: 'Active Transfers',
          value: data.activeTransfers,
          icon: 'refresh-cw',
          color: '#4CAF50',
        },
        {
          title: 'Top Holder',
          value: data.topHolders[0]?.name || 'N/A',
          icon: 'user',
          color: '#FF9800',
        },
        {
          title: 'Monthly Transfers',
          value: Object.values(data.transfersByMonth).reduce((a, b) => a + b, 0),
          icon: 'trending-up',
          color: '#9C27B0',
        },
      ]);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadAnalytics();
  }, [loadAnalytics]);

  const renderStatCard = ({ title, value, icon, color }: StatCard) => (
    <View 
      style={[
        styles.card,
        { borderLeftWidth: 4, borderLeftColor: color }
      ]}
      key={title}
    >
      <View style={styles.cardHeader}>
        <Icon name={icon} size={24} color={color} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  const renderReportTab = (type: ReportType, label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.reportTab,
        selectedReport === type && styles.reportTabActive
      ]}
      onPress={() => setSelectedReport(type)}
    >
      <Icon 
        name={icon} 
        size={20} 
        color={selectedReport === type ? '#2196F3' : '#666'} 
      />
      <Text 
        style={[
          styles.reportTabText,
          selectedReport === type && styles.reportTabTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>{user?.unit || 'All Units'}</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.reportTabs}
      >
        {renderReportTab('property', 'Property', 'box')}
        {renderReportTab('maintenance', 'Maintenance', 'tool')}
        {renderReportTab('audit', 'Audit', 'clipboard')}
        {renderReportTab('security', 'Security', 'shield')}
      </ScrollView>

      <View style={styles.statsGrid}>
        {stats.map(renderStatCard)}
      </View>

      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Icon name="wifi-off" size={16} color="#fff" />
          <Text style={styles.offlineText}>You are currently offline</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  reportTabs: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  reportTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  reportTabActive: {
    backgroundColor: '#e3f2fd',
  },
  reportTabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  reportTabTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  statsGrid: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9800',
    padding: 8,
    marginTop: 16,
  },
  offlineText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
}); 