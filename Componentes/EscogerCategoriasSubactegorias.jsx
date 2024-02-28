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
      <View style={styles.card}>
        <View style={styles.header}>
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
            onPress={() => navigation.navigate("MenuSubcategories")}
          >
            <Image source={crearCategoriaIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Menu Subcategorías</Text>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUBCATEGORIAS</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Subcategorias")}
          >
            <Image source={todasSubcategoriasIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Todas las SubCategorias</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Subcategorias")}
          >
            <Image source={subcategoriaIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Subcategoria por Categoria</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    padding: "20",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
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
  card: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default EscogerCategoriasSubactegorias;
