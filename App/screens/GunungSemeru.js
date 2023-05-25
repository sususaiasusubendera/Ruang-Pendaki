import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const GunungSemeru = () => {
  const [gunungData, setGunungData] = useState(null);

  useEffect(() => {
    const fetchGunungData = async () => {
      try {
        const db = getFirestore();
        const gunungRef = doc(db, 'gunung', 'Gunung Semeru');
        const gunungSnapshot = await getDoc(gunungRef);

        if (gunungSnapshot.exists()) {
          setGunungData(gunungSnapshot.data());
        }
      } catch (error) {
        console.log('Error fetching gunung data:', error);
      }
    };

    fetchGunungData();
  }, []);

  if (!gunungData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: gunungData.sampul }} style={styles.sampulGunung} />
      <Image source={{ uri: gunungData.foto }} style={styles.fotoGunung} />
      <Text style={styles.namaGunung}>{gunungData.nama}</Text>
      <Text style={styles.ketinggian}>{gunungData.ketinggian} mdpl</Text>
      <Text style={styles.lokasi}>{gunungData.lokasi}</Text>
      <Text style={styles.pengikut}>{gunungData.pengikut} Pengikut</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Ikuti button pressed')}>
        <Text style={styles.buttonText}>Ikuti</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Registrasi User Porter button pressed')}>
        <Text style={styles.buttonText}>Registrasi User Porter</Text>
      </TouchableOpacity>
      <View style={styles.jalurContainer}>
        <Text style={styles.jalurTitle}>Jalur Pendakian</Text>
        {/* {gunungData.jalur_pendakian.map((jalur, index) => (
          <View key={index} style={styles.jalurItem}>
            <Text style={styles.jalurNama}>{jalur.nama}</Text>
            <Text style={styles.jalurDurasi}>Durasi: {jalur.durasi}</Text>
            <Text style={styles.jalurLokasi}>Lokasi: {jalur.lokasi}</Text>
            <Text style={styles.jalurRating}>Rating: {'⭐'.repeat(jalur.rating)}</Text>
          </View>
        ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  sampulGunung: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  fotoGunung: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  namaGunung: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ketinggian: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  lokasi: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  pengikut: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  jalurContainer: {
    width: '100%',
    marginTop: 16,
  },
  jalurTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  jalurItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  jalurNama: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jalurDurasi: {
    marginBottom: 4,
  },
  jalurLokasi: {
    marginBottom: 4,
  },
  jalurRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GunungSemeru;