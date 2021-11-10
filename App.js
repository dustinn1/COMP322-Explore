import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/start/welcome';
import ContinentsScreen from './screens/start/continents';
import asianContinent from './screens/start/asianContinent';
import africanContinent from './screens/start/africanContinent';
import australianContinent from './screens/start/australianContinent';
import europeanContinent from './screens/start/europeanContinent';


const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Continents"
            component={ContinentsScreen}
            options={{ title: 'Select a Continent' }}
          />
          <Stack.Screen
            name="asianContinent"
            component={asianContinent}
          />
          <Stack.Screen
            name="africanContinent"
            component={africanContinent}
          />
          <Stack.Screen
            name="australianContinent"
            component={australianContinent}
          />
          <Stack.Screen
            name="europeanContinent"
            component={europeanContinent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
