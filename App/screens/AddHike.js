import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

const AddHike = ({ navigation, route }) => {
  const { userData } = route.params;
  const [namaGunung, setNamaGunung] = useState('');
  const [tanggalPendakian, setTanggalPendakian] = useState('');
  const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);

  const handleTambahkan = async () => {
    try {
      const db = getFirestore();

      // Update userData in Firestore
      const userDataRef = doc(db, 'users', userData.uid);
      await setDoc(
        userDataRef,
        {
          uidRiwayatGunung: namaGunung, // Save setNamaGunung in userData.uidRiwayatGunung
          tanggalPendakian: tanggalPendakian, // Save setTanggalPendakian in userData.tanggalPendakian
        },
        { merge: true }
      );

      setIsRegisterPopupVisible(true);

    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleRegisterPopupOK = () => {
    setIsRegisterPopupVisible(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambahkan Pengalamanmu!</Text>

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

      {/* Pop-up "Register Berhasil" */}
      <Modal visible={isRegisterPopupVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Riwayat Pendakian Berhasil ditambahkan</Text>
            <Button
              title="OK"
              onPress={handleRegisterPopupOK}
              color="#295531"
            />
          </View>
        </View>
      </Modal>

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
    padding: 16,
    backgroundColor: "#FFFAED",
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
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
    backgroundColor: 'green',
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
  profilButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default AddHike;