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
import Logo from "../assets/imgs/jucar.jpg";
import iconoProductos from "../assets/imgs/Tuerca.png";
import iconoProveedores from "../assets/imgs/Proveedor.png";
import iconoNegocio from "../assets/imgs/Portafolio77.png";
import iconoUsuarios from "../assets/imgs/Usuario.png";

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <Text style={styles.menuTitle}>Menu</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Productos")}
          >
            <Image source={iconoProductos} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Productos</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Proveedores")}
          >
            <Image source={iconoProveedores} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Proveedores</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Negocio")}
          >
            <Image source={iconoNegocio} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Negocio</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Users")}
          >
            <Image source={iconoUsuarios} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Usuarios</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuTitle: {
    fontFamily: "Aclonica",
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    width: "80%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    textTransform: "uppercase",
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

export default Menu;
