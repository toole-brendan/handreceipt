import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { useAuthContext } from '../contexts/AuthContext';

// Screens
import Login from '../screens/Login';
import PropertyList from '../screens/PropertyList';
import Profile from '../screens/Profile';
import PropertyDetails from '../screens/PropertyDetails';
import TransactionHistory from '../screens/TransactionHistory';
import TransferConfirmation from '../screens/TransferConfirmation';
import QRGenerator from '../screens/QRGenerator';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle: {
          color: '#FFF',
        },
      }}
    >
      <Tab.Screen
        name="PropertyList"
        component={PropertyList}
        options={{
          title: 'Property',
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { loading, isAuthenticated } = useAuthContext();

  console.log('Navigation render:', { isAuthenticated, loading });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading navigation...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            color: '#FFF',
            fontFamily: 'AllianceNo2-Medium',
          },
          headerTintColor: '#FFF',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PropertyDetails"
              component={PropertyDetails}
              options={{
                title: 'Property Details',
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTitleStyle: {
                  color: '#FFF',
                  fontFamily: 'AllianceNo2-Medium',
                  fontSize: 20,
                },
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="TransactionHistory"
              component={TransactionHistory}
              options={{ 
                title: 'Transaction History',
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTitleStyle: {
                  color: '#FFF',
                  fontFamily: 'AllianceNo2-Medium',
                  fontSize: 20,
                },
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="TransferConfirmation"
              component={TransferConfirmation}
              options={{ 
                title: 'Transfer Confirmation',
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTitleStyle: {
                  color: '#FFF',
                  fontFamily: 'AllianceNo2-Medium',
                  fontSize: 20,
                },
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="QRGenerator"
              component={QRGenerator}
              options={{ 
                title: 'Generate QR Code',
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTitleStyle: {
                  color: '#FFF',
                  fontFamily: 'AllianceNo2-Medium',
                  fontSize: 20,
                },
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerBackTitleVisible: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 