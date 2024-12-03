import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

function Main({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
      {/* Image at the top */}
      <TouchableOpacity onPress={() => navigation.replace('Events')}>
        <Image
          source={require("../images/Logo.png")} // Use require for local images
          style={{ width: 700, height: 100, marginBottom: 20, marginTop: 40 }} // Adjust the top margin
          resizeMode="contain" // Ensures the image fits without cutting off
        />
      </TouchableOpacity>

      {/* Welcome message below the image */}
      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
        Welcome to TECCONECT!
      </Text>
    </View>
  );
}

export default Main;
