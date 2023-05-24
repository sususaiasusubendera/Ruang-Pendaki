import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import BottomNavigation from './BottomNavigation';

const ListGunung = () => {
  const [gunungList, setGunungList] = useState([]);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchGunungData = async () => {
      try {
        const db = getFirestore();
        const gunungRef = collection(db, 'gunung');
        const snapshot = await getDocs(gunungRef);

        // Create an array to store the retrieved data
        const gunungData = [];

        // Loop through the snapshot and extract the necessary data
        snapshot.forEach((doc) => {
          const { nama, foto, lokasi, ketinggian } = doc.data();

          // Push the extracted data to the array
          gunungData.push({ nama, foto, lokasi, ketinggian });
        });

        // Set the gunungList state with the retrieved data
        setGunungList(gunungData);
      } catch (error) {
        console.log('Error fetching gunung data:', error);
      }
    };

    // Call the fetchGunungData function
    fetchGunungData();
  }, []);

  // Render item component for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.gunungItem}>
      <View style={styles.gunungInfo}>
        <Image source={{ uri: item.foto }} style={styles.gunungFoto} />
        <View style={styles.gunungText}>
          <Text style={styles.gunungNama}>{item.nama}</Text>
          <Text>Lokasi: {item.lokasi}</Text>
          <Text>Ketinggian: {item.ketinggian}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.lihatButton}>
        <Text style={styles.lihatButtonText}>Lihat Gunung</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Gunung</Text>
      <FlatList
        data={gunungList}
        renderItem={renderItem}
        keyExtractor={(item) => item.nama}
      />
      <BottomNavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gunungItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gunungInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gunungFoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  gunungText: {
    flex: 1,
  },
  gunungNama: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lihatButton: {
    backgroundColor: 'blue',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  lihatButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListGunung;

