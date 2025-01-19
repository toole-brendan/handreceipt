import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from '../common/Button';

interface FormProps {
  title?: string;
  submitLabel?: string;
  onSubmit?: () => void;
  loading?: boolean;
  error?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Form = ({
  title,
  submitLabel = 'Submit',
  onSubmit,
  loading = false,
  error,
  style,
  children,
}: FormProps) => {
  return (
    <View style={[styles.container, style]}>
      {title && <Text variant="titleLarge" style={styles.title}>{title}</Text>}
      <View style={styles.fields}>{children}</View>
      {error && <Text style={styles.error}>{error}</Text>}
      {onSubmit && (
        <Button
          mode="contained"
          onPress={onSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submit}
        >
          {submitLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  fields: {
    gap: 16,
  },
  error: {
    color: '#ef5350',
    marginTop: 16,
    textAlign: 'center',
  },
  submit: {
    marginTop: 24,
  },
});

export default Form; 