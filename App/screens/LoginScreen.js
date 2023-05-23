import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
  authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
  projectId: "ruang-pendaki-84fdc",
  storageBucket: "ruang-pendaki-84fdc.appspot.com",
  messagingSenderId: "877240749467",
  appId: "1:877240749467:web:40fa5d4d574930f80b653e"
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      
      const db = getFirestore(app);
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('Data Pengguna:', userData);
        navigation.navigate('Profil', { userData });
      } else {
        console.log('Data pengguna tidak ditemukan');
      }
    } catch (error) {
      console.log('Login gagal', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/mini_icon.png')} style={styles.logo} />
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          color="#295531" // Tulisan berwarna putih (#FFFFFF)
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterAkun')}>
        <Text style={styles.registerText}>Belum punya akun? Daftar sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D9B6',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  registerText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
