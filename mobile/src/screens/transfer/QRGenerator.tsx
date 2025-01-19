import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  QRGenerator: { itemId?: string };
  PropertyDetails: { itemId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'QRGenerator'>;

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  nsn: string;
  category: string;
  value: number;
}

interface QRData {
  id: string;
  data: string;
  itemName: string;
  serialNumber: string;
  createdAt: string;
}

export const QRGeneratorScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PropertyItem | null>(null);
  const [qrData, setQRData] = useState<QRData | null>(null);
  const [searchResults, setSearchResults] = useState<PropertyItem[]>([]);

  useEffect(() => {
    if (route.params?.itemId) {
      loadItem(route.params.itemId);
    }
  }, [route.params?.itemId]);

  const loadItem = async (itemId: string) => {
    try {
      setLoading(true);
      const data = await HandReceiptModule.getPropertyItem({
        itemId: itemId,
      });
      setSelectedItem(data);
      generateQRCode(data);
    } catch (error) {
      console.error('Failed to load property item:', error);
      Alert.alert('Error', 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await HandReceiptModule.searchPropertyItems({
        query: query,
        unit: user?.unit || '',
      });
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      Alert.alert('Error', 'Failed to search items');
    }
  }, [user]);

  const generateQRCode = async (item: PropertyItem) => {
    try {
      setLoading(true);
      const qrCode = await HandReceiptModule.generateQRCode({
        itemId: item.id,
        itemName: item.name,
        serialNumber: item.serialNumber,
      });
      setQRData(qrCode);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      Alert.alert('Error', 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!qrData) return;

    try {
      await Share.share({
        message: `Property Item: ${qrData.itemName}\nSerial Number: ${qrData.serialNumber}\nQR Code Data: ${qrData.data}`,
        title: 'Property QR Code',
      });
    } catch (error) {
      console.error('Share failed:', error);
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  const handleItemSelect = (item: PropertyItem) => {
    setSelectedItem(item);
    setSearchQuery('');
    setSearchResults([]);
    generateQRCode(item);
  };

  const renderSearchResults = () => {
    if (!searchResults.length) return null;

    return (
      <View style={styles.searchResults}>
        {searchResults.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.searchResultItem}
            onPress={() => handleItemSelect(item)}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSerial}>SN: {item.serialNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Generator</Text>
        <Text style={styles.subtitle}>{user?.unit || 'All Units'}</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by serial number or name"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#666"
          />
        </View>
        {renderSearchResults()}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : selectedItem && qrData ? (
        <View style={styles.qrSection}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemInfoName}>{selectedItem.name}</Text>
            <Text style={styles.itemInfoSerial}>SN: {selectedItem.serialNumber}</Text>
            <Text style={styles.itemInfoCategory}>{selectedItem.category}</Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={qrData.data}
              size={200}
              backgroundColor="white"
            />
          </View>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Icon name="share-2" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="search" size={48} color="#666" />
          <Text style={styles.emptyStateText}>
            Search for an item to generate its QR code
          </Text>
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
    minHeight: 200,
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
  searchSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchResults: {
    marginTop: 16,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  itemSerial: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  qrSection: {
    padding: 16,
    alignItems: 'center',
  },
  itemInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  itemInfoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  itemInfoSerial: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  itemInfoCategory: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
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