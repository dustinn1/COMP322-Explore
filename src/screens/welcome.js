import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './account/signup';
import SignInScreen from './account/signin';

const Stack = createNativeStackNavigator();

function Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to <Text style={styles.bottomHeader}>Explore</Text>
      </Text>
      <Image
        source={require('../assets/images/start/welcome.gif')}
        style={styles.image}
      />
      <View style={styles.buttonRow}>
        <CustomButton
          text="Sign Up"
          textSize={22}
          onPress={() => navigation.navigate('SignUp')}
        />
        <CustomButton
          text="Sign In"
          textSize={22}
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
}

export default function WelcomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 55,
    textAlign: 'right',
  },
  bottomHeader: {
    fontWeight: '100',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
});
