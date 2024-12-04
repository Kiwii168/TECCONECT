import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

function Main({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
      {/* Image at the top */}
      <TouchableOpacity onPress={() => navigation.replace('Main')}>
        <Image
          source={require("../images/Logo.png")} // Use require for local images
          style={{ width: 700, height: 100, marginBottom: 20, marginTop: 40 }} // Adjust top margin
          resizeMode="contain" // Ensures the image fits without being cropped
        />
      </TouchableOpacity>

      {/* Welcome message below the image */}
      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
        Welcome to TECCONECT!
      </Text>

      {/* Project description */}
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        This project is designed to encourage student participation in Innovatec, with the goal of fostering innovation and developing technological solutions with social impact.
      </Text>
      
      {/* Additional slogan */}
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        We are students seeking innovation and change.
      </Text>

      {/* Image below the text */}
      <Image
        source={require("../images/Logo.png")} // Adjust the image name according to the image you want to use
        style={{ width: 300, height: 200, marginTop: 20 }} // Adjust size and margin as needed
        resizeMode="contain" // Ensures the image fits without being cropped
      />
    </ScrollView>
  );
}

export default Main;
