import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function DetailsSelect({ route, navigation }) {
  const { country, dest_id } = route.params;
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkInDateOpen, setCheckInDateOpen] = useState(false);

  const [checkOutDate, setCheckOutDate] = useState(nextDate);
  const [checkOutDateOpen, setCheckOutDateOpen] = useState(false);

  const [adultsAmount, onAdultsAmountChange] = useState(1);
  const [roomAmount, onRoomAmountChange] = useState(1);

  const [dateError, setDateError] = useState('');
  const [adultsError, setAdultsError] = useState('');
  const [roomError, setRoomError] = useState('');

  function onSubmit() {
    setAdultsError('');
    setRoomError('');
    setDateError('');
    if (adultsAmount < 1) {
      setAdultsError('Please enter an amount larger than one (1)!');
    } else if (adultsAmount > 30) {
      setAdultsError('Please enter an amount less than thirty (30)!');
    }
    if (roomAmount < 1) {
      setRoomError('Please enter an amount larger than one (1)!');
    } else if (roomAmount > 10) {
      setRoomError('Please enter an amount less than ten (10)!');
    }

    if (checkOutDate.getTime() <= checkInDate.getTime()) {
      setDateError(
        'Please enter a check out date later than the check in date!',
      );
    }

    if (adultsError === '' && roomError === '' && dateError === '') {
      navigation.navigate('Results', {
        country: country,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adultsAmount: adultsAmount,
        roomAmount: roomAmount,
        dest_id: dest_id,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{country}</Text>
      <View style={styles.inputs}>
        {dateError !== '' && <Text style={styles.dateError}>{dateError}</Text>}
        <View style={styles.datePickers}>
          <View style={styles.date}>
            <Text>Check in</Text>
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
          </View>
          <View style={styles.date}>
            <Text>Check Out</Text>
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
        </View>
      </View>
      <View style={styles.inputs}>
        <CustomInput
          value={adultsAmount.toString()}
          onChangeText={onAdultsAmountChange}
          label="Number of Adults"
          errorMessage={adultsError}
          keyboardType="number-pad"
          maxLength={2}
        />
        <CustomInput
          value={roomAmount.toString()}
          onChangeText={onRoomAmountChange}
          label="Number of Rooms"
          errorMessage={roomError}
          keyboardType="number-pad"
          maxLength={2}
        />
        <CustomButton text="Continue" onPress={() => onSubmit()} />
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
    width: '95%',
    marginVertical: 20,
    alignItems: 'center',
  },
  display: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
  },
  datePickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    alignItems: 'center',
  },
  dateError: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
