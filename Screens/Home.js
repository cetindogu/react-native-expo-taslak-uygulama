import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Client, MacListesiRequest } from "../SkorTahminApiModule";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    doPostRequest();
  }, []);
  async function doPostRequest() {
    console.log('in 1');
    try {
      const apiClient = new Client("http://test-api.com");
      // Create the request object
      let request = new MacListesiRequest();
      request.skip = 0;
      request.take = 10;
      request.sorting = "mac_saati desc";
      console.log('in 2');
      await apiClient
        .macListesiGetir(request)
        .then((response) => {
          console.log('in 3');
          console.log("response", response);
          setItems(response.data.maclar)
        })
        .then((data) => console.log("data", data))
        .catch((error) => {
          console.log('in 12');

          // Handle any errors or exceptions here
          console.error(error);
        });
      // You can access the match data from the response
    } catch (errorGlobal) {
      console.log('in 4');
      console.error(errorGlobal);
      console.log("errorGlobal", JSON.stringify(errorGlobal));
    }
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Ana Sayfa</Text>
      {items.map((match) => (
        <Text key={match.mac_guid}>{match.mac_ad}</Text>
      ))}
    </View>
  );
}
export default Home;
