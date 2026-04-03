// screens/AddParkingScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { colors } from "../theme";

const AddParkingScreen = ({ navigation }) => {
  const [buildingCode, setBuildingCode] = useState("");
  const [hours, setHours] = useState("");
  const [plate, setPlate] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const validate = () => {
    if (!/^[a-zA-Z0-9]{5}$/.test(buildingCode)) return false;
    if (!/^[a-zA-Z0-9]{2,8}$/.test(plate)) return false;
    if (!["1", "4", "12", "24"].includes(hours)) return false;
    return true;
  };

  const handleAdd = async () => {
    if (!validate()) {
      Alert.alert("Invalid input", "Please check your fields.");
      return;
    }

    try {
      await addDoc(collection(db, "parkings"), {
        buildingCode,
        hours,
        plate,
        address,
        lat,
        lng,
        createdAt: new Date()
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add parking.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Parking</Text>

      <TextInput style={styles.input} placeholder="Building Code" placeholderTextColor={colors.gray} value={buildingCode} onChangeText={setBuildingCode} />
      <TextInput style={styles.input} placeholder="Hours (1,4,12,24)" placeholderTextColor={colors.gray} value={hours} onChangeText={setHours} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Car Plate" placeholderTextColor={colors.gray} value={plate} onChangeText={setPlate} />
      <TextInput style={styles.input} placeholder="Address" placeholderTextColor={colors.gray} value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Latitude" placeholderTextColor={colors.gray} value={lat} onChangeText={setLat} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Longitude" placeholderTextColor={colors.gray} value={lng} onChangeText={setLng} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Save Parking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: colors.gold, marginBottom: 20 },
  input: {
    backgroundColor: colors.gray,
    color: colors.white,
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: colors.gold,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: { color: colors.black, fontSize: 18, fontWeight: "bold" }
});

export default AddParkingScreen;
