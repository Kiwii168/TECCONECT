import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, ScrollView } from "react-native";

function Files({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Fetch all projects when the screen loads
  useEffect(() => {
    fetch("https://app-tq3o5pftgq-uc.a.run.app/api/proyects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleSubmit = () => {
    const membersArray = members.split(",").map((item) => item.trim()); // Convert to array

    const projectData = {
      name: name,
      description: description,
      integrants: membersArray,
      degree: "Degree", // Add degree here if necessary
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
        console.log("Project created:", data);
        setProjects((prevProjects) => [...prevProjects, data]); // Add the project to the list
        alert("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        alert("Error creating the project.");
      });
  };

  const handleProjectPress = (project) => {
    setCurrentProject(project);
    setShowModal(true); // Show the modal window with the project details
  };

  const renderProjectButton = ({ item }) => (
    <TouchableOpacity style={styles.projectButton} onPress={() => handleProjectPress(item)}>
      <Text style={styles.projectButtonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Form */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter the description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Members:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the names of the members"
        value={members}
        onChangeText={setMembers}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Display projects */}
      <Text style={styles.projectListTitle}>Created Projects:</Text>
      <FlatList
        data={projects}
        renderItem={renderProjectButton}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal to show project details */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentProject && (
              <>
                <Text style={styles.modalTitle}>{currentProject.name}</Text>
                <Text>{`Description: ${currentProject.description}`}</Text>
                <Text>{`Members: ${currentProject.integrants.join(", ")}`}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Files;
