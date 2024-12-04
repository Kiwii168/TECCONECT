import React, { useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const Inicio = ({ navigation }) => {
  // Deshabilitar el botón de regresar del teléfono
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true // Retorna true para bloquear el botón
    );

    return () => backHandler.remove(); // Limpia el evento al desmontar el componente
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen */}
      <Image 
        source={require('../images/Logo.png')} // Utiliza require() para cargar imágenes locales
        style={styles.image} 
      />
      
      {/* Texto descriptivo */}
      <Text style={styles.title}>Descubre los proyectos vigentes e innovadores!</Text>
      <Text style={styles.subtitle}>Atrevete a ser único en TECNM</Text>
      
      {/* Botones de Login y Registro */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Entrar')} // Navega a la pantalla de Login
        >
          <Text style={styles.buttonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Registro')} // Navega a la pantalla de Registro
        >
          <Text style={styles.buttonText}>Registro</Text>
        </TouchableOpacity>
      </View>

      {/* Texto para regresar a la pantalla Idioma */}
      <TouchableOpacity onPress={() => navigation.navigate('Idioma')}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: width * 0.05,  // Margen dinámico según el ancho de la pantalla
  },
  image: {
    width: width * 0.5,  // La imagen será el 50% del ancho de la pantalla
    height: height * 0.3, // La altura será el 30% de la altura de la pantalla
    marginBottom: height * 0.05, // Espacio debajo de la imagen
    resizeMode: 'contain',  // Mantener la proporción de la imagen
  },
  title: {
    fontSize: width * 0.06, // Tamaño dinámico del texto según el ancho de la pantalla
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02, // Margen debajo del título
  },
  subtitle: {
    fontSize: width * 0.05, // Tamaño del subtítulo ajustado al ancho
    textAlign: 'center',
    marginBottom: height * 0.05, // Margen debajo del subtítulo
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Alinea los botones de forma equidistante
    marginTop: height * 0.05, // Espacio superior antes de los botones
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: height * 0.02, // Padding dinámico según la altura de la pantalla
    paddingHorizontal: width * 0.1,  // Padding horizontal dinámico según el ancho
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,  // Tamaño de texto relativo al ancho
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    fontSize: width * 0.04,
    marginTop: height * 0.03,
    textDecorationLine: 'underline', // Subrayado para indicar que es un enlace
  },
});

export default Inicio;
