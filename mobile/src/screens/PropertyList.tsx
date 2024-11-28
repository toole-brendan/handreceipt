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
import { useAuthContext } from '../contexts/AuthContext';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import HandReceiptModule, { Property } from '../native/HandReceiptMobile';
import { NavigationProp } from '../types/navigation';
import { UserRole } from '../types/auth';

interface Props {
  navigation: NavigationProp<'PropertyList'>;
}

const getItemIcon = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('m4') || nameLower.includes('carbine')) return 'pistol';
  if (nameLower.includes('pvs') || nameLower.includes('night vision')) return 'eye-outline';
  if (nameLower.includes('acog') || nameLower.includes('scope')) return 'target';
  if (nameLower.includes('laptop') || nameLower.includes('computer')) return 'laptop';
  if (nameLower.includes('radio')) return 'radio-handheld';
  return 'package-variant';
};

const PropertyList: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuthContext();
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
      if (user.role === UserRole.SOLDIER) {
        filters.holder = user.id;
      } else {
        filters.unit = user.unit;
        if (filterHolder) {
          filters.holder = filterHolder;
        }
      }

      console.log('Loading properties with filters:', filters);
      const items = await HandReceiptModule.getPropertyList(filters);
      console.log('Loaded properties:', items);
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
    const canEdit = user?.role !== UserRole.SOLDIER;
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
        <View style={styles.propertyTitleContainer}>
          <Icon 
            name={getItemIcon(item.name)} 
            size={24} 
            color="#007AFF" 
            style={styles.itemIcon}
          />
          <View>
            <Text style={styles.propertyName}>{item.name}</Text>
            <Text style={styles.propertyDescription}>{item.description}</Text>
          </View>
        </View>
        <Icon
          name="chevron-right"
          size={24}
          color="#666"
        />
      </View>

      <View style={styles.propertyDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailLabel}>
            <Icon name="identifier" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.label}>NSN</Text>
          </View>
          <Text style={styles.value}>{item.nsn}</Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailLabel}>
            <Icon name="pound-box-outline" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.label}>Serial</Text>
          </View>
          <Text style={styles.value}>{item.serialNumber}</Text>
        </View>
        {(user?.role === UserRole.OFFICER || user?.role === UserRole.NCO) && (
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Icon name="account-outline" size={16} color="#666" style={styles.detailIcon} />
              <Text style={styles.label}>Holder</Text>
            </View>
            <Text style={styles.value}>{item.currentHolder}</Text>
          </View>
        )}
      </View>

      {item.location && (
        <View style={styles.locationContainer}>
          <Icon name="map-marker-outline" size={16} color="#666" />
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
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {(user?.role === UserRole.OFFICER || user?.role === UserRole.NCO) && (
          <TouchableOpacity
            style={styles.filterButton}
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
            tintColor="#007AFF"
            progressBackgroundColor="#1C1C1E"
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
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
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
    color: '#FFF',
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
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  propertyTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  propertyDetails: {
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 8,
  },
  label: {
    color: '#666',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
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