import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
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
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  navbar: {
    backgroundColor: "#f80759",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
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
    flex: 1, // Para que ocupe todo el espacio disponible
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subTitle: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#000", // Color negro
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: "100%",
    maxWidth: 300,
    marginVertical: 50, // Ajusta el ancho máximo de los botones si lo deseas
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
