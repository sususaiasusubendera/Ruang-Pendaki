import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc} from 'firebase/firestore';

const InfoJalur = () => {
  const [jalurData, setJalurData] = useState(null);
  const [porterData, setPorterData] = useState([]);

  useEffect(() => {
    const fetchJalurData = async () => {
      try {
        const db = getFirestore();
        const jalurRef = doc(db, 'jalur', "Jalur Garung");
        const jalurSnapshot = await getDoc(jalurRef);
        if (jalurSnapshot.exists) {
          setJalurData(jalurSnapshot.data());
          fetchPorterData(jalurSnapshot.data().porter);
        } else {
          console.log('Jalur not found');
        }
      } catch (error) {
        console.log('Error fetching jalur data:', error);
      }
    };

    const fetchPorterData = async (porterUIDs) => {
      try {
        const porterRefs = porterUIDs.map((uid) => doc(db, 'users', uid));
        const porterSnapshots = await Promise.all(porterRefs.map((ref) => ref.get()));
        const porters = porterSnapshots.map((snapshot) => snapshot.data());
        setPorterData(porters);
      } catch (error) {
        console.log('Error fetching porter data:', error);
      }
    };

    fetchJalurData();
  }, []);

//   const renderKesulitan = (level) => {
//     const stars = [];
//     for (let i = 0; i < level; i++) {
//       stars.push(<StarOutlined key={i} />);
//     }

//     return stars;
//   };

  const navigateToPetaNavigasi = () => {
    // Navigasi ke halaman Navigasi.js
    // Implementasikan sesuai dengan framework / library yang Anda gunakan
  };

  if (!jalurData || !porterData.length) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Nama Jalur: {jalurData.nama}</Text>
      <Text>Durasi Pendakian: {jalurData.durasi}</Text>
      <Text>
        Kesulitan: 
        <Text style={styles.ratingJalur}>{'⭐'.repeat(jalurData.kesulitan)}</Text>
      </Text>
      <TouchableOpacity onPress={navigateToPetaNavigasi}>
        <Text>Tombol Peta dan Navigasi</Text>
      </TouchableOpacity>
      <Text>Daftar Porter:</Text>
      {porterData.map((porter) => (
        <View key={porter.uid}>
          <Image source={{ uri: porter.profilePhoto }} style={{ width: 50, height: 50 }} />
          <Text>{porter.fullName} - Tersedia</Text>
        </View>
      ))}
    </View>
  );
};

export default InfoJalur;
