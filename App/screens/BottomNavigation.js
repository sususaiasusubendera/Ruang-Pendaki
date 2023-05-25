import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const activeScreen = useRoute().name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeScreen === 'Profil' && styles.tabSelected]}
        onPress={() => {
          navigation.navigate('Profil');  //navigation.navigate('Profil', { userData });
        }}
      >
        <Image source={require('../../assets/user.png')} style={styles.navIcon} />
        <Text style={styles.tabText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeScreen === 'ListGunung' && styles.tabSelected]}
        onPress={() => {
                  navigation.navigate('ListGunung');
                }}
      >
        <Image source={require('../../assets/mountains.png')} style={styles.navIcon} />
        <Text style={styles.tabText}>Gunung</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeScreen === 'ListUsers' && styles.tabSelected]}
        onPress={() => {
          navigation.navigate('ListUsers');
        }}
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
  tabSelected: {
    backgroundColor: '#44663F',
    borderTopWidth: 3,
    borderTopColor: '#44663F',
  },
};

export default BottomNavigation;
