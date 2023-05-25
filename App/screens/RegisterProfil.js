import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
  authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
  projectId: "ruang-pendaki-84fdc",
  storageBucket: "ruang-pendaki-84fdc.appspot.com",
  messagingSenderId: "877240749467",
  appId: "1:877240749467:web:40fa5d4d574930f80b653e"
};

const RegisterProfil = ({ navigation, route }) => {
  const [fullName, setFullName] = useState('');
  const [gender, setSelectedGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false); // State untuk mengontrol visibilitas pop-up
  const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);
  const [error, setError] = useState('');
  const [errmsg, setErrmsg] = useState('');

  const handleRegister = async () => {
    const {
      email,
      phone,
      password
    } = route.params;

    try {
      // Inisialisasi Firebase
      const app = initializeApp(firebaseConfig);

      // Mendaftarkan pengguna dengan email dan password ke Firebase
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Menyimpan data pengguna ke Firestore
      const db = getFirestore(app);
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email,
        phone,
        fullName,
        gender,
        birthDate,
        address,
        uid: user.uid,
      });

      // Menampilkan pop-up "Register Berhasil"
      setIsRegisterSuccess(true);
      setIsRegisterPopupVisible(true);

      // Mengarahkan pengguna ke halaman lain setelah pendaftaran berhasil
    } catch (error) {
      console.log('Pendaftaran gagal', error.message);
      if (error.message == 'Firebase: Error (auth/email-already-in-use).'){
        setErrmsg('Email telah digunakan');
      }
      else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        setErrmsg('Panjang password minimal 6 karakter');
      }
      else{
        setErrmsg(error.message);
      }
      setError(error.message);
    }
  };

  const handleRegisterPopupOK = () => {
    setIsRegisterPopupVisible(false);
    navigation.navigate('LoginScreen');
  };

  const handleRegisterPopupError = () => {
    setError('');
    setErrmsg('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'Pria' && styles.selectedOption]}
          onPress={() => setSelectedGender('Pria')}
        >
          <Text style={styles.optionText}>Pria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderOption, gender === 'Wanita' && styles.selectedOption]}
          onPress={() => setSelectedGender('Wanita')}
        >
          <Text style={styles.optionText}>Wanita</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        value={birthDate}
        onChangeText={text => setBirthDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <Button
        title="Register"
        onPress={handleRegister}
        color="#295531"
      />

      {/* Pop-up "Register Berhasil" */}
      <Modal visible={isRegisterPopupVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Register Berhasil</Text>
            <Button
              title="OK"
              onPress={handleRegisterPopupOK}
              color="#295531"
            />
          </View>
        </View>
      </Modal>

      {/* Pop-up error */}
      <Modal visible={errmsg !== ''} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorText}>Pendaftaran gagal {"\n"}{errmsg}</Text>
            <Button
              title="OK"
              onPress={handleRegisterPopupError}
              color="#295531"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D9B6',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#295531',
  },
  optionText: {
    color: '#bdb39b',
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
  errorText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'red',
    textAlign: 'center',
  },
});

export default RegisterProfil;
