import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../components/layout/Screen';
import { Form } from '../../components/forms/Form';
import { Input } from '../../components/common/Input';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { AuthStackNavigationProp } from '../../types/navigation';

export const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // TODO: Implement login logic
      // await auth.signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scrollable={false}>
      <Form
        title="Welcome Back"
        submitLabel="Login"
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      >
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          icon="mail"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          icon="lock"
        />
        <View style={styles.links}>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Forgot Password?
          </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Register')}
          >
            Create Account
          </Text>
        </View>
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  link: {
    color: '#1976d2',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 