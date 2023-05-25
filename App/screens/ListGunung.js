import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import BottomNavigation from "./BottomNavigation";

const ListGunung = ({ navigation }) => {
  const [gunungList, setGunungList] = useState([]);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchGunungData = async () => {
      try {
        const db = getFirestore();
        const gunungRef = collection(db, "gunung");
        const snapshot = await getDocs(gunungRef);

        // Create an array to store the retrieved data
        const gunungData = [];

        // Loop through the snapshot and extract the necessary data
        snapshot.forEach((doc) => {
          const { nama, foto, lokasi, ketinggian, uid } = doc.data();

          // Push the extracted data to the array
          gunungData.push({ nama, foto, lokasi, ketinggian, uid });
        });

        // Set the gunungList state with the retrieved data
        setGunungList(gunungData);
      } catch (error) {
        console.log("Error fetching gunung data:", error);
      }
    };

    // Call the fetchGunungData function
    fetchGunungData();
  }, []);

  // Render item component for FlatList
  const renderItem = ({ item }) => (
    <Pressable onPress= {lihatGunungHandle}>
      <View style={styles.gunungItem}>
        <View style={styles.gunungInfo}>
          <Image source={{ uri: item.foto }} style={styles.gunungFoto} />
          <View style={styles.gunungText}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.gunungNama}
            >
              {item.nama}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Lokasi: {item.lokasi}
            </Text>
            <Text>Ketinggian: {item.ketinggian} mdpl</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.ikutiButton}
          title="Ikuti"
          onPress={ikutiHandle}>
          <Text style={styles.ikutiButtonText}>Ikuti</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  const lihatGunungHandle = (item) => {
    navigation.navigate('ProfilGunung', { gunungId: item.uid })
    console.log(item);
  };

  const ikutiHandle = () => {
    console.log("ikuti pressed"); //Sementara untuk testing
  };

  return (
    <View style={styles.containerBG}>
      <View style={styles.container}>
        <Text style={styles.title}>Jelajahi Gunung</Text>
        <FlatList
          data={gunungList}
          renderItem={renderItem}
          keyExtractor={(item) => item.nama}
        />
      </View>

      <TouchableOpacity
        style={styles.roundButton1}
        activeOpacity={0.15}
        onPress={() => navigation.navigate('GunungCiremai')}> 
        <Text style={styles.roundText}>Lihat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roundButton2}
        activeOpacity={0.15}
        onPress={() => navigation.navigate('GunungPrau')}>
        <Text style={styles.roundText}>Lihat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roundButton3}
        activeOpacity={0.15}
        onPress={() => navigation.navigate('GunungSemeru')}>
        <Text style={styles.roundText}>Lihat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roundButton4}
        activeOpacity={0.15}
        onPress={() => navigation.navigate('GunungSumbing')}>
        <Text style={styles.roundText}>Lihat</Text>
      </TouchableOpacity>

      <BottomNavigation />
    </View>
  );
};


const styles = StyleSheet.create({
  containerBG: {
    flex: 1,
    padding: 0,
  },
  roundText: {
    color: "white",
    fontWeight: "bold",
  },
  roundButton1: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0,
    position: "absolute",
    top: 60,
    left: 16
  },
  roundButton2: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0,
    position: "absolute",
    top: 153,
    left: 16
  },
  roundButton3: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0,
    position: "absolute",
    top: 249,
    left: 16
  },
  roundButton4: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0,
    position: "absolute",
    top: 345,
    left: 16
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFAED",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  gunungItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  gunungInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    flex: 1,
  },
  gunungFoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  gunungText: {
    flex: 1,
  },
  gunungNama: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ikutiButton: {
    backgroundColor: "green",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    width: "16%",
    justifyContent: "center",
    alignItems: "center",
  },
  ikutiButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListGunung;