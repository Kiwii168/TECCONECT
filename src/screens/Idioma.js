import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Idioma = ({ navigation }) => {
  const handleLanguageSelect = (language) => {
    console.log(`Idioma seleccionado: ${language}`);
    if (language === 'es') {
      navigation.navigate('Inicio', { language: language });  // Navega a "Inicio" si el idioma es español
    } else if (language === 'en') {
      navigation.navigate('Index', { language: language });  // Navega a "Index" si el idioma es inglés
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../images/Logo.png')}  // Asegúrate de que la ruta sea correcta
        style={styles.image}
        resizeMode="contain"  // Mantiene la imagen completa
      />
      
      <Text style={styles.languageText}>Selecciona un idioma</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('es')}  // Pasa 'es' al navegar
        >
          <Text style={styles.buttonText}>Español</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLanguageSelect('en')}  // Pasa 'en' al navegar
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Hace que el contenedor crezca más allá de la pantalla si es necesario
    justifyContent: 'center',  // Centra los elementos verticalmente
    alignItems: 'center',  // Centra los elementos horizontalmente
    padding: 20,  // Espacio interno general
    backgroundColor: 'white',  // Fondo claro para el contenedor
  },
  image: {
    width: '100%',  // La imagen ocupará el 100% del ancho de la pantalla
    height: 300,  // Ajusta la altura de la imagen
    marginBottom: 20,  // Añadir espacio debajo de la imagen
  },
  languageText: {
    fontSize: 24,  // Aumentar el tamaño del texto
    fontWeight: 'bold',
    color: '#333',  // Color oscuro para el texto
    marginBottom: 30,  // Añadir espacio entre el texto y los botones
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',  // Cambiar a 'column' para apilar los botones
    justifyContent: 'center',  // Centra los botones en el contenedor
    alignItems: 'center',  // Centra los botones horizontalmente
    marginTop: 20,  // Añadir espacio entre el texto y los botones
  },
  button: {
    backgroundColor: '#000080',  // Color de fondo del botón
    paddingVertical: 15,  // Añadir más espacio vertical para hacerlo más grande
    paddingHorizontal: 40,  // Añadir espacio horizontal para el tamaño
    borderRadius: 5,  // Bordes redondeados
    marginBottom: 20,  // Espacio entre los botones
    width: '80%',  // El botón ocupará el 80% del ancho disponible
    alignItems: 'center',  // Centra el texto dentro del botón
  },
  buttonText: {
    color: 'white',  // Texto blanco
    fontSize: 18,  // Aumentar el tamaño del texto
    fontWeight: 'bold',
  },
});

export default Idioma;
