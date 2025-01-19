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

export const RegisterScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await HandReceiptModule.register({
        username,
        email,
        password,
      });
      navigation.navigate('Login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Register">
      <View style={styles.container}>
        <Text style={styles.description}>
          Create a new account to start managing your property.
        </Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={!!error}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={!!error}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={!!error}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={!!error}
        />

        {error && <ErrorMessage message={error} />}

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          style={styles.button}
        >
          Register
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          Already have an account? Login
        </Button>
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
  button: {
    marginTop: 16,
  },
});

export default RegisterScreen; 