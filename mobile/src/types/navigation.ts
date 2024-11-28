import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  PropertyList: undefined;
  Profile: undefined;
  PropertyDetails: {
    propertyId: string;
    canEdit?: boolean;
  };
  TransactionHistory: {
    propertyId?: string;
    userId?: string;
  };
  TransferConfirmation: {
    propertyId: string;
  };
  QRGenerator: {
    propertyId: string;
  };
};

export type TabParamList = {
  PropertyList: undefined;
  Profile: undefined;
};

export type NavigationProp<T extends keyof TabParamList | keyof RootStackParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, T extends keyof TabParamList ? T : never>,
  StackNavigationProp<RootStackParamList>
>;

export type RoutePropType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>; 