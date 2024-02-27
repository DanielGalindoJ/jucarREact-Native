import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  Dimensions, // Importa Dimensions para obtener el ancho de la pantalla
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import Logo from "../assets/imgs/jucar.jpg";
import iconoCategoria from "../assets/imgs/Categorias2.png";
import iconoAutoparte from "../assets/imgs/Autopartes.png";
import iconoMateriaPrima from "../assets/imgs/MateriaP.png";

const Productos = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#f80759" />{" "}
      {/* Cambia el color de la barra de estado */}
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subTitle}>Productos</Text>
        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("EscogerCategoriasSubactegorias")}
        >
          <Image source={iconoCategoria} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>CATEGORIAS</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("EscogerAutoparte")}
        >
          <Image source={iconoAutoparte} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>AUTOPARTES</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("MateriasPrima")}
        >
          <Image source={iconoMateriaPrima} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>MATERIAS PRIMAS</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
  },
  navbar: {
    backgroundColor: "#f80759",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10, // Agrega un padding horizontal
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subTitle: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20, // Reduce el margen inferior
    color: "#000",
    textAlign: "center", // Centra el texto
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10, // Agrega un padding horizontal
    marginBottom: 10,
    width: Dimensions.get("window").width - 40, // Usa el ancho de la pantalla menos los márgenes laterales
    maxWidth: 300,
  },
  iconoBoton: {
    width: 40,
    height: 30,
    marginRight: 20,
  },
  botonesText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "sans-serif",
  },
});

export default Productos;
