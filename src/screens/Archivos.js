import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, ScrollView } from "react-native";

function Archivos({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [integrantes, setIntegrantes] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Obtener todos los proyectos al cargar la pantalla
  useEffect(() => {
    fetch("https://app-tq3o5pftgq-uc.a.run.app/api/proyects")
      .then((response) => response.json())
      .then((data) => setProyectos(data))
      .catch((error) => console.error("Error al obtener proyectos:", error));
  }, []);

  const handleSubmit = () => {
    const integrantsArray = integrantes.split(",").map((item) => item.trim()); // Convertir a array

    const projectData = {
      name: nombre,
      description: descripcion,
      integrants: integrantsArray,
      degree: "Grado", // Agregar aquí el grado si es necesario
    };

    fetch("https://app-tq3o5pftgq-uc.a.run.app/api/new-proyect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Proyecto creado:", data);
        setProyectos((prevProyectos) => [...prevProyectos, data]); // Agregar el proyecto a la lista
        alert("Proyecto creado con éxito!");
      })
      .catch((error) => {
        console.error("Error al crear proyecto:", error);
        alert("Error al crear el proyecto.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true); // Mostrar la ventana modal con los detalles del proyecto
  };

  const renderProjectButton = ({ item }) => (
    <TouchableOpacity style={styles.projectButton} onPress={() => handleProjectPress(item)}>
      <Text style={styles.projectButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Formulario */}
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escribe la descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Integrantes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe los nombres de los integrantes"
        value={integrantes}
        onChangeText={setIntegrantes}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      {/* Mostrar proyectos */}
      <Text style={styles.projectListTitle}>Proyectos creados:</Text>
      <FlatList
        data={proyectos}
        renderItem={renderProjectButton}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal para mostrar detalles del proyecto */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentProject && (
              <>
                <Text style={styles.modalTitle}>{currentProject.name}</Text>
                <Text>{`Descripción: ${currentProject.description}`}</Text>
                <Text>{`Integrantes: ${currentProject.integrants.join(", ")}`}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite el desplazamiento si el contenido excede el tamaño de la pantalla
    padding: 20,
    backgroundColor: "#ffffff",
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
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000080",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  projectListTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  projectButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  projectButtonText: {
    color: "#333",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#000080",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Archivos;
