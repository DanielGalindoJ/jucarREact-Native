import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { DataTable } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const AutopartID = () => {
  const [autoparts, setAutopart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("");

        if (response.ok) {
          const data = await response.json();
          setAutopart(data);
        } else {
          console.error("Error en la solicitud a la API");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>
      </View>
      // Table
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Autoparte Por ID</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombres</Text>
            <Text style={styles.headerText}>Descripcion</Text>
            <Text style={styles.headerText}>Peso (Kg)</Text>
            <Text style={styles.headerText}>Altura (cm) </Text>
            <Text style={styles.headerText}>Ancho (cm) </Text>
            <Text style={styles.headerText}>Estado</Text>
            <Text style={styles.headerText}>Subcategoria</Text>
          </View>

          {autoparts.map((autopart) => (
            <View key={autopart.AutopartID} style={styles.row}>
              <Text style={styles.cell}>{autopart.nombre}</Text>
              <Text style={styles.cell}>{usuario.descripcion}</Text>
              <Text style={styles.cell}>{usuario.Peso}</Text>
              <Text style={styles.cell}>{usuario.altura}</Text>
              <Text style={styles.cell}>{usuario.ancho}</Text>
              <Text style={styles.cell}>{usuario.estado}</Text>
              <Text style={styles.cell}>{usuario.subcategoria}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
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
  //logo <-

  //table ->
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    padding: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    padding: 8,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC",
    paddingHorizontal: 8,
  },
  //table <-
});
export default AutopartID;
