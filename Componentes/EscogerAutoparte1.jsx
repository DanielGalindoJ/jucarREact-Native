import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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

          <TouchableOpacity
            style={styles.botones}
            onPress={() => navigation.navigate("AllAutoparts")}
          >
            <Text style={styles.botonesText}>Todas las Autopartes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botones}
            onPress={() => navigation.navigate("AutopartesId")}
          >
            <Text style={styles.botonesText}>Autopartes por Id</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default EscogerAutoparte1;
