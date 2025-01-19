import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

export const Loading = ({
  message = 'Loading...',
  size = 'large',
  style,
}: LoadingProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} style={styles.spinner} />
      {message && <Text style={styles.message}>{message}</Text>}
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
  spinner: {
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default Loading; 