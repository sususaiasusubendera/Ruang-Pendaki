import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Navigasi = () => {
  const [navigasiData, setNavigasiData] = useState(null);

  useEffect(() => {
    const fetchNavigasiData = async () => {
      try {
        const db = getFirestore();
        const navigasiRef = doc(db, 'jalur', 'Jalur Garung');
        const navigasiSnapshot = await getDoc(navigasiRef);

        if (navigasiSnapshot.exists()) {
          setNavigasiData(navigasiSnapshot.data());
        } else {
          console.log('Navigasi data not found');
        }
      } catch (error) {
        console.log('Error fetching navigasi data:', error);
      }
    };

    fetchNavigasiData();
  }, []);

  if (!navigasiData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={{ uri: navigasiData.navigasi.peta }} style={{ width: 500, height: 500 }} />
      <Text>Est. menuju pos berikutnya: {navigasiData.navigasi.pos}</Text>
      <Text>Est. mencapai puncak: {navigasiData.navigasi.puncak}</Text>
    </View>
  );
};

export default Navigasi;
