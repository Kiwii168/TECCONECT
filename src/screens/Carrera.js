import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Carrera = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('Principal');  // Cambia 'OtroScreen' por el nombre de la pantalla a la que quieres navegar
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Selecciona tu Carrera</Text>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={require('../images/Logo.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={require('../images/Logo.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={require('../images/Logo.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centra el contenido verticalmente
    alignItems: 'center',  // Centra el contenido horizontalmente
    padding: 0,  // Sin espacio adicional
    backgroundColor: 'white',  // Cambia el color de fondo
  },
  imageContainer: {
    flexDirection: 'column',  // Alineación de las imágenes en columna (arriba-abajo)
    justifyContent: 'center',  // Centra las imágenes verticalmente
    alignItems: 'center',  // Centra las imágenes horizontalmente
    height: '100%',  // Asegura que el contenedor ocupe toda la altura de la pantalla
  },
  title: {
    fontSize: 24,  // Tamaño de fuente más grande
    fontWeight: 'bold',  // Negrita
    marginBottom: 20,  // Espacio debajo del texto
    textAlign: 'center',  // Centra el texto
  },
  image: {
    width: 150,  // Aumenta el ancho de las imágenes
    height: 150,  // Aumenta la altura de las imágenes
    resizeMode: 'contain',  // Ajusta la imagen sin recortarla ni distorsionarla
    marginBottom: 20,  // Espacio entre las imágenes
  },
});

export default Carrera;
