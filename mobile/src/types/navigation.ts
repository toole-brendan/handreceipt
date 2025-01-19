import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Feature-specific param lists
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
};

export type PropertyStackParamList = {
  PropertyList: undefined;
  PropertyDetails: { itemId: string };
  PropertyReview: { itemId: string };
};

export type TransferStackParamList = {
  Scanner: undefined;
  QRGenerator: { itemId: string };
  TransferConfirmation: { transferId: string };
  TransactionHistory: { itemId?: string };
};

export type ReportsStackParamList = {
  Reports: undefined;
  ReportViewer: { reportId: string };
};

// Main tab navigation
export type TabParamList = {
  Property: undefined;
  Transfer: undefined;
  Reports: undefined;
  Analytics: undefined;
  Profile: undefined;
};

// Root stack that includes auth and main flows
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabParamList>;
};

// Navigation prop types
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type PropertyStackNavigationProp = NativeStackNavigationProp<PropertyStackParamList>;
export type TransferStackNavigationProp = NativeStackNavigationProp<TransferStackParamList>;
export type ReportsStackNavigationProp = NativeStackNavigationProp<ReportsStackParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Combined navigation types for nested navigators
export type TabNavigationProp<T extends keyof TabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, T>,
  RootStackNavigationProp
>;

// Route prop types
export type AuthRouteProps<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type PropertyRouteProps<T extends keyof PropertyStackParamList> = RouteProp<PropertyStackParamList, T>;
export type TransferRouteProps<T extends keyof TransferStackParamList> = RouteProp<TransferStackParamList, T>;
export type ReportsRouteProps<T extends keyof ReportsStackParamList> = RouteProp<ReportsStackParamList, T>; 