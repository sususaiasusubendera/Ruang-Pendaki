import React from 'react';
import { View } from 'react-native';
import ProfilGunung from './ProfilGunung';

const GunungSumbing = () => {
  const gunungId = 'V0Wz5cKT8T8ERtEFmcii'; // Gantikan dengan ID dokumen gunung yang ingin ditampilkan

  return (
    <View>
      <ProfilGunung gunungId={gunungId} />
    </View>
  );
};

export default GunungSumbing;
