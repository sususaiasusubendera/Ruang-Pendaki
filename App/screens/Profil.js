import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
  authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
  projectId: "ruang-pendaki-84fdc",
  storageBucket: "ruang-pendaki-84fdc.appspot.com",
  messagingSenderId: "877240749467",
  appId: "1:877240749467:web:40fa5d4d574930f80b653e"
};

const ProfilePage = ({ navigation, route }) => {
  const { userData } = route.params;
  const [riwayatPendakian, setRiwayatPendakian] = useState([]);

  useEffect(() => {
    const fetchGunungData = async () => {
      try {
        const db = firebase.firestore();
        const gunungRef = db.collection('gunung').doc('V0Wz5cKT8T8ERtEFmcii');
        const gunungSnapshot = await gunungRef.get();

        if (gunungSnapshot.exists()) {
          const gunungData = gunungSnapshot.data();

          // Mengisi riwayatPendakian dengan data gunung
          const updatedRiwayatPendakian = [
            {
              fotoGunung: gunungData.foto,
              namaGunung: gunungData.nama,
              tinggiGunung: gunungData.tinggi,
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

  return (
    <View style={styles.container}>
      <View style={styles.coverPhotoContainer}>
        {userData.coverPhoto ? (
          <Image source={{ uri: userData.coverPhoto }} style={styles.coverPhoto} />
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>Upload gambar</Text>
          </View>
        )}
      </View>

      <View style={styles.profilePhotoContainer}>
        {userData.profilePhoto ? (
          <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>Upload gambar</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{userData.fullName}</Text>

      <Text style={styles.description}>
        {userData.description ? userData.description : '(Deskripsi kosong)'}
      </Text>

      <Text style={styles.address}>{userData.address}</Text>

      <Text style={styles.friendsCount}>{userData.friendsCount || '0'} Friends</Text>

      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editProfileText}>Edit Profile & Account</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Riwayat Pendakian</Text>
        {riwayatPendakian.length > 0 ? (
          riwayatPendakian.map((riwayat, index) => (
            <View style={styles.pendakianContainer} key={index}>
              <Image source={{ uri: riwayat.fotoGunung }} style={styles.gunungPhoto} />
              <View style={styles.gunungInfo}>
                <Text style={styles.gunungName}>{riwayat.namaGunung}</Text>
                <Text style={styles.gunungDetail}>Tinggi: {riwayat.tinggiGunung}</Text>
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
        onPress={() => navigation.navigate('AddHike')}
      >
        <Text style={styles.addHikeText}>Tambah Riwayat Pendakian</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
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
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    height : 200,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profilePhotoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    height : 100,
  },
  profilePhoto: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
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
  },
});

export default ProfilePage;