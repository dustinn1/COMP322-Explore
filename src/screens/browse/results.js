import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import HotelResult from '../../components/HotelResult';
import data from '../../data/results_test.json';

export default function Results({ route, navigation }) {
  const { country, checkInDate, checkOutDate, adultsAmount, childrenAmount } =
    route.params;

  function ResultsHeader() {
    return (
      <View style={styles.resultsHeaderContainer}>
        <View style={styles.resultsHeaderRow}>
          <Text style={styles.resultsHeaderRowLocation}>
            <Text style={styles.resultsHeaderRowBold}>Location:</Text> {country}
          </Text>
        </View>
        <View style={styles.resultsHeaderRow}>
          <Text>
            {checkInDate.toDateString()} to {checkOutDate.toDateString()}
          </Text>
          <Text>
            {adultsAmount} Adults, {childrenAmount} Children
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <ResultsHeader /> */}
      <FlatList
        data={data.result}
        renderItem={({ item }) => (
          <HotelResult item={item} navigation={navigation} />
        )}
        keyExtractor={hotel => hotel.hotel_id}
        ListHeaderComponent={<ResultsHeader />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultsHeaderContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  resultsHeaderRow: {
    display: 'flex',
    padding: 2,
    marginVertical: 2,
    alignItems: 'center',
  },
  resultsHeaderRowBold: {
    fontWeight: '700',
  },
  resultsHeaderRowLocation: {
    fontSize: 18,
  },
});
