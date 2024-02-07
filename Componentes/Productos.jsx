import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  // Pressable,
  Pressable,
  StatusBar,
  Card,
} from "react-native";
import { Text } from "react-native-paper";

import Logo from "../assets/imgs/jucar.jpg";

const Productos = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View>
          <Text style={styles.title}> {"\n"} PRODUCTOS</Text>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("Categorias")}
          >
            <Text style={styles.botonesText}>Categorias</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("Autopartes")}
          >
            <Text style={styles.botonesText}>Autopartes</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("MateriasPrima")}
          >
            <Text style={styles.botonesText}>Materias Prima</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  container: {
    marginTop: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
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
    elevation: 1,
    marginTop: 33,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 35,
  },
});
export default Productos;
