import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Perfil({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    correo: "",
    password: "",
    tecnologico: "",
    carrera: "",
  });

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        const data = await response.json();

        setUserInfo({
          nombre: data.user.name || '',
          correo: data.user.email || '',
          password: data.user.password || '',
          tecnologico: data.user.tec || '',
          carrera: data.user.degree[0] || '',
        });
      } else {
        throw new Error("No se encontró el ID de usuario.");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      Alert.alert("Error", "Hubo un problema al recuperar los datos.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateInputs = () => {
    const { nombre, correo, password, tecnologico, carrera } = userInfo;
    
    // Trim inputs
    const trimmedInputs = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      password: password.trim(),
      tecnologico: tecnologico.trim(),
      carrera: carrera.trim()
    };

    // Validation checks
    if (!trimmedInputs.nombre) {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedInputs.correo || !emailRegex.test(trimmedInputs.correo)) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico válido.");
      return false;
    }

    // Password validation
    if (!trimmedInputs.password || trimmedInputs.password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (!trimmedInputs.tecnologico) {
      Alert.alert("Error", "El tecnológico no puede estar vacío.");
      return false;
    }

    if (!trimmedInputs.carrera) {
      Alert.alert("Error", "La carrera no puede estar vacía.");
      return false;
    }

    return trimmedInputs;
  };

  const handleSaveChanges = async () => {
    // Validate inputs
    const validatedInputs = validateInputs();
    if (!validatedInputs) return;

    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/edit-user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedInputs.nombre,
            email: validatedInputs.correo,
            password: validatedInputs.password,
            tec: validatedInputs.tecnologico,
            degree: [validatedInputs.carrera],
          }),
        });

        // Check if response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error de la API:", errorData);
          throw new Error(errorData.message || "Error al actualizar los datos del usuario.");
        }

        const data = await response.json();
        console.log("Respuesta de la API después de la actualización:", data);

        // Reload updated data
        await fetchUserData();
        
        // Disable edit mode
        setEditable(false);
        
        // Show success message
        Alert.alert("Éxito", "Cambios realizados con éxito.");
      } else {
        throw new Error("No se encontró el ID de usuario.");
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      Alert.alert("Error", error.message || "Hubo un problema al guardar los datos.");
    }
  };

  const cerrarSesion = () => {
    AsyncStorage.removeItem("userId");
    navigation.navigate("Entrar");
  };

  const toggleEditable = () => {
    if (editable) {
      // If in edit mode, try to save changes
      handleSaveChanges();
    } else {
      // If not in edit mode, activate editing
      setEditable(true);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MaterialIcons name="account-circle" size={150} color="#000080" style={styles.profileIcon} />

      <View style={styles.infoContainer}>
        <Text style={styles.fieldLabel}>Nombre</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.nombre}
          editable={editable}
          onChangeText={(value) => handleInputChange("nombre", value)}
          placeholder="Ingrese su nombre"
        />

        <Text style={styles.fieldLabel}>Correo</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.correo}
          editable={editable}
          onChangeText={(value) => handleInputChange("correo", value)}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.fieldLabel}>Tecnológico</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.tecnologico}
          editable={editable}
          onChangeText={(value) => handleInputChange("tecnologico", value)}
          placeholder="Ingrese su tecnológico"
        />

        <Text style={styles.fieldLabel}>Carrera</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.carrera}
          editable={editable}
          onChangeText={(value) => handleInputChange("carrera", value)}
          placeholder="Ingrese su carrera"
        />

        <Text style={styles.fieldLabel}>Contraseña</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.password}
          secureTextEntry
          editable={editable}
          onChangeText={(value) => handleInputChange("password", value)}
          placeholder="Ingrese su contraseña"
        />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={toggleEditable}>
        <Text style={styles.editButtonText}>{editable ? "Guardar" : "Editar"}</Text>
      </TouchableOpacity>

      <Button title="Cerrar Sesión" onPress={cerrarSesion} color="#f44336" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  fieldLabel: {
    fontSize: 16,
    color:
 "#000080",
    fontWeight: "bold",
    marginTop: 10,
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
