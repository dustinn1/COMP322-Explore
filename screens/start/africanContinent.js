import React from '.react';
import { StyleSheet, Text, View } from 'react-native';

const africanContinent =({navigation}) =>{
    return(
        <View style ={StyleSheet.container}>
            <Text style= {{fontSize: 55, fontWeight:'100'}}>Welcome to  </Text> 
            <Text style={styles.africa}>AFRICA!!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    africa:{
        fontSize: 55,
    }
})