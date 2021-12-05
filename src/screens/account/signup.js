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

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function createAccount() {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (email === '') {
      setEmailError('Please enter a valid email address!');
    }
    if (password === '') {
      setPasswordError('Please enter a valid password!');
    }
    if (confirmPassword === '') {
      setConfirmPasswordError('Please enter a valid password!');
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      setConfirmPasswordError('Passwords do not match!');
    }

    if (
      emailError === '' &&
      passwordError === '' &&
      confirmPasswordError === ''
    ) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('ContinentsSelect');
          //storeKey('welcome', 'true');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setEmailError('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            setEmailError('Please enter a valid email address!');
          }
          if (error.code === 'auth/weak-password') {
            setPasswordError(
              'Please enter a stronger password! (at least 6 characters)',
            );
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
      <CustomInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        label="Confirm Password"
        errorMessage={confirmPasswordError}
        secureTextEntry
        password
        textContentType="newPassword"
        autoCapitalize="none"
      />
      <CustomButton
        text="Sign Up"
        textSize={22}
        onPress={() => createAccount()}
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
