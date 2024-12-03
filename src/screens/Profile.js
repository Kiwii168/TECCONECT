import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
    degree: "",
  });

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await fetch(`https://app-tq3o5pftgq-uc.a.run.app/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error fetching user data.");
        }
        const data = await response.json();

        setUserInfo({
          name: data.user.name || '',
          email: data.user.email || '',
          password: data.user.password || '',
          institution: data.user.tec || '',
          degree: data.user.degree[0] || '',
        });
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "There was a problem retrieving the data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const validateInputs = () => {
    const { name, email, password, institution, degree } = userInfo;
    
    // Trim inputs
    const trimmedInputs = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      institution: institution.trim(),
      degree: degree.trim()
    };

    // Validation checks
    if (!trimmedInputs.name) {
      Alert.alert("Error", "Name cannot be empty.");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedInputs.email || !emailRegex.test(trimmedInputs.email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return false;
    }

    // Password validation
    if (!trimmedInputs.password || trimmedInputs.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return false;
    }

    if (!trimmedInputs.institution) {
      Alert.alert("Error", "Institution cannot be empty.");
      return false;
    }

    if (!trimmedInputs.degree) {
      Alert.alert("Error", "Degree cannot be empty.");
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
            name: validatedInputs.name,
            email: validatedInputs.email,
            password: validatedInputs.password,
            tec: validatedInputs.institution,
            degree: [validatedInputs.degree],
          }),
        });

        // Check if response is successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error:", errorData);
          throw new Error(errorData.message || "Error updating user data.");
        }

        const data = await response.json();
        console.log("API response after update:", data);

        // Reload updated data
        await fetchUserData();
        
        // Disable edit mode
        setEditable(false);
        
        // Show success message
        Alert.alert("Success", "Changes saved successfully.");
      } else {
        throw new Error("User ID not found.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Alert.alert("Error", error.message || "There was a problem saving the data.");
    }
  };

  const signOut = () => {
    AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
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
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={150} color="#000080" style={styles.profileIcon} />

      <View style={styles.infoContainer}>
        <Text style={styles.fieldLabel}>Name</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.name}
          editable={editable}
          onChangeText={(value) => handleInputChange("name", value)}
          placeholder="Enter your name"
        />

        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.email}
          editable={editable}
          onChangeText={(value) => handleInputChange("email", value)}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.fieldLabel}>Institution</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.institution}
          editable={editable}
          onChangeText={(value) => handleInputChange("institution", value)}
          placeholder="Enter your institution"
        />

        <Text style={styles.fieldLabel}>Degree</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.degree}
          editable={editable}
          onChangeText={(value) => handleInputChange("degree", value)}
          placeholder="Enter your degree"
        />

        <Text style={styles.fieldLabel}>Password</Text>
        <TextInput
          style={[styles.infoText, editable && styles.editableField]}
          value={userInfo.password}
          secureTextEntry
          editable={editable}
          onChangeText={(value) => handleInputChange("password", value)}
          placeholder="Enter your password"
        />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={toggleEditable}>
        <Text style={styles.editButtonText}>{editable ? "Save" : "Edit"}</Text>
      </TouchableOpacity>

      <Button title="Sign Out" onPress={signOut} color="#f44336" />
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
  fieldLabel: {
    fontSize: 16,
    color: "#000080",
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

export default Profile;
