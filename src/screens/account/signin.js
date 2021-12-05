import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function signinAccount() {
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Please enter a valid email address!');
    }
    if (password === '') {
      setPasswordError('Please enter a valid password!');
    }

    if (emailError === '' && passwordError === '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
          navigation.navigate('ContinentsSelect');
          //storeKey('welcome', 'true');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setEmailError('Please enter a valid email address!');
          }
          if (error.code === 'auth/wrong-password') {
            setEmailError('Please enter the correct password!');
          }
          if (error.code === 'auth/user-not-found') {
            setEmailError('This user does not exist!');
          }
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        label="Email Address"
        errorMessage={emailError}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        label="Password"
        errorMessage={passwordError}
        secureTextEntry
        password
        textContentType="newPassword"
        autoCapitalize="none"
      />
      <CustomButton
        text="Sign In"
        textSize={22}
        onPress={() => signinAccount()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
});
