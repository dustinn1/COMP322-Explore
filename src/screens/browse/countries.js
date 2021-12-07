import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import countries from '../../data/countries.json';
import CustomButton from '../../components/CustomButton';

export default function Continent({ route, navigation }) {
  const { name } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.country}>
      <CustomButton
        text={item.name}
        onPress={() =>
          navigation.navigate('DetailsSelect', {
            country: item.name,
            dest_id: item.dest_id,
          })
        }
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={countries.filter(country => country.continent === name)}
        renderItem={renderItem}
        keyExtractor={country => country.code}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  country: {
    margin: 7,
    alignItems: 'center',
  },
});
