import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAllKeys, clearAllKeys } from '../utils/AsyncStorage';
import auth from '@react-native-firebase/auth';

export default function Settings({ navigation }) {
  const user = auth().currentUser;

  return (
    <View style={styles.container}>
      <Text>Async Storage Test</Text>
      <Button title="All Keys" onPress={getAllKeys} />
      <Button title="Clear Keys" onPress={clearAllKeys} />
      <Text>User</Text>
      {user !== null && (
        <>
          <Text>{user.uid}</Text>
          <Text>{user.email}</Text>
        </>
      )}
      <Button
        title="Log Out"
        onPress={() =>
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              navigation.navigate('Browse', {
                screen: 'Welcome',
              });
            })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header: {
    fontSize: 55,
    textAlign: 'right',
  },
  australia: {
    fontSize: 55,
  },
});
