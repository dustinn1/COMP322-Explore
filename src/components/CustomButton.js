import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function CustomButton({ text, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'gray' : '#000',
        },
        styles.button,
      ]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 250,
    paddingVertical: 10,
    paddintHorizontal: 25,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '200',
  },
});
