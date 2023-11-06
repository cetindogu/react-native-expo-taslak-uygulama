import AsyncStorage from "@react-native-async-storage/async-storage";

// Save a string to AsyncStorage
export const saveStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("String data saved with key:", key, value);
  } catch (error) {
    console.error("Error saving string data with key", key, ":", error);
  }
};

// Retrieve a string from AsyncStorage
export const retrieveStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log("String data not found for key:", key);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving string data with key", key, ":", error);
    return null;
  }
};

// Save data to AsyncStorage
export const saveObjectData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Data saved with key:", key);
  } catch (error) {
    console.error("Error saving data with key", key, ":", error);
  }
};

// Retrieve data from AsyncStorage
export const retrieveObjectData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log("Data not found for key:", key);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data with key", key, ":", error);
    return null;
  }
};
