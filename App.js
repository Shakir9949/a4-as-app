// App.js
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParkingListScreen from "./screens/ParkingListScreen";
import AddParkingScreen from "./screens/AddParkingScreen";
import ParkingDetailScreen from "./screens/ParkingDetailScreen";
import { colors } from "./theme";

const Stack = createNativeStackNavigator();

// Custom theme for navigation
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.black, // sets screen background
    primary: colors.gold,     // header back button & tint
    text: colors.gold          // header title color
  },
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="ParkingList"
          screenOptions={{
            headerStyle: { backgroundColor: colors.black },
            headerTintColor: colors.gold,
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          }}
        >
          <Stack.Screen
            name="ParkingList"
            component={ParkingListScreen}
            options={{ title: "My Parking List" }}
          />
          <Stack.Screen
            name="AddParking"
            component={AddParkingScreen}
            options={{ title: "Add Parking" }}
          />
          <Stack.Screen
            name="ParkingDetail"
            component={ParkingDetailScreen}
            options={{ title: "Parking Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
