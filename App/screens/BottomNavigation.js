import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Profil')} //        navigation.navigate('Profil', { userData });

      >
        <Text style={styles.tabText}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('ListGunung')}
      >
        <Text style={styles.tabText}>Gunung</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('ListUsers')}
      >
        <Text style={styles.tabText}>Teman</Text>
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
    paddingVertical: 10,
  },
  tabSelected: {
    backgroundColor: '#44663F',
  },
  tabText: {
    color: 'white',
  },
};

export default BottomNavigation;
