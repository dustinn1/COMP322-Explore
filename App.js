
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const App = () => {

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 55, fontWeight: '100' }}> Welcome to     </Text>
      <Text style={styles.welcome}> Explore    </Text>
      <Image source={require('../../assets/images/start.gif')} style={{ resizeMode: 'contain', width: 350 }} />
      <Button title="Let's go"
        color='#000000'
        backgroundcolor='#000000'
        on Press={() => NavigationContainer.navigate('Continents')} />
    </View>


  );

};

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
export default App;