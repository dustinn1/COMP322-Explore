import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import countries from '../../data/countries.json';

export default function Continent({ route, navigation }) {
  const { name } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.country}>
      <Text style={styles.countryText}>{item.country}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={countries.filter(country => country.continent === name)}
        renderItem={renderItem}
        keyExtractor={country => country.country}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  country: {
    padding: 15,
    borderBottomWidth: 1,
  },
  countryText: {
    fontSize: 16,
    fontWeight: '200',
  },
});
