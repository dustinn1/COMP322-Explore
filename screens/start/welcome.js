import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SharedButton from '../../shared/SharedButton';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 55, fontWeight: '100' }}> Welcome to     </Text>
        <Text style={styles.welcome}> Explore    </Text>
        <Image source={require('../../assets/images/start.gif')} style={{ resizeMode: 'contain', width: 350 }} />

        <SharedButton text='Get Started' onPress={() => NavigationContainer.navigate('Continents')} />

      </View>

    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  welcome: {
    fontSize: 55,
  },

})