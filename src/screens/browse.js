import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContinentsScreen from '../screens/browse/continents';
import CountriesScreen from '../screens/browse/countries';

const Stack = createNativeStackNavigator();

export default function Home() {
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
    </Stack.Navigator>
  );
}
