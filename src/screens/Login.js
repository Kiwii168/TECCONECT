import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator state
  const navigation = useNavigation(); // Navigation

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
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
        Alert.alert("Success", "Login successful.");

        // Save user ID in AsyncStorage
        await AsyncStorage.setItem('userId', data.user.id);

        // Navigate to the Main screen passing the user
        navigation.navigate("Main", { user: data.user });
      } else {
        Alert.alert("Error", data.message || "Invalid credentials.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to the server.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Disable the device's back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Block the back button
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Log In"}</Text>
      </TouchableOpacity>

      {/* Custom text to go back */}
      <TouchableOpacity onPress={() => navigation.navigate("Index")} style={styles.link}>
        <Text style={styles.linkText}>Go back</Text>
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
    backgroundColor: "#000080", // Change the button color here
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // Disabled button color
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

export default Login;
