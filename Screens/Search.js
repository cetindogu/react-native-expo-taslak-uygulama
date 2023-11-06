import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
// import { Client, MacListesiRequest } from "../SkorTahminApiModule";
import { Client } from "../PetStoreModule";
import { AxiosError } from "axios";
function Search() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    doRestRequestPetStore();
  }, []);
  async function doRestRequestPetStore() {
    try {
      const apiClient = new Client();
      await apiClient
        .getPetById(2)
        .then((response) => {
          console.log(response);
          console.log("id", response.id);
        })
        .then((data) => console.log(data))
        .catch((error) => {
          // Handle any errors or exceptions here
          console.error(error);
          console.error("Error a:", JSON.stringify(error));
        });
      // You can access the match data from the response
    } catch (errorGlobal) {
      console.error(errorGlobal);
      console.log("gataerror", JSON.stringify(errorGlobal));
    }
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Arama Ekranı</Text>
      {/* {matches.map((match) => (
        <Text key={match.mac_guid}>{match.mac_ad}</Text>
      ))} */}
    </View>
  );
}

export default Search;
