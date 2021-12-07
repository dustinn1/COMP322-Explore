import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Settings({ navigation }) {
  const user = auth().currentUser;

  return (
    <View style={styles.container}>
      {user !== null && (
        <>
          <Text>Currently logged in as:</Text>
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
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
