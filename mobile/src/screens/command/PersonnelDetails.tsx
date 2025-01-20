import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../hooks/useAuth';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { CommandRouteProps, CommandScreenNavigationProp } from '../../types/navigation';
import HandReceiptModule from '../../native/HandReceiptMobile';

interface PersonnelDetails {
  id: string;
  name: string;
  rank: string;
  unit: string;
  role: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

interface AssignedItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  value: number;
  dateAssigned: string;
  isSensitive: boolean;
}

interface TransferActivity {
  id: string;
  date: string;
  type: 'incoming' | 'outgoing';
  itemName: string;
  withPerson: string;
  status: 'completed' | 'pending' | 'rejected';
}

export const PersonnelDetailsScreen = () => {
  const route = useRoute<CommandRouteProps<'PersonnelDetails'>>();
  const navigation = useNavigation<CommandScreenNavigationProp>();
  const { user } = useAuth();
  const { personnelId } = route.params;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [details, setDetails] = useState<PersonnelDetails | null>(null);
  const [assignedItems, setAssignedItems] = useState<AssignedItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<TransferActivity[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [personnelData, items, activity] = await Promise.all([
        HandReceiptModule.getPersonnelDetails(personnelId),
        HandReceiptModule.getPersonnelItems(personnelId),
        HandReceiptModule.getPersonnelActivity(personnelId),
      ]);
      setDetails(personnelData);
      setAssignedItems(items);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Failed to load personnel details:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [personnelId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const renderAssignedItem = (item: AssignedItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemCard}
      onPress={() => navigation.navigate('PropertyDetails', { itemId: item.id })}
    >
      <View style={styles.itemHeader}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSerial}>SN: {item.serialNumber}</Text>
        </View>
        <Text style={styles.itemValue}>${item.value.toLocaleString()}</Text>
      </View>
      <View style={styles.itemFooter}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemDate}>Assigned: {item.dateAssigned}</Text>
        {item.isSensitive && (
          <View style={styles.sensitiveTag}>
            <Icon name="security" size={12} color="#F44336" />
            <Text style={styles.sensitiveText}>Sensitive</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderActivityItem = (activity: TransferActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <Icon
        name={activity.type === 'incoming' ? 'arrow-downward' : 'arrow-upward'}
        size={24}
        color={activity.type === 'incoming' ? '#4CAF50' : '#2196F3'}
        style={styles.activityIcon}
      />
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>
          {activity.type === 'incoming' ? 'Received from' : 'Transferred to'} {activity.withPerson}
        </Text>
        <Text style={styles.activitySubtitle}>{activity.itemName}</Text>
        <Text style={styles.activityDate}>{activity.date}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activity.status) }]}>
        <Text style={styles.statusText}>{activity.status}</Text>
      </View>
    </View>
  );

  const getStatusColor = (status: TransferActivity['status']) => {
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

  if (loading || !details) {
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
        <View style={styles.profileSection}>
          {details.photoUrl ? (
            <Image source={{ uri: details.photoUrl }} style={styles.profilePhoto} />
          ) : (
            <View style={[styles.profilePhoto, styles.profilePhotoPlaceholder]}>
              <Icon name="person" size={40} color="#fff" />
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{details.rank} {details.name}</Text>
            <Text style={styles.role}>{details.role}</Text>
            <Text style={styles.unit}>{details.unit}</Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <TouchableOpacity style={styles.contactItem}>
            <Icon name="email" size={20} color="#2196F3" />
            <Text style={styles.contactText}>{details.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Icon name="phone" size={20} color="#2196F3" />
            <Text style={styles.contactText}>{details.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assigned Items ({assignedItems.length})</Text>
        {assignedItems.map(renderAssignedItem)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map(renderActivityItem)}
      </View>
    </ScrollView>
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profilePhotoPlaceholder: {
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  unit: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 4,
  },
  contactInfo: {
    marginTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  contactText: {
    marginLeft: 8,
    color: '#666',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemSerial: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemValue: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
  },
  sensitiveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  sensitiveText: {
    fontSize: 12,
    color: '#F44336',
    marginLeft: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  activityIcon: {
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
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