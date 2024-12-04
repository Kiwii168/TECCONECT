import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

function Principal({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
      {/* Imagen en la parte superior */}
      <TouchableOpacity onPress={() => navigation.replace('Principal')}>
        <Image
          source={require("../images/Logo.png")} // Usa require para las imágenes locales
          style={{ width: 700, height: 100, marginBottom: 20, marginTop: 40 }} // Ajusta el margen superior
          resizeMode="contain" // Asegura que la imagen se ajuste sin recortarse
        />
      </TouchableOpacity>

      {/* Mensaje de bienvenida debajo de la imagen */}
      <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
        ¡Bienvenido a TECCONECT!
      </Text>

      {/* Descripción del proyecto */}
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        Este proyecto está diseñado para fomentar la participación de los estudiantes en Innovatec, con el objetivo de incentivar la innovación y el desarrollo de soluciones tecnológicas con impacto social.
      </Text>
      
      {/* Lema adicional */}
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        Somos estudiantes que buscan la innovación y el cambio.
      </Text>

      {/* Imagen debajo del texto */}
      <Image
        source={require("../images/Guapos.png")} // Ajusta el nombre de la imagen según la imagen que quieras usar
        style={{ width: 300, height: 200, marginTop: 20 }} // Ajusta el tamaño y el margen según necesites
        resizeMode="contain" // Asegura que la imagen se ajuste sin recortarse
      />
    </ScrollView>
  );
}

export default Principal;
