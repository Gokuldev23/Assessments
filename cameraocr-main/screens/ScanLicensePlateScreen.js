import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ScanLicensePlateScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then((granted) => {
        if (!granted) {
          Alert.alert(
            'Camera Permission Required',
            'Please enable camera access in settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
          );
        }
      });
    }
  }, [hasPermission]);

  const capturePhoto = async () => {
    if (camera.current && !isProcessing) {
      setIsProcessing(true);
      try {
        const photo = await camera.current.takePhoto();
        const imagePath = `file://${photo.path}`;
        const result = await TextRecognition.recognize(imagePath);
        const licensePlateText = result.text.trim().replace(/\s+/g, '');

        if (licensePlateText) {
          navigation.navigate('AddCar', { licensePlate: licensePlateText });
        } else {
          Alert.alert('No Text Found', 'Could not detect a license plate. Please try again.');
        }
      } catch (error) {
        console.error('Error capturing or processing photo:', error);
        Alert.alert('Error', 'Failed to process the image. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No camera device available. Please ensure your device has a back camera or try again.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        photo={true}
        onInitialized={() => console.log('Camera initialized')}
        onError={(error) => {
          console.error('Camera error:', error);
          Alert.alert('Camera Error', error.message);
        }}
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.bottomTitle}>Scan License Plate</Text>
          <Text style={styles.bottomSubtitle}>Position License Plate in frame</Text>
        </View>

        <TouchableOpacity
          style={[styles.captureButton, isProcessing && styles.disabledButton]}
          onPress={capturePhoto}
          disabled={isProcessing}
        >
          <Text style={styles.captureText}>
            {isProcessing ? 'Processing...' : 'Capture'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.manualEntry}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.manualText}>Enter License Plate Manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 28,
    color: '#fff',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomTitle: {
    color: '#fff',
    fontSize: 40, // Increased size
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bottomSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  captureButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  manualEntry: {
    position: 'absolute',
    bottom: 25,
  },
  manualText: {
    color: '#3b82f6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default ScanLicensePlateScreen;
