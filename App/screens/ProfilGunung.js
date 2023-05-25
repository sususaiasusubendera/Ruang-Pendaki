import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProfilGunung = () => {
  const [gunungData, setGunungData] = useState(null);

  useEffect(() => {
    const fetchGunungData = async () => {
      try {
        const db = getFirestore();
        const gunungRef = doc(db, 'gunung', 'Gunung Ciremai');
        const gunungSnapshot = await getDoc(gunungRef);

        if (gunungSnapshot.exists()) {
          setGunungData(gunungSnapshot.data());
        }
      } catch (error) {
        console.log('Error fetching gunung data:', error);
      }
    };

    fetchGunungData();
  }, []);

  if (!gunungData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.namaGunung}>{gunungData.nama}</Text>
      <Text style={styles.lokasi}>{gunungData.lokasi}</Text>
      <Image source={{ uri: gunungData.foto }} style={styles.fotoGunung} />
      <Image source={{ uri: gunungData.sampul }} style={styles.sampulGunung} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namaGunung: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lokasi: {
    fontSize: 16,
    marginBottom: 16,
  },
  fotoGunung: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  sampulGunung: {
    width: '100%',
    height: 200,
  },
});

export default ProfilGunung;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, onSnapshot, getDocs} from 'firebase/firestore';
// import { useRoute } from '@react-navigation/native';

// const firebaseConfig = {
//   apiKey: "AIzaSyCNAAgBJjt25UsWDgHIIisGzuqkiwfDTTE",
//   authDomain: "ruang-pendaki-84fdc.firebaseapp.com",
//   projectId: "ruang-pendaki-84fdc",
//   storageBucket: "ruang-pendaki-84fdc.appspot.com",
//   messagingSenderId: "877240749467",
//   appId: "1:877240749467:web:40fa5d4d574930f80b653e"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const ProfilGunung = ({ navigation, route}) => {
//   const { gunungTerpilih } = route.params;
//   const [gunungData, setGunungData] = useState(null);

//   useEffect(() => {
//     const fetchProfilGunung = async () => {
//       try {
//         const db = getFirestore();
//         const gunungRef = doc(db, 'gunung', "wkBKNg6UZdgBmauTvb4g");
//         const gunungSnapshot = await getDocs(gunungRef);

//         if (gunungSnapshot.exists()) {
//           setGunungData(gunungSnapshot.data());
//         }
//       } catch (error) {
//         console.log('Error fetching gunung data:', error);
//       }
//     };

//     fetchProfilGunung();
//   }, []);

//   // if (!gunungData) {
//   //   return null; // Tampilkan tampilan kosong atau indikator loading jika gunungData belum tersedia
//   // }
//   console.log(gunungData);

//   return (
//     <View style={styles.container}>
//       {gunungData ? (
//         <>
//           <Image source={{ uri: gunungData.sampul }} style={styles.sampul} />
//           <Image source={{ uri: gunungData.foto }} style={styles.fotoProfil} />
//           <Text style={styles.namaGunung}>{gunungData.nama}</Text>
//           <Text style={styles.ketinggian}>{gunungData.ketinggian} mdpl</Text>
//           <Text style={styles.lokasi}>{gunungData.lokasi}</Text>
//           <Text style={styles.pengikut}>Jumlah Pengikut: {gunungData.pengikut}</Text>
//           <Button title="Ikuti" onPress={handleIkuti} color="#295531" />
//           <Button
//             title="Registrasi User Porter"
//             onPress={handleRegistrasiPorter}
//             color="#295531"
//           />
//           <Text style={styles.judulJalurPendakian}>Jalur Pendakian</Text>
//           {gunungData.jalur_pendakian.map((jalur, index) => (
//             <View key={index} style={styles.jalurContainer}>
//               <Text style={styles.namaJalur}>{jalur.nama}</Text>
//               <Text style={styles.durasiPendakian}>{jalur.durasi}</Text>
//               <Text style={styles.lokasiJalur}>{jalur.lokasi}</Text>
//               <Text style={styles.ratingJalur}>{'⭐'.repeat(jalur.rating)}</Text>
//             </View>
//           ))}
//         </>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
//       };  

//   const handleIkuti = () => {
//     console.log("ikuti pressed"); //Sementara untuk testing
//   };

//   const handleRegistrasiPorter = () => {
//     console.log("registrasi porter pressed"); //Sementara untuk testing
//   };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 16,
//   },
//   sampul: {
//     width: '100%',
//     height: 200,
//     marginBottom: 16,
//   },
//   fotoProfil: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   namaGunung: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   ketinggian: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   lokasi: {
//     marginBottom: 8,
//   },
//   pengikut: {
//     marginBottom: 16,
//   },
//   judulJalurPendakian: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   jalurContainer: {
//     marginBottom: 8,
//   },
//   namaJalur: {
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   durasiPendakian: {
//     marginBottom: 4,
//   },
//   lokasiJalur: {
//     marginBottom: 4,
//   },
//   ratingJalur: {
//     fontSize: 20,
//     marginBottom: 4,
//   },
// });

// export default ProfilGunung;