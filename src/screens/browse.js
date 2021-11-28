import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getKey } from '../utils/AsyncStorage';
import WelcomeScreen from '../screens/welcome';
import ContinentsScreen from '../screens/browse/continents';
import CountriesScreen from '../screens/browse/countries';
import CountryScreen from '../screens/browse/country';
import DetailsSelect from './browse/detailsSelect';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  useEffect(() => {
    getKey('welcome')
      .then(value => {
        if (value !== 'true') {
          navigation.navigate('Welcome');
          console.log('running');
        }
      })
      .catch(err => console.log(err));
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContinentsSelect"
        component={ContinentsScreen}
        options={{ title: 'Continents' }}
      />
      <Stack.Screen
        name="CountriesSelect"
        component={CountriesScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Country"
        component={CountryScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="DetailsSelect"
        component={DetailsSelect}
        options={{ title: 'Details' }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
