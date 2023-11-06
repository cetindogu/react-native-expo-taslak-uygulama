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
          console.log('id',response.id);
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
  // async function doRestRequest() {
  //   try {
  //     console.log("Client", Client);
  //     const apiClient = new Client("http://localhost:5000");

  //     // Create the request object
  //     let request = new MacListesiRequest();
  //     request.skip = 0;
  //     request.take = 10;
  //     request.sorting = "mac_saati desc";
  //     console.log("BEFORE");
  //     apiClient
  //       .macListesiGetir(request)
  //       .then((response) => {
  //         // Handle the successful response here
  //         console.log("Total matches: " + response.toplamMacSayisi);
  //         console.log("Matches: ", response.maclar);
  //         setMatches(matches);
  //       })
  //       .catch((error) => {
  //         // Handle any errors or exceptions here
  //         console.error("Error:", JSON.stringify(error));
  //       });
  //     console.log("AFTERRRRR");
  //     // Handle the response here
  //     console.log("Received match data:", response);

  //     // You can access the match data from the response
  //   } catch (error) {
  //     console.log("gataerror", JSON.stringify(error));
  //   }
  // }

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
