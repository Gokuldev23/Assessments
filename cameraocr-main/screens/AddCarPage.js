import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import ScanIcon from '../components/ScanIcon'; // adjust path

const AddCarPage = ({ navigation, route }) => {
  const [licensePlate, setLicensePlate] = useState('');

  // Update license plate when route params change
  useEffect(() => {
    if (route.params?.licensePlate) {
      setLicensePlate(route.params.licensePlate);
    }
  }, [route.params?.licensePlate]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a Car</Text>
        <View style={{ width: 60 }} /> {/* Balancer */}
      </View>

      {/* VIN Section */}
      <Text style={styles.sectionTitle}>Search by VIN</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Vehicle Identification Number"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity style={styles.scanIcon}>
          <ScanIcon width={22} height={22} />
          <Text style={styles.scanText}>Scan</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.link}>Where can I find the VIN?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search VIN</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* License Plate Section */}
      <Text style={styles.sectionTitle}>Search by License Plate</Text>

      <TouchableOpacity
        style={styles.scanRow}
        onPress={() => navigation.navigate('ScanLicensePlate')}
      >
        <ScanIcon width={18} height={18} />
        <Text style={styles.scanRowText}>Scan License Plate</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Enter License plate"
          placeholderTextColor="#999"
          style={styles.input}
          value={licensePlate}
          onChangeText={setLicensePlate}
        />
        <TextInput
          placeholder="Enter State/Province"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search Plate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddCarPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 60,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    width: 60,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  scanIcon: {
    marginLeft: 10,
    alignItems: 'center',
  },
  scanText: {
    color: '#3b82f6',
    fontSize: 12,
    marginTop: 4,
  },
  link: {
    color: '#3b82f6',
    fontSize: 14,
    marginBottom: 16,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#aaa',
    marginHorizontal: 10,
    fontSize: 14,
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanRowText: {
    color: '#3b82f6',
    fontSize: 14,
    marginLeft: 8,
  },
  inputGroup: {
    gap: 10,
    marginBottom: 16,
  },
});