import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,

  // TouchableOpacity, -> reemplaze por Pressable
  Pressable,
  Image,
} from "react-native";
import { Text } from "react-native-paper";

import { DataTable } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const AllAutoparts = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/autoparts"
        );

        setItems(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);

        setError("Error al cargar datos. Inténtalo de nuevo más tarde.");
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (item) => {
    setSelectedItem(item);

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />

        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <DataTable style={styles.dataTable}>
            <DataTable.Header></DataTable.Header>

            {items.map((item) => (
              <Pressable key={item.key} onPress={() => handleItemPress(item)}>
                <DataTable.Row>
                  <DataTable.Cell>{item.AutopartID}</DataTable.Cell>

                  <DataTable.Cell>{item.name}</DataTable.Cell>

                  <DataTable.Cell>{item.Descripcion}</DataTable.Cell>

                  <DataTable.Cell>{item.Inventory}</DataTable.Cell>

                  <DataTable.Cell>{item.value}</DataTable.Cell>

                  <DataTable.Cell>{item.state}</DataTable.Cell>
                </DataTable.Row>
              </Pressable>
            ))}
          </DataTable>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            {selectedItem && (
              <>
                <Text>AutopartID: {selectedItem.AutopartID}</Text>

                <Text>Nombre: {selectedItem.name}</Text>

                <Text>Descripción: {selectedItem.Descripcion}</Text>

                <Text>Inventario: {selectedItem.Inventory}</Text>

                <Text>Valor: {selectedItem.value}</Text>

                <Text>Estado: {selectedItem.State}</Text>
              </>
            )}

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 10 }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dataTable: {
    marginTop: 16,
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

export default AllAutoparts;
