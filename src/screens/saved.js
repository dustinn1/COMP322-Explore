import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Saved() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved</Text>
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
