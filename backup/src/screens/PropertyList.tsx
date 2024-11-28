import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import HandReceiptModule, { Property } from '../native/HandReceiptMobile';
import { NavigationProp } from '../types/navigation';

interface Props {
  navigation: NavigationProp<'PropertyList'>;
}

const PropertyList: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHolder, setFilterHolder] = useState<string>('');

  useEffect(() => {
    loadProperties();
  }, [user]);

  const loadProperties = async () => {
    if (!user) return;

    try {
      const filters: { unit?: string; holder?: string } = {};
      
      // Role-based filtering
      if (user.role === 'SOLDIER') {
        filters.holder = user.id;
      } else {
        filters.unit = user.unit;
        if (filterHolder) {
          filters.holder = filterHolder;
        }
      }

      const items = await HandReceiptModule.getPropertyList(filters);
      setProperties(items);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadProperties();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredProperties = properties.filter((property) => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    const propertyText = `${property.name} ${property.nsn} ${property.serialNumber} ${property.currentHolder}`.toLowerCase();
    return searchTerms.every((term) => propertyText.includes(term));
  });

  const handlePropertyPress = (property: Property) => {
    const canEdit = user?.role !== 'SOLDIER';
    navigation.navigate('PropertyDetails', {
      propertyId: property.id,
      canEdit,
    });
  };

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.propertyItem}
      onPress={() => handlePropertyPress(item)}
    >
      <View style={styles.propertyHeader}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Icon
          name="chevron-right"
          size={24}
          color="#666"
        />
      </View>

      <View style={styles.propertyDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>NSN:</Text>
          <Text style={styles.value}>{item.nsn}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Serial:</Text>
          <Text style={styles.value}>{item.serialNumber}</Text>
        </View>
        {(user?.role === 'OFFICER' || user?.role === 'NCO') && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Holder:</Text>
            <Text style={styles.value}>{item.currentHolder}</Text>
          </View>
        )}
      </View>

      {item.location && (
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {(user?.role === 'OFFICER' || user?.role === 'NCO') && (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('QRGenerator')}
          >
            <Icon name="plus" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>

      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Icon name="cloud-off-outline" size={16} color="#fff" />
          <Text style={styles.offlineText}>Offline Mode</Text>
        </View>
      )}

      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'No properties match your search'
                : 'No properties found'}
            </Text>
          </View>
        )}
      />
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
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  offlineBanner: {
    flexDirection: 'row',
    backgroundColor: '#FF9500',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  list: {
    padding: 16,
  },
  propertyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
  },
  propertyDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  locationText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PropertyList; 