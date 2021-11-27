import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import countries from '../../data/countries.json';
import { countryCodeEmoji } from 'country-code-emoji';

export default function Continent({ route, navigation }) {
  const { name } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.country}>
      <Text style={styles.countryText}>
        {countryCodeEmoji(item.code)} {item.name}
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={countries.filter(country => country.continent === name)}
        renderItem={renderItem}
        keyExtractor={country => country.code}
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
