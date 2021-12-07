import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import rooms from '../../data/rooms_test.json';

export default function HotelReviews() {
  return (
    <ScrollView style={styles.container}>
      {rooms[0].block.map(room => (
        <Text>{room.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
