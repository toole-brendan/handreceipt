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
  Platform,
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Enter property name"
            placeholderTextColor="#666"
            selectionColor="#007AFF"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>NSN *</Text>
          <TextInput
            style={styles.input}
            value={form.nsn}
            onChangeText={(text) => setForm({ ...form, nsn: text })}
            placeholder="Enter NSN"
            placeholderTextColor="#666"
            selectionColor="#007AFF"
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
            placeholderTextColor="#666"
            selectionColor="#007AFF"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            placeholder="Enter description"
            placeholderTextColor="#666"
            selectionColor="#007AFF"
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
            placeholderTextColor="#666"
            selectionColor="#007AFF"
          />
        </View>

        <TouchableOpacity
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}
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
          <View style={styles.qrBackground}>
            <QRCode
              value={qrCode}
              size={200}
              backgroundColor="white"
              color="black"
            />
          </View>
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
    backgroundColor: '#000',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'AllianceNo2-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#1C1C1E',
    color: '#FFF',
    fontFamily: 'AllianceNo2-Medium',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'AllianceNo2-Medium',
  },
  qrContainer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  qrBackground: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  qrHelp: {
    marginTop: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'AllianceNo2-Medium',
  },
});

export default QRGenerator; 