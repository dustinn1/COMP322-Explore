import React from '.react';
import { StyleSheet, Text, View } from 'react-native';

const europeanContinent =({navigation}) =>{
    return(
        <View style ={StyleSheet.container}>
            <Text style= {{fontSize: 55, fontWeight:'100'}}>Welcome to  </Text> 
            <Text style={styles.europe}>EUROPE!!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    europe:{
        fontSize: 55,
    }
})