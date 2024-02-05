import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  //Pressable,
  Pressable,
  StatusBar,
  Card,
} from "react-native";

import Logo from "../assets/imgs/jucar.jpg";

const EscogerAutoparte1 = () => {
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
            onPress={() => navigation.navigate("AllAutoparts")}
          >
            <Text style={styles.botonesText}>Todas las Autopartes</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("AutopartesId")}
          >
            <Text style={styles.botonesText}>Autopartes por Id</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({}); // -> No hay estilos

export default EscogerAutoparte1;
