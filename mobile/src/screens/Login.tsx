import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { login, loading: authLoading } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading || authLoading) return;
    
    setLoading(true);
    try {
      console.log('Attempting login...');
      const result = await login({
        username: 'test',
        password: 'test'
      });

      console.log('Login result:', result);
      if (!result.success && result.error) {
        Alert.alert('Login Failed', result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Error',
        'Could not log in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || authLoading;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HandReceipt</Text>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Login</Text>
              <Text style={styles.buttonSubtext}>Tap to authenticate</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Having trouble? Contact your unit's S6 office
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFF',
    padding: 25,
    marginBottom: 60,
    minWidth: 340,
  },
  title: {
    fontSize: 48,
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  loginButton: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonTextContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'left',
    fontFamily: 'AllianceNo2-Medium',
  },
  buttonSubtext: {
    color: '#666',
    marginTop: 2,
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'AllianceNo2-Medium',
  },
  helpText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    fontFamily: 'AllianceNo2-Medium',
  },
});

export default Login; 