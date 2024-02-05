import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  // Pressable,
  Pressable,
  StatusBar,
} from "react-native";
import Logo from "../assets/imgs/jucar.jpg";

const Menu = () => {
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

        <Text style={styles.text}> {"\n"} Elige una opción</Text>
      </View>

      <View style={styles.botonesContainer}>
        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Productos")}
        >
          <Text style={styles.botonesText}>Productos</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Ventas")}
        >
          <Text style={styles.botonesText}>Ventas</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Proveedores")}
        >
          <Text style={styles.botonesText}>Proveedores</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Negocio")}
        >
          <Text style={styles.botonesText}>Negocio</Text>
        </Pressable>

        <Pressable
          style={styles.botones}
          onPress={() => navigation.navigate("Users")}
        >
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
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
  },
  imagenContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  botones: {
    padding: 5,
    backgroundColor: "#002B5B",
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 25,
    width: "80%",
    margin: 5,
    shadowColor: "#000000",
    shadowOpacity: 0,
  },
  botonesText: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    color: "#000000",
  },
  navbar: {
    backgroundColor: "#f80759",
    color: "#fff",
    borderColor: "#03a9f4",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 30,
    fontWeight: 500,

    marginTop: 1,
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 128,
    marginRight: -21,
    marginBottom: -19,
    width: 269.906,
    height: 68,
  },
});
export default Menu;
