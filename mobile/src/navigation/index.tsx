import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

// Auth screens
import { LoginScreen } from '../screens/auth/Login';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPassword';
import { RegisterScreen } from '../screens/auth/Register';

// Property screens
import { PropertyListScreen } from '../screens/property/PropertyList';
import { PropertyDetailsScreen } from '../screens/property/PropertyDetails';
import { PropertyReviewScreen } from '../screens/property/PropertyReview';

// Transfer screens
import { ScannerScreen } from '../screens/transfer/Scanner';
import { QRGeneratorScreen } from '../screens/transfer/QRGenerator';
import { TransferConfirmationScreen } from '../screens/transfer/TransferConfirmation';
import { TransactionHistoryScreen } from '../screens/transfer/TransactionHistory';

// Report screens
import { ReportsScreen } from '../screens/reports/Reports';
import { ReportViewerScreen } from '../screens/reports/ReportViewer';

// Other screens
import { AnalyticsScreen } from '../screens/analytics/Analytics';
import { ProfileScreen } from '../screens/profile/Profile';

import { useAuth } from '../hooks/useAuth';
import {
  RootStackParamList,
  TabParamList,
  AuthStackParamList,
  PropertyStackParamList,
  TransferStackParamList,
  ReportsStackParamList,
} from '../types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const PropertyStack = createNativeStackNavigator<PropertyStackParamList>();
const TransferStack = createNativeStackNavigator<TransferStackParamList>();
const ReportsStack = createNativeStackNavigator<ReportsStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const PropertyNavigator = () => (
  <PropertyStack.Navigator>
    <PropertyStack.Screen name="PropertyList" component={PropertyListScreen} options={{ title: 'Properties' }} />
    <PropertyStack.Screen name="PropertyDetails" component={PropertyDetailsScreen} options={{ title: 'Property Details' }} />
    <PropertyStack.Screen name="PropertyReview" component={PropertyReviewScreen} options={{ title: 'Review Property' }} />
  </PropertyStack.Navigator>
);

const TransferNavigator = () => (
  <TransferStack.Navigator>
    <TransferStack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: false }} />
    <TransferStack.Screen name="QRGenerator" component={QRGeneratorScreen} options={{ title: 'Generate QR Code' }} />
    <TransferStack.Screen name="TransferConfirmation" component={TransferConfirmationScreen} options={{ title: 'Confirm Transfer' }} />
    <TransferStack.Screen name="TransactionHistory" component={TransactionHistoryScreen} options={{ title: 'Transaction History' }} />
  </TransferStack.Navigator>
);

const ReportsNavigator = () => (
  <ReportsStack.Navigator>
    <ReportsStack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
    <ReportsStack.Screen name="ReportViewer" component={ReportViewerScreen} options={{ title: 'View Report' }} />
  </ReportsStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#e0e0e0',
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Property"
      component={PropertyNavigator}
      options={{
        title: 'Properties',
        tabBarIcon: ({ color, size }) => (
          <Icon name="box" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Transfer"
      component={TransferNavigator}
      options={{
        title: 'Transfer',
        tabBarIcon: ({ color, size }) => (
          <Icon name="repeat" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Reports"
      component={ReportsNavigator}
      options={{
        title: 'Reports',
        tabBarIcon: ({ color, size }) => (
          <Icon name="file-text" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Analytics"
      component={AnalyticsScreen}
      options={{
        title: 'Analytics',
        tabBarIcon: ({ color, size }) => (
          <Icon name="bar-chart-2" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const Navigation = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}; 