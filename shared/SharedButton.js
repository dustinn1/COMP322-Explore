import React from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

export default function ButtonShared({ text, onPress }) {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}> {text}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {

        width: 250,
        position: 'absolute',
        bottom: 90,
        right: 65,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddintHorizontal: 22,


    },
    text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '100',
        //fontFamily: 'Verdana',


    }
});
