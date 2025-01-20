import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../hooks/useAuth';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { CommandRouteProps, CommandScreenNavigationProp } from '../../types/navigation';
import HandReceiptModule from '../../native/HandReceiptMobile';

interface Personnel {
  id: string;
  name: string;
  rank: string;
  role: string;
  itemCount: number;
}

interface PropertySummary {
  category: string;
  count: number;
  value: number;
  sensitiveCount: number;
}

interface TransferRecord {
  id: string;
  date: string;
  type: 'incoming' | 'outgoing';
  items: number;
  from: string;
  to: string;
  status: 'pending' | 'completed' | 'rejected';
}

type ListItem = Personnel | PropertySummary | TransferRecord;

const getItemId = (item: ListItem): string => {
  if ('rank' in item) {
    return item.id;
  } else if ('category' in item) {
    return item.category;
  } else {
    return item.id;
  }
};

export const UnitDetailsScreen = () => {
  const route = useRoute<CommandRouteProps<'UnitDetails'>>();
  const navigation = useNavigation<CommandScreenNavigationProp>();
  const { user } = useAuth();
  const { unitId } = route.params;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [propertySummary, setPropertySummary] = useState<PropertySummary[]>([]);
  const [recentTransfers, setRecentTransfers] = useState<TransferRecord[]>([]);
  const [selectedTab, setSelectedTab] = useState<'personnel' | 'property' | 'transfers'>('personnel');

  const loadData = useCallback(async () => {
    try {
      const [personnelData, propertyData, transfersData] = await Promise.all([
        HandReceiptModule.getUnitPersonnel(unitId),
        HandReceiptModule.getUnitPropertySummary(unitId),
        HandReceiptModule.getUnitTransfers(unitId),
      ]);
      setPersonnel(personnelData);
      setPropertySummary(propertyData);
      setRecentTransfers(transfersData);
    } catch (error) {
      console.error('Failed to load unit details:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [unitId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const renderPersonnelItem = ({ item }: { item: Personnel }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('PersonnelDetails', { personnelId: item.id })}
    >
      <View style={styles.listItemContent}>
        <View>
          <Text style={styles.primaryText}>{item.rank} {item.name}</Text>
          <Text style={styles.secondaryText}>{item.role}</Text>
        </View>
        <View style={styles.itemCount}>
          <Text style={styles.itemCountText}>{item.itemCount} items</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPropertyItem = ({ item }: { item: PropertySummary }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <View>
          <Text style={styles.primaryText}>{item.category}</Text>
          <Text style={styles.secondaryText}>{item.count} items</Text>
        </View>
        <View>
          <Text style={styles.valueText}>${item.value.toLocaleString()}</Text>
          {item.sensitiveCount > 0 && (
            <View style={styles.sensitiveTag}>
              <Icon name="security" size={12} color="#F44336" />
              <Text style={styles.sensitiveText}>{item.sensitiveCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderTransferItem = ({ item }: { item: TransferRecord }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('TransferDetails', { transferId: item.id })}
    >
      <View style={styles.listItemContent}>
        <View>
          <Text style={styles.primaryText}>
            <Icon 
              name={item.type === 'incoming' ? 'arrow-downward' : 'arrow-upward'} 
              size={16} 
              color={item.type === 'incoming' ? '#4CAF50' : '#2196F3'} 
            />
            {' '}
            {item.type === 'incoming' ? 'From' : 'To'} {item.type === 'incoming' ? item.from : item.to}
          </Text>
          <Text style={styles.secondaryText}>{item.date} • {item.items} items</Text>
        </View>
        <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status: TransferRecord['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'rejected':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    if ('rank' in item) {
      return renderPersonnelItem({ item: item as Personnel });
    } else if ('category' in item) {
      return renderPropertyItem({ item: item as PropertySummary });
    } else {
      return renderTransferItem({ item: item as TransferRecord });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'personnel' && styles.activeTab]}
          onPress={() => setSelectedTab('personnel')}
        >
          <Text style={[styles.tabText, selectedTab === 'personnel' && styles.activeTabText]}>
            Personnel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'property' && styles.activeTab]}
          onPress={() => setSelectedTab('property')}
        >
          <Text style={[styles.tabText, selectedTab === 'property' && styles.activeTabText]}>
            Property
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'transfers' && styles.activeTab]}
          onPress={() => setSelectedTab('transfers')}
        >
          <Text style={[styles.tabText, selectedTab === 'transfers' && styles.activeTabText]}>
            Transfers
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList<ListItem>
        data={
          selectedTab === 'personnel' ? personnel :
          selectedTab === 'property' ? propertySummary :
          recentTransfers
        }
        renderItem={renderItem}
        keyExtractor={getItemId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  primaryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCountText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  valueText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  sensitiveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  sensitiveText: {
    fontSize: 12,
    color: '#F44336',
    marginLeft: 4,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
}); 