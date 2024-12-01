import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

function Plagio({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [integrantes, setIntegrantes] = useState("");

  const handleSubmit = () => {
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("Integrantes:", integrantes);
    alert("Datos enviados!");
  };

  return (
    <View style={styles.container}>
      {/* Campo para Nombre */}
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Área de texto para Descripción */}
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribe la descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />

      {/* Campo para Integrantes */}
      <Text style={styles.label}>Integrantes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe los nombres de los integrantes"
        value={integrantes}
        onChangeText={setIntegrantes}
      />

      {/* Botón azul */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // Fondo blanco
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100, // Altura específica para el área de texto
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000080", // Azul
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Texto blanco
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Plagio;

