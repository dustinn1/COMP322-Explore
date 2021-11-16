import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomButton from '../../components/CustomButton';

const data = [
  {
    id: 1,
    title: 'Asia',
    image: require('../../assets/images/start/asia.png'),
    loc: 'asianContinent',
  },
  {
    id: 2,
    title: 'Africa',
    image: require('../../assets/images/start/africa.png'),
    loc: 'africanContinent',
  },
  {
    id: 3,
    title: 'Oceania',
    image: require('../../assets/images/start/africa.png'),
    loc: 'australianContinent',
  },
  {
    id: 4,
    title: 'Europe',
    image: require('../../assets/images/start/africa.png'),
    loc: 'europeanContinent',
  },
  {
    id: 5,
    title: 'North America',
    image: require('../../assets/images/start/africa.png'),
  },
  {
    id: 6,
    title: 'South America',
    image: require('../../assets/images/start/southamerica.png'),
  },
];

export default function ContinentsScreen({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.item}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Image source={item.image} style={styles.itemImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where would you like to go?</Text>
      <Carousel
        ref={ref}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width - 100}
        onSnapToItem={index => setActiveIndex(index)}
        containerCustomStyle={{}}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={ref}
        tappableDots={true}
      />
      <CustomButton
        text="Select"
        onPress={() =>
          navigation.navigate('CountriesSelect', {
            name: data[activeIndex].title,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 50,
  },
  header: {
    fontSize: 35,
    marginTop: 50,
    fontWeight: '100',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: '200',
    marginBottom: -50,
    textDecorationLine: 'underline',
  },
  itemImage: {
    maxWidth: Dimensions.get('screen').width - 100,
    maxHeight: Dimensions.get('screen').width - 100,
  },
});
