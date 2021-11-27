import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a key-value pair
 * @param {string} key
 * @param {string} value
 */
export const storeKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get the value associated with a given key
 * @param {string} key
 * @returns A promise of the value if not null, otherwise null
 */
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

/**
 * Clear all key-value pairs from storage
 */
export const clearAllKeys = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log(err);
  }

  console.log('Done.');
};

/**
 * Get all key-value pairs and print it to the console
 */
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
