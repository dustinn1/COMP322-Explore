import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ProgressBar from 'react-native-progress/Bar';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import secret from '../../data/secret.json';

function saveHotel(
  hotel_id,
  name,
  checkInDate,
  checkOutDate,
  adultsAmount,
  roomAmount,
  searchData,
) {
  firestore()
    .collection(auth().currentUser.uid)
    .add({
      date_saved: new Date(),
      hotel_id: hotel_id,
      name: name,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      adults_amount: adultsAmount,
      room_amount: roomAmount,
      extraData: searchData,
    })
    .then(() => {
      console.log('User added!');
    });
}

const descriptionFetch = hotel_id =>
  fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/description?locale=en-us&hotel_id=${hotel_id}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        'x-rapidapi-key': secret.apiKey,
      },
    },
  ).then(res => res.json());

const photosFetch = hotel_id =>
  fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=en-us&hotel_id=${hotel_id}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        'x-rapidapi-key': secret.apiKey,
      },
    },
  ).then(res => res.json());

const reviewsFetch = hotel_id =>
  fetch(
    `https://booking-com.p.rapidapi.com/v1/hotels/review-scores?locale=en-us&hotel_id=${hotel_id}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
        'x-rapidapi-key': secret.apiKey,
      },
    },
  ).then(res => res.json());

export default function HotelScreen({ route, navigation }) {
  const {
    name,
    searchData,
    checkInDate,
    checkOutDate,
    adultsAmount,
    roomAmount,
  } = route.params;
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      descriptionFetch(searchData.hotel_id),
      photosFetch(searchData.hotel_id),
      reviewsFetch(searchData.hotel_id),
    ])
      .then(res => {
        setData(res);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, [searchData.hotel_id]);

  const photoRenderItem = ({ item, index }) => {
    return (
      <Pressable
        style={styles.galleryPhotoContainer}
        onPress={() => {
          setImageIndex(index);
          setGalleryVisible(true);
        }}>
        <Image style={styles.galleryPhoto} source={{ uri: item.url_max }} />
      </Pressable>
    );
  };

  return (
    <>
      {loaded ? (
        <ScrollView style={styles.container}>
          <Image
            style={styles.headerImage}
            source={{ uri: searchData.max_photo_url }}
          />
          <View style={styles.section}>
            <Text style={styles.headerText}>{name}</Text>
            <View style={styles.headerBottomRow}>
              <Text>
                {[...Array(searchData.class)].map((e, i) => (
                  <Icon name="star" key={i} />
                ))}
              </Text>
              <Text>
                {searchData.address}, {searchData.city} {searchData.zip}
              </Text>
            </View>
          </View>
          <View style={[styles.section, styles.buttonRow]}>
            <CustomButton
              half
              text="Save"
              onPress={() =>
                saveHotel(
                  searchData.hotel_id,
                  name,
                  checkInDate,
                  checkOutDate,
                  adultsAmount,
                  roomAmount,
                  searchData,
                )
              }
            />
            <CustomButton
              half
              text="Book"
              onPress={() =>
                navigation.navigate('HotelRooms', {
                  checkInDate: checkInDate,
                  checkOutDate: checkOutDate,
                  adultsAmount: adultsAmount,
                  roomAmount: roomAmount,
                  hotelId: searchData.hotel_id,
                })
              }
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.description}>{data[0].description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Photos ({data[1].length})</Text>
            <FlatList
              data={data[1]}
              renderItem={photoRenderItem}
              keyExtractor={photo => photo.photo_id}
              horizontal
              nestedScrollEnabled
            />
            <ImageView
              images={data[1].map(photo => {
                return {
                  uri: photo.url_max,
                };
              })}
              imageIndex={imageIndex}
              visible={galleryVisible}
              onRequestClose={() => setGalleryVisible(false)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Reviews</Text>
            <View style={styles.reviewScoresTotal}>
              <ProgressBar
                progress={searchData.review_score / 10}
                width={Dimensions.get('window').width / 1.1}
                height={8}
                color="gold"
              />
              <Text style={styles.reviewScoresTotalText}>
                Total: {searchData.review_score}
              </Text>
            </View>
            <View style={styles.reviewScores}>
              {data[2].score_breakdown
                .filter(item => item.customer_type === 'total')
                .map(item =>
                  item.question
                    .filter(question => question.question !== 'total')
                    .map(question => (
                      <View style={styles.reviewScore} key={question.question}>
                        <ProgressBar
                          progress={question.score / 10}
                          width={Dimensions.get('window').width / 2.5}
                        />
                        <Text style={styles.reviewScoreText}>
                          {question.localized_question}: {question.score}
                        </Text>
                      </View>
                    )),
                )}
            </View>
          </View>
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
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: Dimensions.get('screen').width,
    height: 150,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 7,
    marginBottom: 7,
  },
  headerBottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    borderBottomWidth: 1,
    borderColor: '#bababa',
    borderStyle: 'solid',
    marginBottom: 10,
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    textAlign: 'justify',
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
  reviewScores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  reviewScore: {
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2 - 20,
  },
  reviewScoreText: {
    marginTop: 2,
    marginBottom: 5,
    fontSize: 12,
  },
  reviewScoresTotal: {
    alignItems: 'center',
    marginVertical: 5,
  },
  reviewScoresTotalText: {
    marginTop: 5,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
