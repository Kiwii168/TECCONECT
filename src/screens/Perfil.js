import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

function Perfil({ navigation }) {
  const cerrarSesion = () => {
    // Lógica para cerrar sesión si es necesario
    navigation.navigate("Entrar"); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      {/* Imagen del perfil */}
      <Image
        source={require("../images/Perfil.png")} // Imagen local
        style={styles.profileImage}
      />

      {/* Datos del usuario */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nombre: Kiwii</Text>
        <Text style={styles.infoText}>Correo: cc915609@gmail.com</Text>
        <Text style={styles.infoText}>Tecnológico: ITA</Text>
        <Text style={styles.infoText}>Carrera: Tecnologías de la Información y la Comunicación</Text>
      </View>

      {/* Botón para cerrar sesión */}
      <Button title="Cerrar Sesión" onPress={cerrarSesion} color="#f44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
});

export default Perfil;
