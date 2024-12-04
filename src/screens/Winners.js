import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";

// Import the local image
import LocalImage from "../images/Ganador.jpg";

function Winners() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const confettiRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      if (confettiRef.current) {
        confettiRef.current.start();
      }
    }, [])
  );

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        // Simulate an API response
        const data = {
          event: "2024-12-01",
          name: "Innovative Project",
          integrants: ["Juan Pérez", "María García", "Luis Gómez"],
        };
        setWinner(data);
      } catch (error) {
        Alert.alert("Error", "Could not load winner information.");
        console.error("Error loading winner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinner();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!winner) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No winner information found.</Text>
      </View>
    );
  }

  const eventDate = new Date(winner.event).toLocaleDateString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Winners</Text>
      <Image
        style={styles.image}
        source={LocalImage} // Use the local image
      />
      <Text style={styles.description}>Event: {eventDate}</Text>
      <Text style={styles.description}>Project Name: {winner.name}</Text>
      <Text style={styles.description}>Team Members:</Text>
      {winner.integrants.map((integrant, index) => (
        <Text key={index} style={styles.integrant}>
          - {integrant}
        </Text>
      ))}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: 0, y: 0 }}
        fadeOut={true}
        autoStart={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: 300,  // Larger image
    height: 300, // Larger image
    marginBottom: 20, // Keep the bottom margin for spacing
    resizeMode: "contain", // Ensures the image fits within its dimensions
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  integrant: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default Winners;
