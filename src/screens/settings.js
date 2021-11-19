import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAllKeys, clearAllKeys } from '../utils/AsyncStorage';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Async Storage Test</Text>
      <Button title="All Keys" onPress={getAllKeys} />
      <Button title="Clear Keys" onPress={clearAllKeys} />
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
