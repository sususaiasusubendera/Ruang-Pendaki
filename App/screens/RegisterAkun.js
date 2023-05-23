import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ProgressBarAndroid } from 'react-native';
import { getAuth } from 'firebase/auth';

const RegisterAkun = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleNext = () => {
    navigation.navigate('RegisterProfil', {
      email,
      phone,
      password,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Next"
        onPress={handleNext}
        color="#295531" // Warna tombol Next
      />
      <View style={styles.progressBarContainer}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5} // Progress 1 dari 2 langkah (0.5)
          color="#295531" // Warna bola progress
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D9B6', // Latar belakang halaman
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
  progressBarContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
});

export default RegisterAkun;
