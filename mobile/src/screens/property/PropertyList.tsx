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
import Icon from 'react-native-vector-icons/MaterialIcons';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SCREEN_WIDTH = Dimensions.get('window').width;

type RootStackParamList = {
  PropertyDetails: { itemId: string };
  QRGenerator: { itemId: string };
  History: { itemId: string };
  Scanner: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  nsn: string;
  status: 'serviceable' | 'unserviceable' | 'damaged' | 'missing';
  category: string;
  subCategory?: string;
  value: number;
  assignedTo?: string;
  lastInventory?: Date;
  notes?: string;
}

export const PropertyListScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<NavigationProp>();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<PropertyItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loadItems = useCallback(async () => {
    try {
      const data = await HandReceiptModule.getPropertyItems({
        unit: user?.unit || '',
      });
      setItems(data);
    } catch (error) {
      console.error('Failed to load property items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadItems();
  }, [loadItems]);

  const handleItemPress = useCallback((item: PropertyItem) => {
    navigation.navigate('PropertyDetails', { itemId: item.id });
  }, [navigation]);

  const getStatusColor = (status: PropertyItem['status']) => {
    switch (status) {
      case 'serviceable':
        return '#4CAF50';
      case 'unserviceable':
        return '#9E9E9E';
      case 'damaged':
        return '#FF9800';
      case 'missing':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const renderPropertyCard = (item: PropertyItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemNsn}>NSN: {item.nsn}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: getStatusColor(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Serial Number</Text>
          <Text style={styles.detailValue}>{item.serialNumber}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category</Text>
          <Text style={styles.detailValue}>
            {item.category}
            {item.subCategory && ` / ${item.subCategory}`}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Value</Text>
          <Text style={styles.detailValue}>
            ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
        </View>

        {item.assignedTo && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Assigned To</Text>
            <Text style={styles.detailValue}>{item.assignedTo}</Text>
          </View>
        )}

        {item.lastInventory && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Inventory</Text>
            <Text style={styles.detailValue}>
              {new Date(item.lastInventory).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('QRGenerator', { itemId: item.id })}
        >
          <Icon name="qr-code" size={20} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('History', { itemId: item.id })}
        >
          <Icon name="clock" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
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
        <Text style={styles.title}>Property List</Text>
        <Text style={styles.subtitle}>{user?.unit || 'All Units'}</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        <TouchableOpacity
          style={[
            styles.categoryTab,
            selectedCategory === 'all' && styles.categoryTabActive
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text 
            style={[
              styles.categoryTabText,
              selectedCategory === 'all' && styles.categoryTabTextActive
            ]}
          >
            All Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryTab,
            selectedCategory === 'weapons' && styles.categoryTabActive
          ]}
          onPress={() => setSelectedCategory('weapons')}
        >
          <Text 
            style={[
              styles.categoryTabText,
              selectedCategory === 'weapons' && styles.categoryTabTextActive
            ]}
          >
            Weapons
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryTab,
            selectedCategory === 'optics' && styles.categoryTabActive
          ]}
          onPress={() => setSelectedCategory('optics')}
        >
          <Text 
            style={[
              styles.categoryTabText,
              selectedCategory === 'optics' && styles.categoryTabTextActive
            ]}
          >
            Optics
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.listContainer}>
        {items
          .filter(item => selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory)
          .map(renderPropertyCard)}
      </View>

      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Icon name="wifi-off" size={16} color="#fff" />
          <Text style={styles.offlineText}>You are currently offline</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Icon name="qr-code-scanner" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  categoryTabs: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  categoryTabActive: {
    backgroundColor: '#e3f2fd',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTabTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemNsn: {
    fontSize: 12,
    color: '#666',
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
  detailsGrid: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
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
  scanButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 