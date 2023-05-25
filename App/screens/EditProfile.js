import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getFirestore, doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

    const handleUploadCoverPhoto = async (type) => {
        // Upload photo to Firebase Storage
        const storage = getStorage();
        const photoRef = ref(storage, `users/${type === 'coverPhoto' ? 'coverPhotos' : 'profilePhotos'}/${coverPhoto.fileName}`);
        await uploadBytes(photoRef, coverPhoto.data);
      
        // Get the download URL of the uploaded photo
        const photoUrl = await getDownloadURL(photoRef);
      
        // Update the corresponding photo URL in Firestore
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { [type === 'coverPhoto' ? 'coverPhoto' : 'profilePhoto']: photoUrl });
      };
      
      const handleUploadProfilePhoto = async (type) => {
        // Upload photo to Firebase Storage
        const storage = getStorage();
        const photoRef = ref(storage, `users/${type === 'coverPhoto' ? 'coverPhotos' : 'profilePhotos'}/${profilePhoto.fileName}`);
        await uploadBytes(photoRef, profilePhoto.data);
      
        // Get the download URL of the uploaded photo
        const photoUrl = await getDownloadURL(photoRef);
      
        // Update the corresponding photo URL in Firestore
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { [type === 'coverPhoto' ? 'coverPhoto' : 'profilePhoto']: photoUrl });
      };
      

const handleSaveProfile = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userData.uid);

      // Update the user data in Firestore
      await updateDoc(userRef, {
        fullName,
        description,
        gender,
        birthDate,
        address,
        // coverPhoto,
        // profilePhoto,
      });

      // Update the user data in the parent component
      route.params.onProfileUpdate({
        ...userData,
        fullName,
        description,
        gender,
        birthDate,
        address,
        // coverPhoto,
        // profilePhoto,
      });

      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  const handleLanjutProfil = () => {
    navigation.navigate('LoginScreen');
  }

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
        style={styles.uploadCoverPhotoButton}
        onPress={() => handleUploadCoverPhoto('coverPhoto')}
        >
        <Text style={styles.buttonText}>Upload Foto Sampul</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadProfilePhotoButton}
        onPress={() => handleUploadProfilePhoto('profilePhoto')}
        >
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
  );
};

const styles = StyleSheet.create({
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
    color: '#bcbcbe',
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
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    height : 100,
    alignItems: 'center'
  },
  uploadProfilePhotoButton: {
    backgroundColor: '#FFFAED',
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
});

export default EditProfile;