import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';

const HotelResult = ({ item, navigation }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('Hotel', {
          name: item.hotel_name,
        })
      }>
      <Image
        style={styles.image}
        source={{
          uri: `https://cf.bstatic.com/xdata/images/hotel/square85/${
            item.main_photo_id
          }.jpg?${item.main_photo_url.split('?')[1]}`,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.hotel_name}>{item.hotel_name}</Text>
        <View style={styles.info_bottom}>
          <Text>{item.city}</Text>
          <Text style={styles.price}>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: item.currencycode,
            }).format(item.min_total_price)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#777777',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  image: {
    height: 85,
    width: 85,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 7,
    alignContent: 'space-between',
  },
  hotel_name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
    width: '100%',
  },
  info_bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    width: '100%',
  },
  price: {
    fontWeight: '700',
  },
});

export default HotelResult;
