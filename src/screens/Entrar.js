import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Entrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const navigation = useNavigation(); // Navegación

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://app-tq3o5pftgq-uc.a.run.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Éxito", "Inicio de sesión exitoso.");

        // Guardar el ID de usuario en AsyncStorage
        await AsyncStorage.setItem('userId', data.user.id);

        // Navegar a la pantalla Principal pasando el usuario
        navigation.navigate("Principal", { user: data.user });
      } else {
        Alert.alert("Error", data.message || "Credenciales inválidas.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  // Deshabilitar el botón de regresar del dispositivo
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Bloquea el botón de regresar
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading} // Desactivar botón mientras carga
      >
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar sesión"}</Text>
      </TouchableOpacity>

      {/* Texto personalizado para regresar */}
      <TouchableOpacity onPress={() => navigation.navigate("Inicio")} style={styles.link}>
        <Text style={styles.linkText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000080", // Cambia el color del botón aquí
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Color del botón deshabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Entrar;
