import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from 'react-native-paper';

import { Screen } from '../../components/layout/Screen';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loading } from '../../components/feedback/Loading';
import { ErrorMessage } from '../../components/feedback/ErrorMessage';

import HandReceiptModule from '../../native/HandReceiptMobile';
import { useAuth } from '../../hooks/useAuth';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

type RootStackParamList = {
  PropertyReview: { itemId: string };
  PropertyDetails: { itemId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RoutePropType = RouteProp<RootStackParamList, 'PropertyReview'>;

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  status: string;
  category: string;
  value: number;
}

const steps = ['Initial Review', 'Physical Inspection', 'Documentation', 'Final Decision'];

export const PropertyReviewScreen = () => {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [item, setItem] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (route.params?.itemId) {
      loadItem(route.params.itemId);
    }
  }, [route.params?.itemId]);

  const loadItem = async (itemId: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await HandReceiptModule.getPropertyItem({
        itemId: itemId,
      });
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleTakePhoto = useCallback(async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.assets?.[0]?.uri && item) {
        const uri = result.assets[0].uri;
        setPhotos(prev => [...prev, uri]);
        await HandReceiptModule.addPropertyPhoto({
          itemId: item.id,
          photoUri: uri,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to capture photo');
    }
  }, [item]);

  const handleChoosePhoto = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets?.[0]?.uri && item) {
        const uri = result.assets[0].uri;
        setPhotos(prev => [...prev, uri]);
        await HandReceiptModule.addPropertyPhoto({
          itemId: item.id,
          photoUri: uri,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select photo');
    }
  }, [item]);

  const handleApprove = async () => {
    if (!item) return;
    
    try {
      setLoading(true);
      setError('');
      await HandReceiptModule.approveProperty({
        itemId: item.id,
        notes: notes.trim(),
      });
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve property');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!item) return;
    
    if (!notes.trim()) {
      setError('Please provide rejection reason in notes');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await HandReceiptModule.rejectProperty({
        itemId: item.id,
        reason: notes.trim(),
      });
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject property');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading property details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => loadItem(route.params.itemId)} />;
  }

  if (!item) {
    return <ErrorMessage message="Property not found" />;
  }

  return (
    <Screen title="Property Review">
      <Card
        title={item.name}
        subtitle={`Serial Number: ${item.serialNumber}`}
        icon="box"
      >
        <View style={[
          styles.statusBadge,
          item.status === 'serviceable' ? styles.statusVerified : styles.statusPending
        ]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </Card>

      <View style={styles.stepper}>
        {steps.map((label, index) => (
          <View key={label} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              index === activeStep && styles.stepActive,
              index < activeStep && styles.stepCompleted,
            ]}>
              {index < activeStep ? (
                <Icon name="check" size={16} color="#fff" />
              ) : (
                <Text style={[
                  styles.stepNumber,
                  index === activeStep && styles.stepNumberActive,
                ]}>{index + 1}</Text>
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              index === activeStep && styles.stepLabelActive,
            ]}>{label}</Text>
            {index < steps.length - 1 && (
              <View style={[
                styles.stepConnector,
                index < activeStep && styles.stepConnectorCompleted,
              ]} />
            )}
          </View>
        ))}
      </View>

      <Card>
        <View style={styles.mediaButtons}>
          <Button
            mode="outlined"
            icon="camera"
            onPress={handleTakePhoto}
            style={styles.mediaButton}
          >
            Take Photo
          </Button>
          <Button
            mode="outlined"
            icon="image"
            onPress={handleChoosePhoto}
            style={styles.mediaButton}
          >
            Choose Photo
          </Button>
        </View>

        {photos.length > 0 && (
          <ScrollView
            horizontal
            style={styles.photoList}
            showsHorizontalScrollIndicator={false}
          >
            {photos.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={styles.photo}
              />
            ))}
          </ScrollView>
        )}

        <Input
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          style={styles.notes}
        />

        <View style={styles.buttonRow}>
          {activeStep > 0 && (
            <Button
              mode="outlined"
              onPress={handleBack}
              icon="arrow-left"
              style={styles.button}
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              mode="contained"
              onPress={handleNext}
              icon="arrow-right"
              style={styles.button}
            >
              Next
            </Button>
          ) : (
            <View style={styles.finalButtons}>
              <Button
                mode="outlined"
                onPress={handleReject}
                icon="x"
                color="#F44336"
                style={styles.button}
              >
                Reject
              </Button>
              <Button
                mode="contained"
                onPress={handleApprove}
                icon="check"
                color="#4CAF50"
                style={styles.button}
              >
                Approve
              </Button>
            </View>
          )}
        </View>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statusVerified: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepActive: {
    backgroundColor: '#2196F3',
  },
  stepCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  stepConnector: {
    position: 'absolute',
    top: 16,
    right: '50%',
    left: '50%',
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  stepConnectorCompleted: {
    backgroundColor: '#4CAF50',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  mediaButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  photoList: {
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  notes: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  finalButtons: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default PropertyReviewScreen; 