import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

interface ErrorMessageProps {
  message: string;
  style?: ViewStyle;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message,
  style,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="alert-circle" size={48} color="#ef5350" style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Text style={styles.retry} onPress={onRetry}>
          Tap to retry
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.8,
  },
  retry: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
});

export default ErrorMessage; 