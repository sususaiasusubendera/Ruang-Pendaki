import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const AddHike = ({ navigation }) => {
  const [namaGunung, setNamaGunung] = useState('');
  const [tanggalPendakian, setTanggalPendakian] = useState('');

  const handleTambahkan = async () => {
    try {
      // Mengecek apakah nama gunung ada di Firestore
      const db = getFirestore();
      const gunungDocRef = doc(db, 'gunung', 'V0Wz5cKT8T8ERtEFmcii');
      const gunungDocSnapshot = await gunungDocRef.get();

      if (!gunungDocSnapshot.exists()) {
        // Jika nama gunung tidak ditemukan, keluarkan pesan dan tetap berada di halaman AddHike
        Alert.alert('Gunung tidak terdaftar');
      } else {
        // Jika nama gunung ditemukan, tambahkan riwayat pendakian dan kembali ke halaman profil
        const riwayatPendakian = {
          namaGunung: namaGunung,
          tanggalPendakian: tanggalPendakian,
        };

        // Add the hiking history to the user's data in Firestore
        const userDataRef = doc(db, 'users', user.uid);
        await setDoc(
          userDataRef,
          {
            pendakian: {
              [Object.keys(riwayatPendakian).length + 1]: riwayatPendakian,
            },
          },
          { merge: true }
        );

        navigation.goBack();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambahkan Riwayat Pendakian</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama Gunung"
          value={namaGunung}
          onChangeText={setNamaGunung}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tanggal Pendakian"
          value={tanggalPendakian}
          onChangeText={setTanggalPendakian}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleTambahkan}>
        <Text style={styles.addButtonText}>Tambahkan</Text>
      </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddHike;