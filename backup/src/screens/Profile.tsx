import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';
import { useTransferQueue } from '../hooks/useTransferQueue';
import { NavigationProp } from '../types/navigation';

interface Props {
    navigation: NavigationProp<'Profile'>;
}

const Profile: React.FC<Props> = ({ navigation }) => {
    const { user, logout } = useAuth();
    const {
        queue,
        syncing,
        syncQueue,
        clearFailedTransfers,
        pendingCount,
        failedCount,
    } = useTransferQueue();

    const handleLogout = async () => {
        if (pendingCount > 0) {
            Alert.alert(
                'Pending Transfers',
                'You have pending transfers. Do you want to sync them before logging out?',
                [
                    {
                        text: 'Sync & Logout',
                        onPress: async () => {
                            if (pendingCount > 0) {
                                await syncQueue();
                            }
                            logout();
                        },
                    },
                    {
                        text: 'Logout',
                        onPress: logout,
                        style: 'destructive',
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ]
            );
        } else {
            logout();
        }
    };

    const handleClearFailed = () => {
        if (failedCount > 0) {
            Alert.alert(
                'Clear Failed Transfers',
                'Are you sure you want to clear all failed transfers? This cannot be undone.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Clear',
                        onPress: clearFailedTransfers,
                        style: 'destructive',
                    },
                ]
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
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
                <TouchableOpacity
                    style={styles.queueRow}
                    onPress={pendingCount > 0 ? syncQueue : undefined}
                    disabled={syncing}
                >
                    <View style={styles.queueInfo}>
                        <Icon name="clock-outline" size={24} color="#007AFF" />
                        <Text style={styles.queueLabel}>Pending Transfers</Text>
                    </View>
                    <View style={styles.queueCount}>
                        <Text style={styles.countText}>{pendingCount}</Text>
                        {syncing && <ActivityIndicator size="small" color="#007AFF" />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.queueRow}
                    onPress={handleClearFailed}
                    disabled={failedCount === 0}
                >
                    <View style={styles.queueInfo}>
                        <Icon name="alert-outline" size={24} color="#FF3B30" />
                        <Text style={styles.queueLabel}>Failed Transfers</Text>
                    </View>
                    <View style={styles.queueCount}>
                        <Text style={styles.countText}>{failedCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Icon name="logout" size={24} color="#FF3B30" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
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
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#666',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        color: '#666',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    queueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    queueInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    queueLabel: {
        marginLeft: 12,
        fontSize: 16,
    },
    queueCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countText: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
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
        padding: 16,
    },
});

export default Profile; 