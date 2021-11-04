import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from "../carousal";

const images =[
  {"id":1,"title":"Engagements", "loc":"require('./images/idli.png')", "link":"https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  {"id":2,"title":"Deep", "loc":"require('./images/upma.png')","link":"https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"},
  /*{"id":3,"title":"C", "link":"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
  {"id":4,"title":"B", "link":"https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
  {"id":5,"title":"A", "link":"https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}*/
  ];
  

export default function ContinentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where would you like to go?</Text>
      <Carousel images={images} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 35,
    marginTop: 30,
    fontWeight: '100',
    textAlign: 'center',
  },
});
