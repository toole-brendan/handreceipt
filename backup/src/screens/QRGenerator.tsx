import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../hooks/useAuth';
import HandReceiptModule from '../native/HandReceiptMobile';
import { NavigationProp } from '../types/navigation';

interface Props {
  navigation: NavigationProp<'QRGenerator'>;
}

interface PropertyForm {
  name: string;
  nsn: string;
  serialNumber: string;
  description: string;
  condition: string;
}

const QRGenerator: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyForm>({
    name: '',
    nsn: '',
    serialNumber: '',
    description: '',
    condition: 'NEW',
  });

  const handleGenerateQR = async () => {
    if (!form.name || !form.nsn || !form.serialNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // First create the property item
      const propertyId = await HandReceiptModule.createProperty({
        ...form,
        createdBy: user?.id,
        unit: user?.unit,
      });

      // Then generate QR code
      const qrData = await HandReceiptModule.generateQR(propertyId);
      setQrCode(qrData);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Generate Property QR Code</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Enter property name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>NSN *</Text>
          <TextInput
            style={styles.input}
            value={form.nsn}
            onChangeText={(text) => setForm({ ...form, nsn: text })}
            placeholder="Enter NSN"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Serial Number *</Text>
          <TextInput
            style={styles.input}
            value={form.serialNumber}
            onChangeText={(text) => setForm({ ...form, serialNumber: text })}
            placeholder="Enter serial number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Condition</Text>
          <TextInput
            style={styles.input}
            value={form.condition}
            onChangeText={(text) => setForm({ ...form, condition: text })}
            placeholder="Enter condition"
          />
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateQR}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate QR Code</Text>
          )}
        </TouchableOpacity>
      </View>

      {qrCode && (
        <View style={styles.qrContainer}>
          <QRCode
            value={qrCode}
            size={200}
            backgroundColor="white"
            color="black"
          />
          <Text style={styles.qrHelp}>
            Scan this QR code to transfer the property
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1c1c1e',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  qrContainer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  qrHelp: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default QRGenerator; 