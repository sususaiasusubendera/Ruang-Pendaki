import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const RegisterProfil = ({ navigation, route }) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    const {
      email,
      phone,
      password
    } = route.params;

    try {
      // Mendaftarkan pengguna dengan email dan password ke Firebase
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Menyimpan data pengguna ke Firestore
      await firebase.firestore().collection('users').doc(user.uid).set({
        email,
        phone,
        fullName,
        gender,
        birthDate,
        address,
      });

      // Mengarahkan pengguna ke halaman lain setelah pendaftaran berhasil
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Pendaftaran gagal', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={text => setGender(text)}
      />
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default RegisterProfil;
