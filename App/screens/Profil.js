import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ProfilePage = ({navigataion , route}) => {
    

    const { userData } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Page</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{userData.fullName}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{userData.phone}</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{userData.address}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  text: {
    flex: 1,
  },
});

export default ProfilePage;
