import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  //Pressable,
  Pressable,
  StatusBar,
  Card,
} from "react-native";
import { Text } from "react-native-paper";

import Logo from "../assets/imgs/jucar.jpg";

const EscogerAutoparte = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View>
          <Text style={styles.title2}> {"\n"} PRODUCTOS</Text>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("AllAutoparts")}
          >
            <Text style={styles.botonesText}>Todas las Autopartes</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("AutoparteID")}
          >
            <Text style={styles.botonesText}>Autopartes por Id</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //logo
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
    justifyContent: "center",
    // alignItems: 'center',
    flex: 1,
    ///logo <-
  },
  title2: {
    fontSize: 18,
    color: "red ",
    fontWeight: "bold",
    marginLeft: 128,
    marginRight: -21,
    marginBottom: -19,
    width: 269.906,
    height: 68,
  },

  //botones
  botonesContainer: {
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
  },
  botones: {
    padding: 5,
    backgroundColor: "#f80759",
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 25,
    width: "80%",
    margin: 5,
    boxshadowColor: "#000000",
    boxshadowOpacity: 0,
    fontFamily: "sans-",
  },
  botonesText: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
    textTransform: "uppercase",
  },
}); // -> No hay estilos

export default EscogerAutoparte;
