import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import description from '../../data/description_test.json';
import photos from '../../data/photos_test.json';

const photoRenderItem = ({ item }) => {
  return (
    <View style={styles.galleryPhotoContainer}>
      <Image style={styles.galleryPhoto} source={{ uri: item.url_max }} />
    </View>
  );
};

export default function HotelScreen({ route }) {
  const { searchData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.headerImage}
        source={{ uri: searchData.max_photo_url }}
      />
      <View style={styles.hotelInfo}>
        <Text style={styles.headerText}>{searchData.hotel_name}</Text>
        <Text style={styles.description}>{description.description}</Text>
        <Text>Photos ({photos.length})</Text>
      </View>
      <FlatList
        data={photos}
        renderItem={photoRenderItem}
        keyExtractor={photo => photo.photo_id}
        horizontal
        nestedScrollEnabled
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: Dimensions.get('screen').width,
    height: 150,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  hotelInfo: {
    padding: 12,
  },
  description: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  galleryPhotoContainer: {
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  galleryPhoto: {
    width: 250,
    height: 175.78,
  },
});
