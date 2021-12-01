import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';

export default function DetailsSelect({ route, navigation }) {
  const { country } = route.params;
  const currentDate = new Date();

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkInDateOpen, setCheckInDateOpen] = useState(false);

  const [checkOutDate, setCheckOutDate] = useState(currentDate);
  const [checkOutDateOpen, setCheckOutDateOpen] = useState(false);

  const [adultsAmount, onAdultsAmountChange] = useState(0);
  const [childrenAmount, onChildrenAmountChange] = useState(0);

  //<Text style={styles.input}>Check In Date</Text>
  //<Text>To</Text>
  //<Text style={styles.input}>Check Out Date</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{country}</Text>
      <View style={[styles.card, styles.shadowProp]}>
      <View style={styles.side}>
       
          <Button title="Check In Date: " onPress={() => setCheckInDateOpen(true)} />
          <Text style={styles.display}>{checkInDate.toDateString()}</Text>     
          <DatePicker
            modal
          mode="date"
          title="Set Check In Date"
          open={checkInDateOpen}
          date={checkInDate}
          onConfirm={date => {
            setCheckInDateOpen(false);
            setCheckInDate(date);
          }}
          onCancel={() => {
            setCheckInDateOpen(false);
          }}
        />
     </View>
      <View style={styles.side}>       
        <Button title="Check Out Date:" onPress={() => setCheckOutDateOpen(true)} />
        <Text style={styles.display}>{checkOutDate.toDateString()}</Text>       
        <DatePicker
          modal
          mode="date"
          title="Set Check Out Date"
          open={checkOutDateOpen}
          date={checkOutDate}
          onConfirm={date => {
            setCheckOutDateOpen(false);
            setCheckOutDate(date);
          }}
          onCancel={() => {
            setCheckOutDateOpen(false);
          }}
        />
      </View>
      

      <View style={styles.side}> 
        <Text style={styles.display}>Adults: </Text>
        <TextInput
          style={styles.display}
          value={adultsAmount.toString()}
          onChangeText={onAdultsAmountChange}
        />
      </View>
      <View style={styles.side}>
        <Text style={styles.display}> Children: </Text>
        <TextInput
          style={styles.display}
          value={childrenAmount.toString()}
          onChangeText={onChildrenAmountChange}
        />
      </View>
      
      <CustomButton
        text="Continue"
        onPress={() =>
          navigation.navigate('Results', {
            country: country,
          })
        }
      />
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
   

    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    height:'10%',
    alignItems: 'center',

    shadowColor: '#171717',
    shadowOffset: {width: -4, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  card: {  
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '90%',
    height: '50%',
    marginVertical: 10,
    paddingBottom: 60,
    alignItems: 'center',
  
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -4, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  display: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
    width: '40%',
    //alignItems: 'center',

  },
  side: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
});