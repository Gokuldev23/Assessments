import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MenuIcon from '../assets/menu.svg'; // 👈 this is your svg file

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.headerContainer}>
  <TouchableOpacity onPress={() => {}}>
          <MenuIcon width={26} height={26} fill="#fff" />

        </TouchableOpacity>

  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>Garage</Text>
  </View>

  {/* Invisible icon for symmetry */}
  <View style={{ width: 26 }} />
</View>


      {/* Body */}
      <View style={styles.content}>
        {/* Hero Image */}
        <Image
          source={require('../assets/garage-hero.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Add a car to your garage.</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Track your car’s service history, open recalls{'\n'}
          and service schedule all in one place.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCar')}
        >
          <Text style={styles.buttonText}>Add a Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
  marginTop: 60,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
headerTitleContainer: {
  flex: 1,
  alignItems: 'center',
},
headerTitle: {
  color: '#fff',
  fontSize: 20,
  fontWeight: '600',
},

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
