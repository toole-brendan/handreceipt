import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import HandReceiptModule from '../native/HandReceiptMobile';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCACLogin = async () => {
    setLoading(true);
    try {
      // Attempt to read CAC card
      const cacData = await HandReceiptModule.readCAC();
      
      // Login with CAC credentials
      const result = await login({
        cacId: cacData.id,
        certificate: cacData.certificate,
      });

      if (!result.success) {
        Alert.alert('Login Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert(
        'CAC Read Error',
        'Could not read CAC card. Please ensure it is properly inserted.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HandReceipt</Text>
      <Text style={styles.subtitle}>Military Property Management</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleCACLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.buttonText}>Login with CAC</Text>
            <Text style={styles.buttonSubtext}>
              Insert your CAC card to continue
            </Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.helpText}>
        Having trouble? Contact your unit's S6 office
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 48,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  helpText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Login; 