import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Text } from "react-native-paper";
import Logo from "../assets/imgs/jucar.jpg";
import flechaAtras from "../assets/imgs/flecha-pequena-izquierda.png";
import iconoProductos from "../assets/imgs/Tuerca.png";
import iconoProveedores from "../assets/imgs/Proveedor.png";
import iconoNegocio from "../assets/imgs/Portafolio77.png";
import iconoUsuarios from "../assets/imgs/Usuario.png";

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="red" />

      <View style={styles.imagenContainer}>
        <Pressable style={styles.touchImage} activeOpacity={1}>
          <View style={styles.navbar}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
          </View>
        </Pressable>

        <Text style={styles.text}>Menu</Text>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Image source={flechaAtras} style={styles.tabIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.botonesContainer}>
        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Productos")}
        >
          <Image source={iconoProductos} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>Productos</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Proveedores")}
        >
          <Image source={iconoProveedores} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>Proveedores</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Negocio")}
        >
          <Image source={iconoNegocio} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>Negocio</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Users")}
        >
          <Image source={iconoUsuarios} style={styles.iconoBoton} />
          <Text style={styles.botonesText}>Usuarios</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "5%",
  },
  botonesContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imagenContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  botones: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f80759",
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    width: "80%",
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconoBoton: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  botonesText: {
    fontSize: 25,
    color: "#fff",
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Aclonica",
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
  },
  navbar: {
    backgroundColor: "#f80759",
    color: "#fff",
    borderColor: "#03a9f4",
    flexDirection: "row",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 40,
    fontWeight: 500,
    marginTop: 1,
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  tabItem: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 54,
    height: 54,
    marginRight: 10,
  },
});
export default Menu;
