import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import HotelResult from '../components/HotelResult';

export default function Saved({ navigation }) {
  const [saved, setSaved] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedHotels = firestore()
      .collection(auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const hotels = [];

        querySnapshot.forEach(documentSnapshot => {
          hotels.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setSaved(hotels);
        setLoaded(true);
      });
    return () => savedHotels();
  }, []);

  return (
    <View style={styles.container}>
      {loaded ? (
        <FlatList
          data={saved}
          renderItem={({ item }) => (
            <HotelResult
              item={item.extraData}
              navigation={navigation}
              checkInDate={item.check_in_date}
              checkOutDate={item.check_out_date}
              adultsAmount={item.adults_amount}
              roomAmount={item.room_amount}
            />
          )}
          keyExtractor={item => item.key}
          ListEmptyComponent={
            <View style={styles.emptyResultsContainer}>
              <Text>No Saved Hotels</Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
