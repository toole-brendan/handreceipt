import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Icon name="account-circle" size={80} color="#007AFF" />
        <Text style={styles.name}>{user?.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user?.role}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Rank</Text>
          <Text style={styles.value}>{user?.rank}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Unit</Text>
          <Text style={styles.value}>{user?.unit}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transfer Queue</Text>
        <View style={styles.queueRow}>
          <View style={styles.queueInfo}>
            <Icon name="clock-outline" size={24} color="#007AFF" />
            <Text style={styles.queueLabel}>Pending Transfers</Text>
          </View>
          <Text style={styles.queueCount}>0</Text>
        </View>

        <View style={styles.queueRow}>
          <View style={styles.queueInfo}>
            <Icon name="alert-outline" size={24} color="#FF3B30" />
            <Text style={styles.queueLabel}>Failed Transfers</Text>
          </View>
          <Text style={styles.queueCount}>0</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  userInfo: {
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  label: {
    color: '#666',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
  },
  queueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  queueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FFF',
  },
  queueCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginTop: 'auto',
    marginBottom: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default Profile; 