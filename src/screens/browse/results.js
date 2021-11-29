import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import HotelResult from '../../components/HotelResult';
import data from '../../data/results_test.json';

export default function Results({ route, navigation }) {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <Text>{country}</Text>
      <FlatList
        data={data.result}
        renderItem={({ item }) => (
          <HotelResult item={item} navigation={navigation} />
        )}
        keyExtractor={hotel => hotel.hotel_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
