import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import HandReceiptModule from '../native/HandReceiptMobile';
import { NavigationProp, RoutePropType } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: NavigationProp<'PropertyDetails'>;
  route: RoutePropType<'PropertyDetails'>;
}

const PropertyDetails: React.FC<Props> = ({ navigation, route }) => {
  const { propertyId, canEdit } = route.params;
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    loadPropertyDetails();
  }, [propertyId]);

  const loadPropertyDetails = async () => {
    try {
      const details = await HandReceiptModule.getPropertyDetails(propertyId);
      setProperty(details);
    } catch (error) {
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigation.navigate('TransactionHistory', { propertyId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <Text>Property not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{property.name}</Text>
        <Text style={styles.nsn}>NSN: {property.nsn}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Serial Number:</Text>
          <Text style={styles.value}>{property.serialNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Current Holder:</Text>
          <Text style={styles.value}>{property.currentHolder}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{property.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Condition:</Text>
          <Text style={styles.value}>{property.condition}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewHistory}
        >
          <Icon name="history" size={24} color="#007AFF" />
          <Text style={styles.actionText}>View History</Text>
        </TouchableOpacity>

        {canEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('QRGenerator', { propertyId })}
          >
            <Icon name="qrcode" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Generate QR</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nsn: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    marginTop: 4,
    color: '#007AFF',
  },
});

export default PropertyDetails; 