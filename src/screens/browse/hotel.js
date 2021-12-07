import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

import description from '../../data/description_test.json';
import photos from '../../data/photos_test.json';
import review_scores from '../../data/review_scores_test.json';
import reviews from '../../data/reviews_test.json';

export default function HotelScreen({ route, navigation }) {
  const { searchData } = route.params;
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

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
    <ScrollView style={styles.container}>
      <Image
        style={styles.headerImage}
        source={{ uri: searchData.max_photo_url }}
      />
      <View style={styles.section}>
        <Text style={styles.headerText}>{searchData.hotel_name}</Text>
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
        <CustomButton half text="Save" />
        <CustomButton
          half
          text="Book"
          onPress={() => navigation.navigate('HotelRooms')}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.description}>{description.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Photos ({photos.length})</Text>
        <FlatList
          data={photos}
          renderItem={photoRenderItem}
          keyExtractor={photo => photo.photo_id}
          horizontal
          nestedScrollEnabled
        />
        <ImageView
          images={photos.map(photo => {
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
          <Button
            onPress={() =>
              navigation.navigate('HotelReviews', {
                reviews: reviews,
              })
            }
            title="All Reviews"
          />
        </View>
        <View style={styles.reviewScores}>
          {review_scores.score_breakdown
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
    fontSize: 30,
    fontWeight: '700',
    marginTop: 7,
    marginBottom: 7,
  },
  headerBottomRow: {
    flexDirection: 'row',
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
