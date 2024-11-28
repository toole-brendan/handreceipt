import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../hooks/useAuth';

// Screens
import Login from '../screens/Login';
import Scanner from '../screens/Scanner';
import TransferConfirmation from '../screens/TransferConfirmation';
import PropertyList from '../screens/PropertyList';
import PropertyDetails from '../screens/PropertyDetails';
import TransactionHistory from '../screens/TransactionHistory';
import Analytics from '../screens/Analytics';
import QRGenerator from '../screens/QRGenerator';
import Profile from '../screens/Profile';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const OfficerTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        borderTopColor: '#eee',
        backgroundColor: '#fff',
      },
      headerStyle: {
        backgroundColor: '#f8f9fa',
      },
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Tab.Screen
      name="PropertyList"
      component={PropertyList}
      options={{
        title: 'Property Book',
        tabBarIcon: ({ color, size }) => (
          <Icon name="clipboard-list" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Analytics"
      component={Analytics}
      options={{
        title: 'Analytics',
        tabBarIcon: ({ color, size }) => (
          <Icon name="chart-bar" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="QRGenerator"
      component={QRGenerator}
      options={{
        title: 'Generate QR',
        tabBarIcon: ({ color, size }) => (
          <Icon name="qrcode-plus" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const NCOTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
    }}
  >
    <Tab.Screen
      name="PropertyList"
      component={PropertyList}
      options={{
        title: 'Property Book',
        tabBarIcon: ({ color, size }) => (
          <Icon name="clipboard-list" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Scanner"
      component={Scanner}
      options={{
        title: 'Scan QR',
        tabBarIcon: ({ color, size }) => (
          <Icon name="qrcode-scan" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="QRGenerator"
      component={QRGenerator}
      options={{
        title: 'Generate QR',
        tabBarIcon: ({ color, size }) => (
          <Icon name="qrcode-plus" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const SoldierTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
    }}
  >
    <Tab.Screen
      name="PropertyList"
      component={PropertyList}
      options={{
        title: 'My Property',
        tabBarIcon: ({ color, size }) => (
          <Icon name="clipboard-list" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Scanner"
      component={Scanner}
      options={{
        title: 'Scan QR',
        tabBarIcon: ({ color, size }) => (
          <Icon name="qrcode-scan" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={
                user.role === 'OFFICER'
                  ? OfficerTabs
                  : user.role === 'NCO'
                  ? NCOTabs
                  : SoldierTabs
              }
            />
            <Stack.Screen
              name="PropertyDetails"
              component={PropertyDetails}
              options={{
                headerShown: true,
                title: 'Property Details',
              }}
            />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
              options={{
                headerShown: true,
                title: 'Transaction History',
              }}
            />
            <Stack.Screen
              name="TransferConfirmation"
              component={TransferConfirmation}
              options={{
                headerShown: true,
                title: 'Confirm Transfer',
                presentation: 'modal',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 