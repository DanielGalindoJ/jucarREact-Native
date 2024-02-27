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
import IconoTodas from "../assets/imgs/Autopartes.png"; // Ruta de tu icono para Todas las Autopartes
import IconoId from "../assets/imgs/Autopartes.png"; // Ruta de tu icono para Autopartes por Id

const EscogerAutoparte = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#f80759" barStyle="light-content" />
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRODUCTOS</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AllAutoparts")}
        >
          <Image source={IconoTodas} style={styles.icon} />
          <Text style={styles.buttonText}>Todas las Autopartes</Text>
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
    paddingTop: StatusBar.currentHeight, // Ajusta el paddingTop según la altura de la barra de estado
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
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    alignItems: "center",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 70,
  },
  button: {
    flexDirection: "row",
    padding: 30,
    backgroundColor: "#f80759",
    borderColor: "#000000",
    borderWidth: 4,
    borderRadius: 10,
    width: "80%",
    marginVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    textTransform: "uppercase",
    marginLeft: 5,
    verticalAlign: "center",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default EscogerAutoparte;
