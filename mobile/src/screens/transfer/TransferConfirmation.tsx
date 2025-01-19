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
import { useAuth } from '../../hooks/useAuth';
import { useTransferQueue, QueuedTransfer, TransferStatus as QueueStatus } from '../../hooks/useTransferQueue';
import HandReceiptModule, { Property } from '../../native/HandReceiptMobile';
import { TransferStackNavigationProp, TransferRouteProps } from '../../types/navigation';
import { SyncStatus, Transfer, TransferStatus } from '../../types/sync';

interface Props {
  navigation: TransferStackNavigationProp;
  route: TransferRouteProps<'TransferConfirmation'>;
}

export const TransferConfirmationScreen = ({ navigation, route }: Props) => {
  const { transferId } = route.params;
  const { user } = useAuth();
  const { queue } = useTransferQueue();
  const [property, setProperty] = useState<Property | null>(null);
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransferDetails();
  }, [transferId]);

  const loadTransferDetails = async () => {
    try {
      setLoading(true);
      const [transferDetails, propertyDetails] = await Promise.all([
        HandReceiptModule.getTransfer(transferId),
        HandReceiptModule.getPropertyDetails(transfer?.propertyId || '')
      ]);
      setTransfer(transferDetails);
      setProperty(propertyDetails);
    } catch (error) {
      console.error('Failed to load transfer details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransferStatus = () => {
    const queuedTransfer = queue.find(t => t.id === transferId);
    if (queuedTransfer) {
      switch (queuedTransfer.status) {
        case QueueStatus.PENDING:
          return TransferStatus.Pending;
        case QueueStatus.SYNCING:
          return TransferStatus.Pending;
        case QueueStatus.FAILED:
          return TransferStatus.Rejected;
        case QueueStatus.COMPLETED:
          return TransferStatus.Approved;
      }
    }
    return TransferStatus.Approved;
  };

  const renderStatus = () => {
    const status = getTransferStatus();
    let color = '#4CAF50'; // Success green for Approved
    let icon = 'check-circle';
    let text = 'Transfer Complete';

    switch (status) {
      case TransferStatus.Pending:
        color = '#FF9500';
        icon = 'clock-outline';
        text = 'Transfer Pending';
        break;
      case TransferStatus.Rejected:
        color = '#FF3B30';
        icon = 'alert-circle';
        text = 'Transfer Failed';
        break;
      case TransferStatus.Approved:
        // Default values already set
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

  if (!transfer || !property) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Transfer not found</Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.buttonText}>Back to Scanner</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderStatus()}

      <View style={styles.content}>
        <View style={styles.propertyInfo}>
          <Text style={styles.label}>Property</Text>
          <Text style={styles.propertyName}>{property.name}</Text>
          <Text style={styles.propertyDetails}>
            NSN: {property.nsn} • SN: {property.serialNumber}
          </Text>
        </View>

        <View style={styles.transferInfo}>
          <View style={styles.userInfo}>
            <Icon name="account-arrow-right" size={24} color="#666" />
            <View style={styles.userDetails}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>{transfer.fromUserId}</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Icon name="account-arrow-left" size={24} color="#666" />
            <View style={styles.userDetails}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{transfer.toUserId}</Text>
            </View>
          </View>

          <View style={styles.timestampInfo}>
            <Icon name="clock-outline" size={20} color="#666" />
            <Text style={styles.timestamp}>
              {format(new Date(transfer.createdAt), 'MMM d, yyyy h:mm a')}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('Scanner')}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 12,
    marginBottom: 24,
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

export default TransferConfirmationScreen; 