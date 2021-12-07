import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import secret from '../../data/secret.json';

function formatDate(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
}

export default function HotelRooms({ route }) {
  const { checkOutDate, checkInDate, hotelId, adultsAmount, roomAmount } =
    route.params;
  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState(null);

  function Block({ block, room }) {
    return (
      <View style={styles.roomContainer}>
        <View style={styles.mainInformation}>
          <Image
            source={{ uri: room.photos[0].url_original }}
            style={styles.image}
          />
          <Text style={styles.header}>{block.name}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: block.price_breakdown.currency,
            }).format(block.price_breakdown.gross_price)}
          </Text>
          <CustomButton
            half
            text="Book"
            textSize={14}
            onPress={() =>
              Linking.openURL(
                `https://secure.booking.com/book.html?hotel_id=${hotelId}&checkin=${formatDate(
                  checkInDate,
                )}&interval=2&stage=1&nr_rooms_${block.block_id}=1`,
              )
            }
          />
        </View>
      </View>
    );
  }

  useEffect(() => {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/room-list?locale=en-us&checkout_date=${formatDate(
        checkOutDate,
      )}&currency=USD&hotel_id=${hotelId}&adults_number_by_rooms=${
        adultsAmount / roomAmount
      }&checkin_date=${formatDate(checkInDate)}&units=metric`,
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
  }, [adultsAmount, checkInDate, checkOutDate, roomAmount, hotelId]);

  return (
    <>
      {loaded ? (
        <ScrollView style={styles.container}>
          {results[0].block.map(block => (
            <Block
              block={block}
              room={results[0].rooms[block.room_id]}
              key={block.block_id}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.indicatorContainer]}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#777777',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  mainInformation: {
    flexDirection: 'row',
  },
  image: {
    height: 70,
    width: 70,
  },
  header: {
    fontSize: 14,
    flexWrap: 'wrap',
    width: '80%',
    padding: 7,
  },
  bottomRow: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
