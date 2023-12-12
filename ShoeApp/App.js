import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './component/SplashScreen'
import SplashScreen2 from './component/SplashScreen2';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRoutName={'SplashScreen'}>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}} />
          <Stack.Screen name='SplashScreen2' component={SplashScreen2} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
