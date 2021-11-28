import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
//import { Calendar } from 'react-native-calendars';
import CustomButton from '../../components/CustomButton';

export default function DetailsSelect({ route }) {
  const { country } = route.params;
  const currentDate = new Date();

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkInDateOpen, setCheckInDateOpen] = useState(false);

  const [checkOutDate, setCheckOutDate] = useState(currentDate);
  const [checkOutDateOpen, setCheckOutDateOpen] = useState(false);

  const [adultsAmount, onAdultsAmountChange] = useState(0);
  const [childrenAmount, onChildrenAmountChange] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{country}</Text>
      <View>
        <Text>Check In Date</Text>
        <Text>{checkInDate.toDateString()}</Text>
        <Button title="Open" onPress={() => setCheckInDateOpen(true)} />
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
      <Text>To</Text>
      <View>
        <Text>Check Out Date</Text>
        <Text>{checkOutDate.toDateString()}</Text>
        <Button title="Open" onPress={() => setCheckOutDateOpen(true)} />
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
      <View>
        <Text>Adults</Text>
        <TextInput
          value={adultsAmount.toString()}
          onChangeText={onAdultsAmountChange}
        />
      </View>
      <View>
        <Text>Children</Text>
        <TextInput
          value={childrenAmount.toString()}
          onChangeText={onChildrenAmountChange}
        />
      </View>
      <CustomButton text="Continue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
});
