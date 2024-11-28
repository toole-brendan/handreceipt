import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import { useTransferQueue } from '../hooks/useTransferQueue';
import HandReceiptModule, { Property } from '../native/HandReceiptMobile';
import { NavigationProp, RoutePropType } from '../types/navigation';
import { SyncStatus } from '../types/sync';

interface Props {
  navigation: NavigationProp<'TransferConfirmation'>;
  route: RoutePropType<'TransferConfirmation'>;
}

const TransferConfirmation: React.FC<Props> = ({ navigation, route }) => {
  const { transferId, propertyId, fromUser, toUser, timestamp } = route.params;
  const { user } = useAuth();
  const { queue } = useTransferQueue();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPropertyDetails();
  }, [propertyId]);

  const loadPropertyDetails = async () => {
    try {
      const details = await HandReceiptModule.getPropertyDetails(propertyId);
      setProperty(details);
    } catch (error) {
      console.error('Failed to load property details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransferStatus = () => {
    const transfer = queue.find(t => t.id === transferId);
    return transfer?.status || SyncStatus.COMPLETED;
  };

  const renderStatus = () => {
    const status = getTransferStatus();
    let color = '#4CAF50'; // Success green
    let icon = 'check-circle';
    let text = 'Transfer Complete';

    switch (status) {
      case SyncStatus.PENDING:
        color = '#FF9500';
        icon = 'clock-outline';
        text = 'Transfer Pending';
        break;
      case SyncStatus.SYNCING:
        color = '#007AFF';
        icon = 'sync';
        text = 'Syncing...';
        break;
      case SyncStatus.FAILED:
        color = '#FF3B30';
        icon = 'alert-circle';
        text = 'Transfer Failed';
        break;
    }

    return (
      <View style={[styles.status, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="#fff" />
        <Text style={styles.statusText}>{text}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderStatus()}

      <View style={styles.content}>
        <View style={styles.propertyInfo}>
          <Text style={styles.label}>Property</Text>
          <Text style={styles.propertyName}>{property?.name}</Text>
          <Text style={styles.propertyDetails}>
            NSN: {property?.nsn} • SN: {property?.serialNumber}
          </Text>
        </View>

        <View style={styles.transferInfo}>
          <View style={styles.userInfo}>
            <Icon name="account-arrow-right" size={24} color="#666" />
            <View style={styles.userDetails}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>{fromUser}</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Icon name="account-arrow-left" size={24} color="#666" />
            <View style={styles.userDetails}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{toUser}</Text>
            </View>
          </View>

          <View style={styles.timestampInfo}>
            <Icon name="clock-outline" size={20} color="#666" />
            <Text style={styles.timestamp}>
              {format(new Date(timestamp), 'MMM d, yyyy h:mm a')}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('PropertyList')}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
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
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  propertyInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  propertyDetails: {
    color: '#666',
    fontSize: 14,
  },
  transferInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetails: {
    marginLeft: 12,
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestampInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  timestamp: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TransferConfirmation; 