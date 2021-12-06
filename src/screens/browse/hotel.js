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
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-progress/Bar';

import description from '../../data/description_test.json';
import photos from '../../data/photos_test.json';
import review_scores from '../../data/review_scores_test.json';

const photoRenderItem = ({ item, index }) => {
  return (
    <View style={styles.galleryPhotoContainer}>
      <Image style={styles.galleryPhoto} source={{ uri: item.url_max }} />
      <Text>
        {index + 1} / {photos.length}{' '}
      </Text>
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
      <View style={styles.section}>
        <Text style={styles.headerText}>{searchData.hotel_name}</Text>
        <Text>
          {[...Array(searchData.class)].map((e, i) => (
            <Icon name="star" key={i} />
          ))}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>
          {searchData.address}, {searchData.city} {searchData.zip}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.description}>{description.description}</Text>
      </View>
      <Text style={styles.sectionHeader}>Photos ({photos.length})</Text>
      <FlatList
        data={photos}
        renderItem={photoRenderItem}
        keyExtractor={photo => photo.photo_id}
        horizontal
        nestedScrollEnabled
      />
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
          {review_scores.score_breakdown
            .filter(item => item.customer_type === 'total')
            .map(item =>
              item.question
                .filter(question => question.question !== 'total')
                .map(question => (
                  <View style={styles.reviewScore}>
                    <ProgressBar
                      progress={question.score / 10}
                      width={Dimensions.get('window').width / 2.5}
                    />
                    <Text
                      key={question.question}
                      style={styles.reviewScoreText}>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  section: {
    borderBottomWidth: 1,
    borderColor: '#bababa',
    borderStyle: 'solid',
    marginBottom: 10,
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 20,
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
  reviewScores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reviewScore: {
    alignItems: 'center',
    width: Dimensions.get('screen').width / 2,
  },
  reviewScoreText: {
    marginTop: 2,
    marginBottom: 5,
    fontSize: 12,
  },
  reviewScoresTotal: {
    alignItems: 'center',
    marginVertical: 10,
  },
  reviewScoresTotalText: {
    marginTop: 3,
    fontWeight: '700',
  },
});
