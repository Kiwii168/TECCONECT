import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos de las tabs

// Importar las pantallas originales
import Inicio from './src/screens/Inicio';
import Idioma from './src/screens/Idioma';
import Index from './src/screens/Index';
import Entrar from './src/screens/Entrar';
import Registro from './src/screens/Registro';
import Tecs from './src/screens/Tecs';
import Carrera from './src/screens/Carrera';

// Importar las nuevas pantallas para el TabNavigator
import Eventos from './src/screens/Eventos';
import Plagio from './src/screens/Plagio';
import Principal from './src/screens/Principal';
import Ganadores from './src/screens/Ganadores';
import Perfil from './src/screens/Perfil';

// Crear los navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Eventos') {
            iconName = 'calendar';
          } else if (route.name === 'Plagio') {
            iconName = 'alert';
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
      <Tab.Screen name="Plagio" component={Plagio} />
      <Tab.Screen name="Principal" component={Principal} />
      <Tab.Screen name="Ganadores" component={Ganadores} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Idioma" // La pantalla inicial es 'Idioma'
        screenOptions={{
          headerShown: false,  // Oculta el encabezado en todas las pantallas
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,  // Hace que las pantallas se desvanezcan al cambiar
            },
          }),
        }}
      >
        {/* Pantallas originales */}
        <Stack.Screen name="Idioma" component={Idioma} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Index" component={Index} />
        
        {/* Pantalla de Entrar y Registro */}
        <Stack.Screen name="Entrar" component={Entrar} />
        <Stack.Screen name="Registro" component={Registro} />
        
        {/* Navegación después del registro */}
        <Stack.Screen 
          name="Tecs" 
          component={Tecs} 
          options={{ gestureEnabled: false }} // Evita que se regrese a la pantalla anterior
        />
        <Stack.Screen name="Carrera" component={Carrera} />
        
        {/* Agregar el TabNavigator como una pantalla dentro del Stack */}
        <Stack.Screen 
          name="Principal" 
          component={TabNavigator} 
          options={{ gestureEnabled: false }} // Evita que se regrese a la pantalla anterior
        />
        
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
