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
import IconoTodas from "../assets/imgs/Autopartes.png";
import IconoId from "../assets/imgs/Autopartes.png";

const EscogerAutoparte = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#f80759" barStyle="light-content" />
      <View style={styles.card}>
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
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MenuAutoparts")}
          >
            <Image source={IconoTodas} style={styles.icon} />
            <Text style={styles.buttonText}>Menu Autopartes</Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
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
  card: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", // Reemplazo de las propiedades de sombra
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default EscogerAutoparte;
