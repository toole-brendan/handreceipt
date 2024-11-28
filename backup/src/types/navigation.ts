import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Property } from '../native/HandReceiptMobile';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Scanner: undefined;
  PropertyDetails: {
    propertyId: string;
    canEdit: boolean;
  };
  TransactionHistory: {
    propertyId?: string;
    userId?: string;
  };
  TransferConfirmation: {
    transferId: string;
    propertyId: string;
    fromUser: string;
    toUser: string;
    timestamp: string;
  };
  Analytics: undefined;
  QRGenerator: {
    propertyId?: string; // Optional - if provided, regenerate QR for existing property
  };
  Profile: undefined;
};

export type TabParamList = {
  PropertyList: undefined;
  Scanner: undefined;
  Profile: undefined;
  Analytics: undefined;
  QRGenerator: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: keyof RootStackParamList, params?: RootStackParamList[T]) => void;
  goBack: () => void;
};

export type RoutePropType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>; 