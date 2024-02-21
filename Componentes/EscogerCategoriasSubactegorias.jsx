import React from "react";
import { ScrollView, View, StyleSheet, Pressable, Image } from "react-native";
import { Text } from "react-native-paper";
import Logo from "../assets/imgs/jucar.jpg";
import categoriaIcon from "../assets/imgs/Tuerca.png";
import crearCategoriaIcon from "../assets/imgs/Tuerca.png";
import subcategoriaIcon from "../assets/imgs/Tuerca.png";
import todasSubcategoriasIcon from "../assets/imgs/Tuerca.png";

const EscogerCategoriasSubactegorias = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CATEGORIAS</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AllCategories")}
        >
          <Image source={categoriaIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Lista de Categorias</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AutoparteID")}
        >
          <Image source={crearCategoriaIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Crear Categoria</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUBCATEGORIAS</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AllAutoparts")}
        >
          <Image source={todasSubcategoriasIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Todas las SubCategorias</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AutoparteID")}
        >
          <Image source={subcategoriaIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Subcategoria por Categoria</Text>
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
    padding: 30,
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    marginBottom: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    marginVertical: 50,
  },
  icon: {
    width: 24,
    height: 30,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 19,
    color: "#fff",
    textTransform: "uppercase",
    marginLeft: 10,
  },
});

export default EscogerCategoriasSubactegorias;
