import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Profil')} //        navigation.navigate('Profil', { userData });

      >
        <Image source={require('../../assets/user.png')} style={styles.navIcon} />
        <Text style={styles.tabText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('ListGunung')}
      >
        <Image source={require('../../assets/mountains.png')} style={styles.navIcon} />
        <Text style={styles.tabText}>Gunung</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('ListUsers')}
      >
        <Image source={require('../../assets/users.png')} style={styles.navIcon} />
        <Text style={styles.tabText}>Cari Teman</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#608D4F',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabSelected: {
    backgroundColor: '#44663F',
  },
  tabText: {
    color: 'white',
  },
  navIcon: {
    width: 35,
    height: 35,
  },
};

export default BottomNavigation;
