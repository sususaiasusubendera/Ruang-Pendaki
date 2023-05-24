import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import BottomNavigation from './BottomNavigation';

const ListUsers = () => {
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        const userRef = collection(db, 'users');
        const snapshot = await getDocs(userRef);

        // Create an array to store the retrieved data
        const userData = [];

        // Loop through the snapshot and extract the necessary data
        snapshot.forEach((doc) => {
          const { fullName, profilePhoto, address, friends } = doc.data();

          // Push the extracted data to the array
          userData.push({ fullName, profilePhoto, address, friends });
        });

        // Set the userList state with the retrieved data
        setUserList(userData);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []);

  // Render item component for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
      <Image source={item.profilePhoto !== '../../assets/mini_icon.png' ? { uri: item.profilePhoto } : require('../../assets/mini_icon.png')} style={styles.userFoto} />
        <View style={styles.userText}>
          <Text style={styles.userNama}>{item.fullName}</Text>
          <Text>Alamat: {item.address}</Text>
          <Text>Jumlah Teman: {item.friends}</Text>
        </View>
      </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.lihatButton}>
        <Text style={styles.lihatButtonText}>Lihat Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tambahTemanButton}>
        <Text style={styles.tambahTemanButtonText}>Tambahkan Teman</Text>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Users</Text>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.fullName}
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
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userFoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  userText: {
    flex: 1,
  },
  userNama: {
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
  tambahTemanButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  tambahTemanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
});

export default ListUsers;
