import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import HandReceiptModule from '../native/HandReceiptMobile';
import { NavigationProp, RoutePropType } from '../types/navigation';
import { Transfer } from '../types/sync';

interface Props {
  navigation: NavigationProp<'TransactionHistory'>;
  route: RoutePropType<'TransactionHistory'>;
}

const TransactionHistory: React.FC<Props> = ({ route }) => {
  const { propertyId, userId } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    loadTransferHistory();
  }, [propertyId, userId]);

  const loadTransferHistory = async () => {
    try {
      const history = await HandReceiptModule.getTransferHistory({
        propertyId,
        userId,
      });
      setTransfers(history);
    } catch (error) {
      console.error('Failed to load transfer history:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransferItem = ({ item }: { item: Transfer }) => (
    <View style={styles.transferItem}>
      <View style={styles.transferHeader}>
        <Text style={styles.timestamp}>
          {format(new Date(item.timestamp), 'MMM d, yyyy h:mm a')}
        </Text>
        <View style={[styles.status, { backgroundColor: item.status === 'COMPLETED' ? '#4CAF50' : '#FFC107' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.transferDetails}>
        <View style={styles.userInfo}>
          <Icon name="account-arrow-right" size={24} color="#666" />
          <View style={styles.userTexts}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{item.fromUser}</Text>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Icon name="account-arrow-left" size={24} color="#666" />
          <View style={styles.userTexts}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{item.toUser}</Text>
          </View>
        </View>

        {item.location && (
          <View style={styles.locationInfo}>
            <Icon name="map-marker" size={20} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transfers}
        renderItem={renderTransferItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transfer history found</Text>
          </View>
        )}
      />
    </View>
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
  list: {
    padding: 16,
  },
  transferItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transferHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  transferDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userTexts: {
    marginLeft: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 8,
    color: '#666',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});

export default TransactionHistory; 