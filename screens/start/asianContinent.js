import React from '.react';
import { StyleSheet, Text, View } from 'react-native';

const asianContinent =({navigation}) =>{
    return(
        <View style ={StyleSheet.container}>
            <Text style= {{fontSize: 55, fontWeight:'100'}}>Welcome to  </Text> 
            <Text style={styles.asia}>ASIA!!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    asia:{
        fontSize: 55,
    }
})