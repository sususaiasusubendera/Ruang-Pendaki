import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterAkun from './App/screens/RegisterAkun';
import RegisterProfil from './App/screens/RegisterProfil';
import LoginScreen from './App/screens/LoginScreen';
import ProfilePage from './App/screens/Profil';
import AddHike from './App/screens/AddHike';
import EditProfile from './App/screens/EditProfile';
import ListGunung from './App/screens/ListGunung';
import ListUsers from './App/screens/ListUsers';
import ProfilGunung from './App/screens/ProfilGunung';
import InfoJalur from './App/screens/InfoJalur';
import GunungCiremai from './App/screens/GunungCiremai';
import GunungPrau from './App/screens/GunungPrau';
import GunungSemeru from './App/screens/GunungSemeru';
import GunungSumbing from './App/screens/GunungSumbing';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="RegisterAkun"
          component={RegisterAkun}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="RegisterProfil"
          component={RegisterProfil}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilePage}
          options={{ title: 'Profil' }}
        />
        <Stack.Screen
          name="AddHike"
          component={AddHike}
          options={{ title: 'Tambah Riwayat Pendakian' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: 'Edit Profil' }}
        />
        <Stack.Screen
          name="ListGunung"
          component={ListGunung}
          options={{ title: 'Daftar Gunung' }}
        />
        <Stack.Screen
          name="ListUsers"
          component={ListUsers}
          options={{ title: 'Tambah Teman' }}
        />
        <Stack.Screen
          name="ProfilGunung"
          component={ProfilGunung}
          options={{ title: 'Profil Gunung' }}
        />
        <Stack.Screen
          name="InfoJalur"
          component={InfoJalur}
          options={{ title: 'Info Jalur' }}
        />
        <Stack.Screen
          name="GunungCiremai"
          component={GunungCiremai}
          options={{ title: 'Gunung Ciremai' }}
        />
        <Stack.Screen
          name="GunungPrau"
          component={GunungPrau}
          options={{ title: 'Gunung Prau' }}
        />
        <Stack.Screen
          name="GunungSemeru"
          component={GunungSemeru}
          options={{ title: 'Gunung Semeru' }}
        />
        <Stack.Screen
          name="GunungSumbing"
          component={GunungSumbing}
          options={{ title: 'Gunung Sumbing' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;