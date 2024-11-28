import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import HandReceiptModule from '../native/HandReceiptMobile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UnitStats {
  totalItems: number;
  activeTransfers: number;
  itemsByType: { [key: string]: number };
  transfersByMonth: { [key: string]: number };
  topHolders: Array<{ name: string; itemCount: number }>;
}

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UnitStats | null>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const loadAnalytics = async () => {
    if (!user?.unit) return;

    setLoading(true);
    try {
      const unitStats = await HandReceiptModule.getUnitAnalytics({
        unit: user.unit,
        timeframe,
      });
      setStats(unitStats);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load analytics</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Time Range Selector */}
      <View style={styles.timeframeSelector}>
        <TouchableOpacity
          style={[styles.timeButton, timeframe === 'week' && styles.activeTimeButton]}
          onPress={() => setTimeframe('week')}
        >
          <Text style={[styles.timeButtonText, timeframe === 'week' && styles.activeTimeButtonText]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeButton, timeframe === 'month' && styles.activeTimeButton]}
          onPress={() => setTimeframe('month')}
        >
          <Text style={[styles.timeButtonText, timeframe === 'month' && styles.activeTimeButtonText]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeButton, timeframe === 'year' && styles.activeTimeButton]}
          onPress={() => setTimeframe('year')}
        >
          <Text style={[styles.timeButtonText, timeframe === 'year' && styles.activeTimeButtonText]}>
            Year
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overview Cards */}
      <View style={styles.overviewContainer}>
        <View style={styles.card}>
          <Icon name="package-variant" size={24} color="#007AFF" />
          <Text style={styles.cardValue}>{stats.totalItems}</Text>
          <Text style={styles.cardLabel}>Total Items</Text>
        </View>
        <View style={styles.card}>
          <Icon name="swap-horizontal" size={24} color="#4CAF50" />
          <Text style={styles.cardValue}>{stats.activeTransfers}</Text>
          <Text style={styles.cardLabel}>Active Transfers</Text>
        </View>
      </View>

      {/* Top Property Holders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Property Holders</Text>
        {stats.topHolders.map((holder, index) => (
          <View key={index} style={styles.holderRow}>
            <Text style={styles.holderName}>{holder.name}</Text>
            <Text style={styles.holderCount}>{holder.itemCount} items</Text>
          </View>
        ))}
      </View>

      {/* Property Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Distribution</Text>
        {Object.entries(stats.itemsByType).map(([type, count], index) => (
          <View key={index} style={styles.distributionRow}>
            <Text style={styles.distributionLabel}>{type}</Text>
            <View style={styles.distributionBarContainer}>
              <View
                style={[
                  styles.distributionBar,
                  {
                    width: `${(count / stats.totalItems) * 100}%`,
                    backgroundColor: '#007AFF',
                  },
                ]}
              />
            </View>
            <Text style={styles.distributionCount}>{count}</Text>
          </View>
        ))}
      </View>

      {/* Transfer Activity */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Transfer Activity</Text>
        {Object.entries(stats.transfersByMonth).map(([month, count], index) => (
          <View key={index} style={styles.activityRow}>
            <Text style={styles.activityMonth}>{month}</Text>
            <Text style={styles.activityCount}>{count} transfers</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeframeSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimeButton: {
    backgroundColor: '#007AFF',
  },
  timeButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTimeButtonText: {
    color: '#fff',
  },
  overviewContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardLabel: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
  },
  lastSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  holderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  holderName: {
    fontSize: 16,
  },
  holderCount: {
    fontSize: 16,
    color: '#666',
  },
  distributionRow: {
    marginBottom: 12,
  },
  distributionLabel: {
    marginBottom: 4,
  },
  distributionBarContainer: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 4,
  },
  distributionBar: {
    height: '100%',
    borderRadius: 4,
  },
  distributionCount: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityMonth: {
    fontSize: 16,
  },
  activityCount: {
    fontSize: 16,
    color: '#666',
  },
});

export default Analytics; 