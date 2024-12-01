import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

function Principal({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
      {/* Imagen en la parte superior */}
      <TouchableOpacity onPress={() => navigation.replace('Eventos')}>
        <Image
          source={require("../images/Logo.png")} // Usa require para las imágenes locales
          style={{ width: 700, height: 100, marginBottom: 20, marginTop: 40 }} // Ajusta el margen superior
          resizeMode="contain" // Asegura que la imagen se ajuste sin recortarse
        />
      </TouchableOpacity>

      {/* Mensaje de bienvenida debajo de la imagen */}
      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
        ¡Bienvenido al evento Innovatec!
      </Text>
    </View>
  );
}

export default Principal;
