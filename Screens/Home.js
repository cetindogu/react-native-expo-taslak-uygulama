import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Client, MacListesiRequest } from "../SkorTahminApiModule";
import { retrieveStringData, saveStringData } from "../HelperFunctions";
import { useFocusEffect } from "@react-navigation/native";

function Home({ navigation }) {
  const defaultBaseUrl = "http://10.0.2.2";
  const [items, setItems] = useState([]);
  const [baseUrl, setBaseUrl] = useState([]);
  useEffect(() => {
    // var urlInAsyncStorage = await retrieveStringData("baseUrl");
    // setBaseUrl(urlInAsyncStorage);
    // urlInAsyncStorage == null ? "http://10.0.0.2:81" : urlInAsyncStorage
  }, []);
  // This function will run each time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // console.log("in useEffect HOME");
      // Retrieve data without await
      retrieveStringData("baseUrl").then(async (data) => {
        if (data == null) {
          data = defaultBaseUrl;
          await saveStringData("baseUrl", defaultBaseUrl);
          setBaseUrl(defaultBaseUrl);
        }
        // console.log("Retrieved string data:", data);
        setBaseUrl(data);
        // You can work with the retrieved data here
        doPostRequest(data);
      });
    }, [])
  );

  async function doPostRequest(urlInAsyncStorage) {
    // console.log("in 1 urlInAsyncStorage", urlInAsyncStorage);
    try {
      const apiClient = new Client(urlInAsyncStorage);
      // console.log("urlInAsyncStorage", urlInAsyncStorage);
      // Create the request object
      let request = new MacListesiRequest();
      request.skip = 0;
      request.take = 10;
      request.sorting = "mac_saati desc";
      // console.log("in 2");
      await apiClient
        .macListesiGetir(request)
        .then((response) => {
          // console.log("in 3");
          // console.log("response", response);
          setItems(response.data.maclar);
        })
        // .then((data) => console.log("data", data))
        .catch((error) => {
          setItems([]);
          // console.log("in 12");

          // Handle any errors or exceptions here
          console.error(error);
        });
      // You can access the match data from the response
    } catch (errorGlobal) {
      // console.log("in 4");
      console.error(errorGlobal);
      console.log("errorGlobal", JSON.stringify(errorGlobal));
    }
  }
  function formatDateTime(mac_saati) {
    // Assuming that `mac_saati` is a string in ISO 8601 date format
    const date = new Date(mac_saati);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return (
    <>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>Ana Sayfa</Text>
        {items.map((match) => (
          <Text key={match.mac_guid}>
            {match.ev_sahibi_takim_ad} - {match.konuk_takim_ad} -{" "}
            {formatDateTime(match.mac_saati)}
          </Text>
        ))}
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>BaseUrl : {baseUrl}</Text>
      </View>
    </>
  );
}
export default Home;
