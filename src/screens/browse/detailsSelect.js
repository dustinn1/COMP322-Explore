import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function DetailsSelect({ route, navigation }) {
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
      <View style={styles.inputs}>
        <Text>Check in Date</Text>
        <Button
          title={checkInDate.toDateString()}
          onPress={() => setCheckInDateOpen(true)}
        />
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
        <Text>Check Out Date</Text>
        <Button
          title={checkOutDate.toDateString()}
          onPress={() => setCheckOutDateOpen(true)}
        />
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
      <View style={styles.inputs}>
        <CustomInput
          value={adultsAmount.toString()}
          onChangeText={onAdultsAmountChange}
          label="Number of Adults"
          errorMessage=""
        />
        <CustomInput
          value={childrenAmount.toString()}
          onChangeText={onChildrenAmountChange}
          label="Number of Children (Optional)"
          errorMessage=""
        />
        <CustomButton
          text="Continue"
          onPress={() =>
            navigation.navigate('Results', {
              country: country,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              adultsAmount: adultsAmount,
              childrenAmount: childrenAmount,
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 50,
  },
  inputs: {
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
  },
  display: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
  },
});
