import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Perfil({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: "Kiwii",
    correo: "cc915609@gmail.com",
    tecnologico: "ITA",
    carrera: "Tecnologías de la Información y la Comunicación",
  });

  const cerrarSesion = () => {
    navigation.navigate("Entrar");
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <View style={styles.container}>
      {/* Ícono de perfil */}
      <MaterialIcons name="account-circle" size={150} color="#000080" style={styles.profileIcon} />

      {/* Datos del usuario */}
      <View style={styles.infoContainer}>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.nombre}
          editable={editable}
          onChangeText={(value) => handleInputChange("nombre", value)}
        />
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.correo}
          editable={editable}
          onChangeText={(value) => handleInputChange("correo", value)}
        />
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.tecnologico}
          editable={editable}
          onChangeText={(value) => handleInputChange("tecnologico", value)}
        />
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.carrera}
          editable={editable}
          onChangeText={(value) => handleInputChange("carrera", value)}
        />
      </View>

      {/* Botón para habilitar/guardar edición */}
      <TouchableOpacity style={styles.editButton} onPress={toggleEditable}>
        <Text style={styles.editButtonText}>{editable ? "Guardar" : "Editar"}</Text>
      </TouchableOpacity>

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
    backgroundColor: "white",
  },
  profileIcon: {
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  editableField: {
    borderColor: "#4caf50",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  editButton: {
    backgroundColor: "#000080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Perfil;
