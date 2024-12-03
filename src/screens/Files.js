import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

function Files({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Members:", members);
    alert("Data sent!");
  };

  return (
    <View style={styles.container}>
      {/* Name field */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the name"
        value={name}
        onChangeText={setName}
      />

      {/* Description area */}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter the description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {/* Members field */}
      <Text style={styles.label}>Members:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the names of the members"
        value={members}
        onChangeText={setMembers}
      />

      {/* Blue button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // White background
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
    height: 100, // Specific height for the text area
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#000080", // Blue
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Files;
