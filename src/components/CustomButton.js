import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function CustomButton({ text, textSize, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#D0D0D0' : '#ededed',
        },
        styles.button,
      ]}>
      <Text style={[{ fontSize: textSize ?? 18 }, styles.text]}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  text: {
    textAlign: 'center',
  },
});
