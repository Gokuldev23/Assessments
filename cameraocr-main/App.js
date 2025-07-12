import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './screens/LandingPage';
import AddCarPage from './screens/AddCarPage';
import ScanLicensePlateScreen from './screens/ScanLicensePlateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="AddCar" component={AddCarPage} options={{ headerShown: false }} />
        <Stack.Screen name="ScanLicensePlate" component={ScanLicensePlateScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
