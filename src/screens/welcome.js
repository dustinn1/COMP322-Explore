import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { storeKey } from '../utils/AsyncStorage';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to <Text style={styles.bottomHeader}>Explore</Text>
      </Text>
      <Image
        source={require('../assets/images/start/welcome.gif')}
        style={styles.image}
      />
      <CustomButton
        text="Get Started"
        textSize={22}
        onPress={() => {
          navigation.navigate('ContinentsSelect');
          storeKey('welcome', 'true');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 55,
    textAlign: 'right',
  },
  bottomHeader: {
    fontWeight: '100',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
});
