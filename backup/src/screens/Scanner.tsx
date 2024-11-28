import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AppState,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useTransferQueue, TransferStatus } from '../hooks/useTransferQueue';
import HandReceiptModule from '../native/HandReceiptMobile';
import { NavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: NavigationProp<'Scanner'>;
}

const Scanner: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const {
    queue,
    syncing,
    addToQueue,
    syncQueue,
    retryFailedTransfers,
    pendingCount,
    failedCount,
  } = useTransferQueue();
  const [scanning, setScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  // Monitor app state for background/foreground transitions
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active' && isOnline) {
      syncQueue();
    }
  };

  const handleScan = async ({ data }: { data: string }) => {
    if (scanning || !user) return;
    setScanning(true);

    try {
      // Validate QR code format and signature locally
      const scanResult = await HandReceiptModule.scanQR(data);
      
      // Get property details
      const property = await HandReceiptModule.getPropertyDetails(scanResult.propertyId);

      // Create transfer record
      const transfer = {
        id: scanResult.transferId,
        propertyId: scanResult.propertyId,
        fromUserId: property.currentHolder,
        toUserId: user.id,
        timestamp: new Date().toISOString(),
        signature: scanResult.signature,
      };

      // Add to queue (will be synced immediately if online)
      await addToQueue(transfer);

      // Navigate to confirmation
      navigation.navigate('TransferConfirmation', {
        transferId: transfer.id,
        propertyId: property.id,
        fromUser: property.currentHolder,
        toUser: user.id,
        timestamp: transfer.timestamp,
      });

      // Show appropriate status message
      if (!isOnline) {
        Alert.alert(
          'Offline Mode',
          'Transfer saved and will be processed when connection is restored.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Scan Error',
        error instanceof Error ? error.message : 'Failed to process QR code'
      );
    } finally {
      setScanning(false);
    }
  };

  const handleRetryFailed = () => {
    if (failedCount > 0) {
      Alert.alert(
        'Retry Failed Transfers',
        'Do you want to retry all failed transfers?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Retry',
            onPress: retryFailedTransfers,
          },
        ]
      );
    }
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan QR Code</Text>
        {scanning && <ActivityIndicator color="#007AFF" />}
      </View>

      {/* Status Banner */}
      {(!isOnline || pendingCount > 0 || failedCount > 0) && (
        <View style={styles.statusBanner}>
          {!isOnline && (
            <View style={styles.statusItem}>
              <Icon name="cloud-off-outline" size={16} color="#fff" />
              <Text style={styles.statusText}>Offline Mode</Text>
            </View>
          )}
          {pendingCount > 0 && (
            <View style={styles.statusItem}>
              <Icon name="clock-outline" size={16} color="#fff" />
              <Text style={styles.statusText}>{pendingCount} pending</Text>
            </View>
          )}
          {failedCount > 0 && (
            <TouchableOpacity
              style={styles.statusItem}
              onPress={handleRetryFailed}
            >
              <Icon name="alert-outline" size={16} color="#fff" />
              <Text style={styles.statusText}>{failedCount} failed</Text>
            </TouchableOpacity>
          )}
          {syncing && (
            <View style={styles.statusItem}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.statusText}>Syncing...</Text>
            </View>
          )}
        </View>
      )}

      <QRCodeScanner
        onRead={handleScan}
        flashMode={
          flashOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <Text style={styles.instructions}>
            Align QR code within the frame to scan
          </Text>
        }
        bottomContent={
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              <Icon
                name={flashOn ? 'flashlight' : 'flashlight-off'}
                size={24}
                color="#007AFF"
              />
              <Text style={styles.controlText}>
                {flashOn ? 'Flash On' : 'Flash Off'}
              </Text>
            </TouchableOpacity>
          </View>
        }
        reactivate={true}
        reactivateTimeout={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBanner: {
    flexDirection: 'row',
    backgroundColor: '#FF9500',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statusText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  instructions: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  controlText: {
    color: '#007AFF',
    marginTop: 4,
    fontSize: 12,
  },
});

export default Scanner; 