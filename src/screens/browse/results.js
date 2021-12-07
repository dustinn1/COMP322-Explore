import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import HotelResult from '../../components/HotelResult';
import secret from '../../data/secret.json';

function formatDate(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
}

export default function Results({ route, navigation }) {
  const { country, checkInDate, checkOutDate, adultsAmount, roomAmount } =
    route.params;

  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/search?units=metric&order_by=class_descending&checkout_date=${formatDate(
        checkOutDate,
      )}&adults_number=${adultsAmount}&checkin_date=${formatDate(
        checkInDate,
      )}&room_number=${roomAmount}&filter_by_currency=USD&dest_type=country&locale=en-us&dest_id=13&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A5%2Cclass%3A%3A4`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': secret.apiKey,
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoaded(true);
      })
      .catch(err => {
        console.error(err);
      });
  }, [adultsAmount, checkInDate, checkOutDate, roomAmount]);

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
            {adultsAmount} Adults, {roomAmount} Rooms
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loaded ? (
        <FlatList
          data={results.result}
          renderItem={({ item }) => (
            <HotelResult item={item} navigation={navigation} />
          )}
          keyExtractor={hotel => hotel.hotel_id}
          ListHeaderComponent={<ResultsHeader />}
          ListEmptyComponent={
            <View style={styles.emptyResultsContainer}>
              <Text>No hotels available. Try editing your details.</Text>
            </View>
          }
        />
      ) : (
        <View style={[styles.container, styles.indicatorContainer]}>
          <ActivityIndicator />
        </View>
      )}
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
  emptyResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
