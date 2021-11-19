import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Continent({ route }) {
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
