import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function HotelReviews({ route }) {
  const { reviews } = route.params;

  return (
    <ScrollView style={styles.container}>
      {reviews.result.map(review => (
        <Text>{review.review_hash}</Text>
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
