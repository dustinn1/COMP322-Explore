import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default function CustomInput({
  value,
  onChangeText,
  label,
  errorMessage,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const onFocusChange = () => setIsFocused(!isFocused);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[errorMessage !== '' && styles.labelError, styles.label]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          isFocused ? styles.inputFocus : styles.inputUnfocus,
          errorMessage !== '' && styles.inputError,
          styles.input,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocusChange}
        onBlur={onFocusChange}
        {...props}
      />
      {errorMessage !== '' && (
        <Text style={[styles.labelError, styles.label]}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginVertical: 5,
  },
  label: {
    marginVertical: 1,
  },
  labelError: {
    color: 'red',
  },
  input: {
    fontSize: 14,
    padding: 10,
    borderStyle: 'solid',

    borderWidth: 1,
    borderRadius: 4,
  },
  inputFocus: {
    borderColor: '#1f73b8',
  },
  inputUnfocus: {
    borderColor: '#777777',
  },
  inputError: {
    borderColor: 'red',
    color: 'red',
  },
});
