import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, MyBtn } from 'react-native';
import { initializeApp } from 'firebase/app';
import { auth, db } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where } from '@firebase/firestore';
import EditProfile from './EditProfile';
import BottomNavigation from './BottomNavigation';

const firebaseConfig = {
  apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
  authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
  projectId: "ruang-pendaki-84fdc",
  storageBucket: "ruang-pendaki-84fdc.appspot.com",
  messagingSenderId: "877240749467",
  appId: "1:877240749467:web:40fa5d4d574930f80b653e"
};

const ProfilePage = ({ navigation, route}) => {

  // const signOut = async () => {
  //   auth.signOut();
  //   navigation.reset({ index: 0, routes : [{ name: "Signup"}]})
  // }
  const { userData } = route.params;
  const database = getFirestore(); // Remove the argument from getFirestore()
  const { userGunung } = collection(database, 'gunung');
  const [riwayatPendakian, setRiwayatPendakian] = useState([]);
  // const [gunungList, setGunungList] = useState([]);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchGunungData = async () => {
      try {
        const db = getFirestore(); // Remove the argument from getFirestore()
        const gunungRef = doc(db, 'gunung', userData.uidRiwayatGunung);
        const gunungSnapshot = await getDoc(gunungRef);

        if (!gunungSnapshot.empty) {
          // const gunungData = gunungSnapshot.docs.map((doc) => doc.data());
          // setGunungList(gunungData);
          const gunungData = gunungSnapshot.data();

          // Mengisi riwayatPendakian dengan data gunung
          const updatedRiwayatPendakian = [
            {
              fotoGunung: gunungData.foto,
              namaGunung: gunungData.nama,
              tinggiGunung: gunungData.ketinggian,
              lokasiGunung: gunungData.lokasi,
              tanggalPendakian: userData.tanggalPendakian,
            },
          ];

          setRiwayatPendakian(updatedRiwayatPendakian);
        }
      } catch (error) {
        console.log('Error fetching gunung data:', error);
      }
    };

    fetchGunungData();
  }, []);

  const handleSaveProfile = async (updatedUserData) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userData.uid);
      await updateDoc(userRef, updatedUserData);
      console.log('Profile saved successfully!');
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  // const handleTambahkan = (riwayatPendakian) => {
  //   // Lakukan operasi tambahkan riwayat pendakian ke profil
  //   const updatedRiwayatPendakian = [...riwayatPendakian, riwayatPendakian];
  //   setRiwayatPendakian(updatedRiwayatPendakian);
  // };
  
  return (
    <View style={styles.container2}>
      <ScrollView>
      <View style={styles.coverPhotoContainer}>
        {userData.coverPhoto ? (
          <Image source={{ uri: userData.coverPhoto }} style={styles.coverPhoto} />
        ) : (
          <TouchableOpacity
            style={styles.emptyImageContainer}
            onPress={() => navigation.navigate('EditProfile', { userData: userData })}
          >
            <Text style={styles.emptyText}>Upload gambar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profilePhotoContainer}>
        {userData.profilePhoto ? (
          <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <TouchableOpacity
            style={styles.emptyImageContainer}
            onPress={() => navigation.navigate('EditProfile', { userData: userData })}
          >
            <Text style={styles.emptyText}>Upload gambar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.name}>{userData.fullName}</Text>

        <Text style={styles.description}>
          {userData.description ? userData.description : '(Deskripsi kosong)'}
        </Text>

        <Text style={styles.address}>{userData.address}</Text>

        <Text style={styles.friendsCount}>{userData.friendsCount || '0'} Friends</Text>
        {!editMode ? ( // Conditionally render EditProfile component
          <>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('EditProfile', { userData: userData })}
        >
          <Text style={styles.editProfileText}>Edit Profil</Text>
        </TouchableOpacity>

          </>
        ) : (
          <EditProfile
            userData={userData}
            setUserData={setUserData} // Pass necessary props to EditProfile
            setEditMode={setEditMode} // Pass function to toggle edit mode
          />
        )}

        <View style={styles.container3}>
          <Text style={styles.sectionTitle}>Riwayat Pendakian</Text>
          {riwayatPendakian.length > 0 ? (
            riwayatPendakian.map((riwayat, index) => (
              <View style={styles.pendakianContainer} key={index}>
                <Image source={{ uri: riwayat.fotoGunung }} style={styles.gunungPhoto} />
                <View style={styles.gunungInfo}>
                  <Text style={styles.gunungName}>{riwayat.namaGunung}</Text>
                  <Text style={styles.gunungDetail}>Tinggi: {riwayat.tinggiGunung} mdpl</Text>
                  <Text style={styles.gunungDetail}>Lokasi: {riwayat.lokasiGunung}</Text>
                  <Text style={styles.tanggalPendakian}>Tanggal Pendakian: {riwayat.tanggalPendakian}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>(Masih kosong, tambahkan riwayat pendakianmu!)</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addHikeButton}
          onPress={() => navigation.navigate('AddHike', { userData: userData })}
        >
          <Text style={styles.addHikeText}>Tambah Riwayat Pendakian</Text>
        </TouchableOpacity>

        {/* <MyBtn
          text = {"Log out"}
          onPress = {() => {
            signOut();
          }}
        /> */}

      </View>
    </ScrollView>
    <BottomNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container2: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FFFAED",
  },
  container3: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFAED",
  },
  emptyTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  coverPhotoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    height : 100,
    alignItems: 'center'
  },
  coverPhoto: {
    width: '100%',
    top: "-20%",
    height: 200
  },
  profilePhotoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    width: 100,
    height: 100,
    position: "absolute",
    top: "10%",
    left: "4%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePhoto: {
    width: 100,
    height: 100,
  },
  emptyImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'left',
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    color: "#868686",
  },
  friendsCount: {
    fontSize: 16,
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#295531',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  editProfileText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  containerPendakian: {
    marginBottom: 16,
  },
  pendakianContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gunungPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  gunungInfo: {
    flex: 1,
  },
  gunungName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  gunungDetail: {
    marginBottom: 2,
  },
  tanggalPendakian: {
    fontStyle: 'italic',
  },
  addHikeButton: {
    backgroundColor: '#295531',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  addHikeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default ProfilePage;