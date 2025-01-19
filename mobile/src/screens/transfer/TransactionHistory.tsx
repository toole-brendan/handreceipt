import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useAuth } from '../hooks/useAuth';

type RootStackParamList = {
  TransactionHistory: { itemId: string };
};

type TransactionHistoryRouteProp = RouteProp<RootStackParamList, 'TransactionHistory'>;

interface Transfer {
  id: string;
  date: string;
  fromUnit: string;
  toUnit: string;
  type: 'TRANSFER_OUT' | 'TRANSFER_IN';
  status: 'PENDING' | 'COMPLETED' | 'REJECTED';
  notes?: string;
}

export const TransactionHistoryScreen = () => {
  const route = useRoute<TransactionHistoryRouteProp>();
  const navigation = useNavigation();
  const { isOnline } = useNetworkStatus();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const loadTransfers = useCallback(async () => {
    try {
      const data = await HandReceiptModule.getTransferHistory(route.params.itemId);
      setTransfers(data);
    } catch (error) {
      console.error('Failed to load transfer history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [route.params.itemId]);

  useEffect(() => {
    loadTransfers();
  }, [loadTransfers]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadTransfers();
  }, [loadTransfers]);

  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'COMPLETED':
        return '#4CAF50';
      case 'PENDING':
        return '#FFC107';
      case 'REJECTED':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const renderTransferItem = (transfer: Transfer, index: number) => (
    <View key={transfer.id} style={styles.transferItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineLine} />
        <View style={[styles.timelineDot, { backgroundColor: getStatusColor(transfer.status) }]} />
        {index === transfers.length - 1 && <View style={styles.timelineEnd} />}
      </View>
      
      <View style={styles.transferContent}>
        <Text style={styles.transferDate}>
          {new Date(transfer.date).toLocaleDateString()}
        </Text>
        <View style={styles.transferDetails}>
          <View style={styles.unitFlow}>
            <Text style={styles.unitText}>{transfer.fromUnit}</Text>
            <Icon 
              name={transfer.type === 'TRANSFER_OUT' ? 'arrow-forward' : 'arrow-back'} 
              size={20} 
              color="#666"
            />
            <Text style={styles.unitText}>{transfer.toUnit}</Text>
          </View>
          <View style={[styles.statusBadge, { borderColor: getStatusColor(transfer.status) }]}>
            <Text style={[styles.statusText, { color: getStatusColor(transfer.status) }]}>
              {transfer.status}
            </Text>
          </View>
        </View>
        {transfer.notes && (
          <Text style={styles.notes}>{transfer.notes}</Text>
        )}
      </View>
    </View>
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      {transfers.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="history" size={48} color="#9E9E9E" />
          <Text style={styles.emptyText}>No transfer history found</Text>
        </View>
      ) : (
        <View style={styles.timeline}>
          {transfers.map((transfer, index) => renderTransferItem(transfer, index))}
        </View>
      )}

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  timeline: {
    padding: 16,
  },
  transferItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#e0e0e0',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
    marginTop: 6,
  },
  timelineEnd: {
    position: 'absolute',
    bottom: 0,
    width: 2,
    height: '50%',
    backgroundColor: '#fff',
  },
  transferContent: {
    flex: 1,
  },
  transferDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  transferDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  unitFlow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
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