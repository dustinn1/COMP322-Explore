import React from '.react';
import { StyleSheet, Text, View } from 'react-native';

const australianContinent =({navigation}) =>{
    return(
        <View style ={StyleSheet.container}>
            <Text style= {{fontSize: 55, fontWeight:'100'}}>Welcome to  </Text> 
            <Text style={styles.australia}>AUSTRALIA!!</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    australia:{
        fontSize: 55,
    }
})