import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tecs = () => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    console.log('Navegando a Carrera'); // Verifica si el evento se activa correctamente
    navigation.navigate('Carrera');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Selecciona tu Tecnológico</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'white',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Tecs;
