// SettingsScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveStringData, retrieveStringData } from "../HelperFunctions";

const Settings = () => {
  const [newBaseUrl, setNewBaseUrl] = useState("");
  const [currentBaseUrl, setCurrentBaseUrl] = useState("");

  useEffect(() => {
    // Load the current baseUrl from AsyncStorage when the component mounts
    loadCurrentBaseUrl();
  }, []);

  const loadCurrentBaseUrl = async () => {
    try {
      const baseUrl = await getBaseUrl();
      // console.log("baseUrlaaa", baseUrl);
      setCurrentBaseUrl(baseUrl);
    } catch (error) {
      console.error("Error loading baseUrl:", error);
    }
  };

  const getBaseUrl = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem("baseUrl");
      console.log("baseUrl in AsyncStorage ", baseUrl);
      return baseUrl ?? "http://10.0.2.2"; // Provide a default value if none is set
    } catch (error) {
      console.error("Error getting baseUrl:", error);
      return "defaultBaseUrl"; // Provide a default value if there is an error
    }
  };
  // When the user changes the baseUrl, save it to AsyncStorage
  const saveBaseUrl = async () => {
    try {
      var yenibaseUrl = "";
      console.log({ newBaseUrl });
      if (!newBaseUrl || newBaseUrl == "") yenibaseUrl = "http://10.0.2.2";
      else yenibaseUrl = newBaseUrl;
      console.log({ yenibaseUrl });
      await saveStringData("baseUrl", yenibaseUrl); //await AsyncStorage.setItem("baseUrl", yenibaseUrl);
      setCurrentBaseUrl(yenibaseUrl);
    } catch (error) {
      console.error("Error saving baseUrl:", error);
    }
  };
  return (
    <View>
      <Text>Settings Page</Text>
      <Text>Current Base URL: {currentBaseUrl}</Text>
      <TextInput
        placeholder="Enter New Base URL"
        value={newBaseUrl}
        onChangeText={(text) => setNewBaseUrl(text)}
      />
      <Button title="Save" onPress={saveBaseUrl} />
    </View>
  );
};

export default Settings;
