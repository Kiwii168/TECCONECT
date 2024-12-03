import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";

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
        const response = await fetch("https://app-tq3o5pftgq-uc.a.run.app/api/winner");
        const data = await response.json();
        setWinner(data);
      } catch (error) {
        Alert.alert("Error", "Could not load winner information.");
        console.error("Error fetching winner:", error);
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
    <View style={styles.container}>
      <Text style={styles.title}>Winners</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://via.placeholder.com/150", // Replace with dynamic image if API provides one
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
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
