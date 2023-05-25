import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
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
    <Pressable onPress= {lihatProfilHandle}>
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <Image source={item.profilePhoto !== '../../assets/mini_icon.png' ? { uri: item.profilePhoto } : require('../../assets/mini_icon.png')} style={styles.userFoto} />
          <View style={styles.userText}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userNama}>{item.fullName}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">Alamat: {item.address}</Text>
            <Text>Jumlah Teman: {item.friends}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.tambahTemanButton}
            title="Tambah Teman"
            onPress={tambahTemanHandle}>
            <Image source={require('../../assets/user-plus.png')} style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  const lihatProfilHandle = () => {
    console.log("lihat profil pressed"); //Sementara untuk testing
  };

  const tambahTemanHandle = () => {
    console.log("tambah teman pressed"); //Sementara untuk testing
  };

  return (
    <View style={styles.containerBG}>
      <View style={styles.container}>
        <Text style={styles.title}>List of Users</Text>
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item) => item.fullName}
        />
      </View>
      <BottomNavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBG: {
    flex: 1,
    padding: 0,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    flex: 1,
  },
  userFoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userText: {
    flex: 1,
    marginBottom: 10
  },
  userNama: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer:{
    width: "15%"
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
    textAlign: 'center'
  },
  tambahTemanButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tambahTemanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default ListUsers;
