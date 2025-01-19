import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';

import { Screen } from '../../components/layout/Screen';
import { Button } from '../../components/common/Button';
import { TextInput } from '../../components/forms/TextInput';
import { ErrorMessage } from '../../components/feedback/ErrorMessage';

import { AuthStackNavigationProp } from '../../types/navigation';
import HandReceiptModule from '../../native/HandReceiptMobile';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await HandReceiptModule.resetPassword({ email });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Reset Password">
      <View style={styles.container}>
        {success ? (
          <>
            <Text style={styles.successText}>
              Password reset instructions have been sent to your email.
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Return to Login
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.description}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={!!error}
            />
            {error && <ErrorMessage message={error} />}
            <Button
              mode="contained"
              onPress={handleResetPassword}
              loading={loading}
              style={styles.button}
            >
              Reset Password
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Back to Login
            </Button>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  successText: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#4CAF50',
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
  },
});

export default ForgotPasswordScreen; 