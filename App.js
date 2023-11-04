import React, { Component } from "react";
import HomeScreen from "./Screens/Home";
import NotificationScreen from "./Screens/Notification";
import ProfileScreen from "./Screens/Profile";
import SearchScreen from "./Screens/Search";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="black" />
      {/* Add this line */}
      <Tab.Navigator
        labeled={true}
        barStyle={{ backgroundColor: "black" }}
        activeColor="white"
      >
        <Tab.Screen
          name="Ana Sayfa"
          component={HomeScreen} //Home Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Ara"
          component={SearchScreen} // Search Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Bildirimler"
          component={NotificationScreen}
          // Notification Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen} // Profile Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// export default function App() {a
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
