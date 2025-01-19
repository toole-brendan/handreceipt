import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  PropertyDetails: { itemId: string };
  QRGenerator: { itemId: string };
  History: { itemId: string };
  Maintenance: { itemId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PropertyDetails'>;

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
  description?: string;
  maintenanceHistory?: {
    date: string;
    type: string;
    notes: string;
  }[];
}

export const PropertyDetailsScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [item, setItem] = useState<PropertyItem | null>(null);

  const loadItem = useCallback(async () => {
    try {
      const data = await HandReceiptModule.getPropertyItem({
        itemId: route.params.itemId,
      });
      setItem(data);
    } catch (error) {
      console.error('Failed to load property item:', error);
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [route.params.itemId]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadItem();
  }, [loadItem]);

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

  const renderDetailRow = (label: string, value: string | number | undefined) => {
    if (value === undefined) return null;
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    );
  };

  if (loading || !item) {
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
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>NSN: {item.nsn}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: getStatusColor(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        {renderDetailRow('Serial Number', item.serialNumber)}
        {renderDetailRow('Category', `${item.category}${item.subCategory ? ` / ${item.subCategory}` : ''}`)}
        {renderDetailRow('Value', `$${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`)}
        {renderDetailRow('Assigned To', item.assignedTo)}
        {renderDetailRow('Last Inventory', item.lastInventory ? new Date(item.lastInventory).toLocaleDateString() : undefined)}
        {renderDetailRow('Description', item.description)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('QRGenerator', { itemId: item.id })}
          >
            <Icon name="qr-code" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('History', { itemId: item.id })}
          >
            <Icon name="clock" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Maintenance', { itemId: item.id })}
          >
            <Icon name="tool" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Maintenance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.maintenanceHistory && item.maintenanceHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Maintenance</Text>
          {item.maintenanceHistory.map((record, index) => (
            <View key={index} style={styles.maintenanceRecord}>
              <View style={styles.maintenanceHeader}>
                <Text style={styles.maintenanceDate}>{record.date}</Text>
                <Text style={styles.maintenanceType}>{record.type}</Text>
              </View>
              <Text style={styles.maintenanceNotes}>{record.notes}</Text>
            </View>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    flex: 2,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 12,
    color: '#2196F3',
  },
  maintenanceRecord: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  maintenanceDate: {
    fontSize: 12,
    color: '#666',
  },
  maintenanceType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196F3',
  },
  maintenanceNotes: {
    fontSize: 14,
    color: '#000',
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