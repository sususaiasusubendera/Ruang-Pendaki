import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterAkun from './App/screens/RegisterAkun';
import RegisterProfil from './App/screens/RegisterProfil';
import LoginScreen from './App/screens/LoginScreen';
import ProfilePage from './App/screens/Profil';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

