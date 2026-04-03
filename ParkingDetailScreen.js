// screens/ParkingDetailScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { colors } from "../theme";

const ParkingDetailScreen = ({ route, navigation }) => {
  const { parking } = route.params;

  const [buildingCode, setBuildingCode] = useState(parking.buildingCode);
  const [hours, setHours] = useState(parking.hours);
  const [plate, setPlate] = useState(parking.plate);

  const validate = () => {
    if (!/^[a-zA-Z0-9]{5}$/.test(buildingCode)) return false;
    if (!/^[a-zA-Z0-9]{2,8}$/.test(plate)) return false;
    if (!["1", "4", "12", "24"].includes(hours)) return false;
    return true;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      Alert.alert("Invalid input");
      return;
    }

    await updateDoc(doc(db, "parkings", parking.id), {
      buildingCode,
      hours,
      plate
    });

    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "parkings", parking.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Details</Text>

      <TextInput style={styles.input} value={buildingCode} onChangeText={setBuildingCode} placeholder="Building Code" placeholderTextColor={colors.gray} />
      <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="Hours" placeholderTextColor={colors.gray} keyboardType="numeric" />
      <TextInput style={styles.input} value={plate} onChangeText={setPlate} placeholder="Car Plate" placeholderTextColor={colors.gray} />

      <TouchableOpacity style={styles.buttonUpdate} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
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
  buttonUpdate: {
    backgroundColor: colors.gold,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonDelete: {
    backgroundColor: "#FF4C4C",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: { color: colors.black, fontSize: 18, fontWeight: "bold" }
});

export default ParkingDetailScreen;
