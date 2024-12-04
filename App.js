import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation'; // Importa expo-screen-orientation

// Importar las pantallas originales (Español)
import Inicio from './src/screens/Inicio';
import Idioma from './src/screens/Idioma';
import Entrar from './src/screens/Entrar';
import Registro from './src/screens/Registro';
import Eventos from './src/screens/Eventos';
import Archivos from './src/screens/Archivos';
import Principal from './src/screens/Principal';
import Ganadores from './src/screens/Ganadores';
import Perfil from './src/screens/Perfil';

// Importar las pantallas en inglés
import Index from './src/screens/Index';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import Events from './src/screens/Events';
import Files from './src/screens/Files';
import Winners from './src/screens/Winners';
import Profile from './src/screens/Profile';

// Crear los navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación en español
function TabNavigatorEsp() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Eventos') {
            iconName = 'calendar';
          } else if (route.name === 'Archivos') {
            iconName = 'folder';
          } else if (route.name === 'Principal') {
            iconName = 'home';
          } else if (route.name === 'Ganadores') {
            iconName = 'trophy';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Eventos" component={Eventos} />
      <Tab.Screen name="Archivos" component={Archivos} />
      <Tab.Screen name="Principal" component={Principal} />
      <Tab.Screen name="Ganadores" component={Ganadores} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// Navegación en inglés
function TabNavigatorEng() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Files') {
            iconName = 'folder';
          } else if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Winners') {
            iconName = 'trophy';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Files" component={Files} />
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Winners" component={Winners} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// Componente principal con la lógica de idioma
export default function App() {
  useEffect(() => {
    // Usar expo-screen-orientation para desbloquear todas las orientaciones
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.UNKNOWN); // Desbloquea todas las orientaciones

    // Limpieza al desmontar
    return () => {
      ScreenOrientation.removeOrientationChangeListener();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Idioma"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      >
        {/* Pantalla para seleccionar el idioma */}
        <Stack.Screen name="Idioma" component={Idioma} />

        {/* Navegación para Español */}
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Entrar" component={Entrar} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Archivos" component={Archivos} />
        <Stack.Screen name="Principal" component={TabNavigatorEsp} />

        {/* Navegación para Inglés */}
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Files" component={Files} />
        <Stack.Screen name="Main" component={TabNavigatorEng} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
