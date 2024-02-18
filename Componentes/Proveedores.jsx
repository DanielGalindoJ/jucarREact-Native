import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  // Pressable,
  Pressable,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { DataTable } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const Proveedores = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/providers"
        );

        if (response.ok) {
          const data = await response.json();
          setProviders(data);
        } else {
          console.error("Error en la solicitud a la API");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud a la API", error);
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

      <ScrollView style={styles.container}>
        <Text style={styles.header}>Proveedores</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Proveedor ID</Text>
            <Text style={styles.headerText}>Tipo de Identificacion</Text>
            <Text style={styles.headerText}>Numero de Identificacion</Text>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Email </Text>
            <Text style={styles.headerText}>Estado</Text>
          </View>

          {providers.map((provider) => (
            <View key={provider.ProviderID} style={styles.row}>
              <Text style={styles.cell}>{autopart.IdentifierType}</Text>
              <Text style={styles.cell}>{usuario.IdentifierNumber}</Text>
              <Text style={styles.cell}>{usuario.Name}</Text>
              <Text style={styles.cell}>{usuario.EmailAddress}</Text>
              <Text style={styles.cell}>{usuario.Estado}</Text>
            </View>
          ))}
        </View>
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
                <Text>ProviderID: {selectedItem.ProviderID}</Text>

                <Text>
                  {" "}
                  Tipo de Identifiación: {selectedItem.IdentifierType}
                </Text>

                <Text>
                  {" "}
                  Número de Identificación: {selectedItem.IdentifierNumber}
                </Text>

                <Text>Nombre: {selectedItem.Name}</Text>

                <Text>Correo Electrónico: {selectedItem.EmailAddress}</Text>

                <Text>State: {selectedItem.State}</Text>
              </>
            )}

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
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
    backgroundColor: "#fff",
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
  },
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
export default Proveedores;
