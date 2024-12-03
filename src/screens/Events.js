import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, Linking, StyleSheet, BackHandler, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Block the back button
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://app-tq3o5pftgq-uc.a.run.app/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error opening link:", err));
  };

  const renderItem = ({ item }) => {
    const eventDate = new Date(item.date._seconds * 1000); // Convert seconds to milliseconds
    return (
      <View style={styles.item}>
        <Image source={require("../images/Logo.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>Date: {eventDate.toLocaleDateString()}</Text>
          <Text style={styles.link} onPress={() => handleLinkPress("https://www.google.com")}>
            More information
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});

export default Events;
