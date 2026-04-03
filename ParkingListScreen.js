// screens/ParkingListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { colors } from "../theme";

const ParkingListScreen = ({ navigation }) => {
  const [parkings, setParkings] = useState([]);

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "parkings"));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setParkings(list);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Parkings</Text>

      {parkings.length === 0 ? (
        <Text style={styles.noData}>No parking records found</Text>
      ) : (
        <FlatList
          data={parkings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("ParkingDetail", { parking: item })
              }
            >
              <Text style={styles.itemText}>
                {new Date(item.createdAt.seconds * 1000).toDateString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddParking")}
      >
        <Text style={styles.buttonText}>Add Parking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: colors.gold, marginBottom: 20 },
  noData: { color: colors.gray, fontSize: 18, textAlign: "center", marginVertical: 20 },
  item: {
    backgroundColor: colors.gray,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8
  },
  itemText: { color: colors.white, fontSize: 18 },
  button: {
    backgroundColor: colors.gold,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: { color: colors.black, fontSize: 18, fontWeight: "bold" }
});

export default ParkingListScreen;
