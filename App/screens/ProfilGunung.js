import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
  authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
  projectId: "ruang-pendaki-84fdc",
  storageBucket: "ruang-pendaki-84fdc.appspot.com",
  messagingSenderId: "877240749467",
  appId: "1:877240749467:web:40fa5d4d574930f80b653e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ProfilGunung = () => {
  const [profilGunung, setProfilGunung] = useState(null);

  useEffect(() => {
    const fetchProfilGunung = async () => {
      const gunungRef = doc(db, 'gunung', 'V0Wz5cKT8T8ERtEFmcii');

      onSnapshot(gunungRef, (snapshot) => {
        if (snapshot.exists()) {
          setProfilGunung(snapshot.data());
        }
      });
    };

    fetchProfilGunung();
  }, []);

  if (!profilGunung) {
    return null; // Tampilkan tampilan kosong atau indikator loading jika profilGunung belum tersedia
  }

  const handleIkuti = () => {
    // Logika ketika tombol "Ikuti" ditekan
  };

  const handleRegistrasiPorter = () => {
    // Logika ketika tombol "Registrasi User Porter" ditekan
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profilGunung.sampul }} style={styles.sampul} />
      <Image source={{ uri: profilGunung.foto }} style={styles.fotoProfil} />
      <Text style={styles.namaGunung}>{profilGunung.nama}</Text>
      <Text style={styles.ketinggian}>{profilGunung.ketinggian} mdpl</Text>
      <Text style={styles.lokasi}>{profilGunung.lokasi}</Text>
      <Text style={styles.pengikut}>Jumlah Pengikut: {profilGunung.pengikut}</Text>
      <Button title="Ikuti" onPress={handleIkuti} color="#295531" />
      <Button
        title="Registrasi User Porter"
        onPress={handleRegistrasiPorter}
        color="#295531"
      />
      <Text style={styles.judulJalurPendakian}>Jalur Pendakian</Text>
      {profilGunung.jalur_pendakian.map((jalur, index) => (
        <View key={index} style={styles.jalurContainer}>
          <Text style={styles.namaJalur}>{jalur.nama}</Text>
          <Text style={styles.durasiPendakian}>{jalur.durasi}</Text>
          <Text style={styles.lokasiJalur}>{jalur.lokasi}</Text>
          <Text style={styles.ratingJalur}>{'⭐'.repeat(jalur.rating)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  sampul: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  fotoProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  namaGunung: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ketinggian: {
    fontSize: 16,
    marginBottom: 8,
  },
  lokasi: {
    marginBottom: 8,
  },
  pengikut: {
    marginBottom: 16,
  },
  judulJalurPendakian: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jalurContainer: {
    marginBottom: 8,
  },
  namaJalur: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  durasiPendakian: {
    marginBottom: 4,
  },
  lokasiJalur: {
    marginBottom: 4,
  },
  ratingJalur: {
    fontSize: 20,
    marginBottom: 4,
  },
});

export default ProfilGunung;