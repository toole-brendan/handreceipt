import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
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
        <Text style={styles.errorText}>Property not found</Text>
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
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#666',
    fontSize: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
    backgroundColor: '#1C1C1E',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 4,
    color: '#FFF',
    fontFamily: 'AllianceNo2-Medium',
  },
  nsn: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'AllianceNo2-Medium',
  },
  section: {
    padding: 16,
    backgroundColor: '#1C1C1E',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 16,
    color: '#FFF',
    fontFamily: 'AllianceNo2-Medium',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'AllianceNo2-Medium',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'AllianceNo2-Medium',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1C1C1E',
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    marginTop: 4,
    color: '#007AFF',
    fontFamily: 'AllianceNo2-Medium',
  },
});

export default PropertyDetails; 