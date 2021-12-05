import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { getKey } from '../utils/AsyncStorage';
import auth from '@react-native-firebase/auth';

import WelcomeScreen from '../screens/welcome';
import ContinentsScreen from '../screens/browse/continents';
import CountriesScreen from '../screens/browse/countries';
import CountryScreen from '../screens/browse/country';
import DetailsSelect from './browse/detailsSelect';
import ResultsScreen from './browse/results';
import HotelScreen from './browse/hotel';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  useEffect(() => {
    if (auth().currentUser === null) {
      navigation.navigate('Welcome');
    }
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
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen
        name="Hotel"
        component={HotelScreen}
        options={({ route }) => ({
          title:
            route.params.name < 20
              ? route.params.name
              : route.params.name.substring(0, 17) + '...',
        })}
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
