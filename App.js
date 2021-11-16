import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BrowseScreen from './screens/browse';
import SavedScreen from './screens/saved';
import HistoryScreen from './screens/history';
import SettingsScreen from './screens/settings';

MaterialIcons.loadFont();

const Tab = createBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Browse"
            component={BrowseScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Browse',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedScreen}
            options={{
              tabBarLabel: 'Saved',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="favorite" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarLabel: 'History',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="history" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
