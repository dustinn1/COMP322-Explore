import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function CustomButton({ text, textSize, onPress, half }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#D0D0D0' : '#ededed',
          width: half ? '45%' : '85%',
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
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});
