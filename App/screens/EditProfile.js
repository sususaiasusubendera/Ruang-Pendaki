import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Button, Image } from 'react-native';
import { getFirestore, doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';


const firebaseConfig = {
    apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
    authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
    projectId: "ruang-pendaki-84fdc",
    storageBucket: "ruang-pendaki-84fdc.appspot.com",
    messagingSenderId: "877240749467",
    appId: "1:877240749467:web:40fa5d4d574930f80b653e"
  };

const EditProfile = ({ navigation, route }) => {
    const { userData } = route.params
    const [fullName, setFullName] = useState(userData?.fullName);
    const [description, setDescription] = useState(userData?.description);
    const [gender, setGender] = useState(userData?.gender);
    const [birthDate, setBirthDate] = useState(userData?.birthDate);
    const [address, setAddress] = useState(userData?.address);
    const [coverPhoto, setCoverPhoto] = useState(userData?.foto);
    const [profilePhoto, setProfilePhoto] = useState(userData?.sampul);
    const storage = getStorage();
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [errmsg, setErrmsg] = useState('');


    const handleUploadCoverPhoto = async (type) => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Izin akses perpustakaan media diperlukan');
        return;
      }
    
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        try {
          const storageRef = ref(storage, `users/coverPhotos/${userData.uid}_cover.jpg`);
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
          setCoverPhoto(downloadURL);
        } catch (error) {
          console.log('Error uploading cover photo:', error);
        }
      }
    };
    
      

    const handleUploadProfilePhoto = async (type) => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Izin akses perpustakaan media diperlukan');
        return;
      }
    
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        try {
          const storageRef = ref(storage, `users/profilePhotos/${userData.uid}_profile.jpg`); 
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
          setProfilePhoto(downloadURL);
        } catch (error) {
          console.log('Error uploading profile photo:', error);
        }
      }
    };
    
      

    const handleSaveProfile = async () => {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'users', userData.uid);
        const userUpdateData = {
          fullName,
        };
        if (!fullName) {
          
          throw new Error('Field Nama harus diisi');
        }
        if (description || description === '') userUpdateData.description = description || '';
        if (gender || gender === '') userUpdateData.gender = gender || '';
        if (birthDate || birthDate === '') userUpdateData.birthDate = birthDate || '';
        if (address || address === '') userUpdateData.address = address || '';
        if (coverPhoto || coverPhoto === '') userUpdateData.coverPhoto = coverPhoto || '';
        if (profilePhoto || profilePhoto === '') userUpdateData.profilePhoto = profilePhoto || '';
        await updateDoc(userRef, userUpdateData);
        setIsEditSuccess(true);
        setIsEditPopupVisible(true);
        route.params.onProfileUpdate({
          ...userData,
          ...userUpdateData,
        });
      } catch (error) {
        if (error.message == "Field Nama harus diisi"){
          console.log('Error mengedit profil:', error.message);
          setErrmsg(error.message);
        }
      }
    };


  const handleLanjutProfil = () => {
    navigation.navigate('LoginScreen');
  }

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleEditPopupOK = () => {
    setIsEditPopupVisible(false);
  };

  const handleEditPopupError = () => {
    setErrmsg('');
  };

  return (
    <View style={styles.containerBG}>
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={styles.uploadCoverPhotoButton}
          onPress={() => handleUploadCoverPhoto('coverPhoto')}
          >
          <Image source={{ uri: userData.coverPhoto }} style={styles.coverPhoto} />
          <View style={styles.coverPhotoDarken} />
          <View style={styles.uploadCoverPhotoTextContainer}>
            <Text style={styles.buttonText}>Upload Foto Sampul</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadProfilePhotoButton}
          onPress={() => handleUploadProfilePhoto('profilePhoto')}
          >
          <Image source={{ uri: userData.profilePhoto }} style={styles.profilePhoto} />
          <View style={styles.profilePhotoDarken} />
          <Text style={styles.buttonText}>Upload{"\n"}Foto Profil</Text>
        </TouchableOpacity>

        <View style={styles.container16}>
          <View style={styles.inputContainer1}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Birth Date"
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleSaveProfile}>
            <Text style={styles.buttonText1}>Simpan Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profilButton} onPress={handleLanjutProfil}>
            <Text style={styles.buttonText3}>Lihat Profil barumu!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText2}>Batalkan</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal visible={isEditPopupVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Edit Profil Berhasil{"\n"}Lihat Profil Barumu untuk Update</Text>
              <Button
                title="OK"
                onPress={handleEditPopupOK}
                color="#295531"
              />
            </View>
          </View>
        </Modal>

        <Modal visible={errmsg !== ''} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Edit Profil gagal {"\n"}{errmsg}</Text>
              <Button
                title="OK"
                onPress={handleEditPopupError}
                color="#295531"
              />
            </View>
          </View>
        </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  containerBG:{
    flex: 1,
    padding: 0,
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FFFAED",
  },
  container16: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputContainer1: {
    marginBottom: 16,
    paddingTop: 60,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  uploadButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  profilButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  buttonText1: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonText2: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center'
  },
  buttonText3: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  uploadCoverPhotoButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    height : 100,
  },
  uploadCoverPhotoTextContainer: {
    position: 'absolute',
    top: "40%",
    right: "5%",
  },
  uploadProfilePhotoButton: {
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
  profilePhoto: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
  profilePhotoDarken: {
    width: 100,
    height: 100,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  coverPhoto: {
    width: '100%',
    top: "-20%",
    height: 200,
    position: 'absolute',
  },
  coverPhotoDarken: {
    width: '100%',
    top: "-20%",
    height: 200,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.4,
  },
});

export default EditProfile;