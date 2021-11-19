import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getKey = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const clearAllKeys = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log(err);
  }

  console.log('Done.');
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (err) {
    console.log(err);
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};
