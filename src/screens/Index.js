import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const Inicio = ({ navigation }) => {
  // Disable the phone's back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true // Return true to block the button
    );

    return () => backHandler.remove(); // Clean up the event when the component unmounts
  }, []);

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image 
        source={require('../images/Logo.png')} // Use require() to load local images
        style={styles.image} 
      />
      
      {/* Descriptive text */}
      <Text style={styles.title}>Discover the current and innovative projects!</Text>
      <Text style={styles.subtitle}>Dare to be unique at TECNM</Text>
      
      {/* Login and Register buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')} // Navigate to the Login screen
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Register')} // Navigate to the Register screen
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Text to go back to the Language screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Idioma')}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: width * 0.05,  // Dynamic margin based on screen width
  },
  image: {
    width: width * 0.5,  // The image will be 50% of the screen width
    height: height * 0.3, // The height will be 30% of the screen height
    marginBottom: height * 0.05, // Space below the image
    resizeMode: 'contain',  // Maintain image aspect ratio
  },
  title: {
    fontSize: width * 0.06, // Dynamic text size based on screen width
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02, // Margin below the title
  },
  subtitle: {
    fontSize: width * 0.05, // Subtitle size adjusted to the width
    textAlign: 'center',
    marginBottom: height * 0.05, // Margin below the subtitle
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Align buttons evenly
    marginTop: height * 0.05, // Top margin before the buttons
  },
  button: {
    backgroundColor: '#000080',
    paddingVertical: height * 0.02, // Vertical padding based on screen height
    paddingHorizontal: width * 0.1,  // Horizontal padding based on screen width
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,  // Text size relative to the width
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    fontSize: width * 0.04,
    marginTop: height * 0.03,
    textDecorationLine: 'underline', // Underlined to indicate it's a link
  },
});

export default Inicio;
