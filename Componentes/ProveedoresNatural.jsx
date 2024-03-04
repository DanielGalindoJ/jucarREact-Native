import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { Divider, Card, Text } from "react-native-paper";

const ProveedoresNatural = () => {
  const [providers, setProviders] = useState([]);
  const [newProvider, setNewProvider] = useState({
    identifierType: "",
    identifierNumber: "",
    name: "",
    emailAddress: "",
    productType: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`https://localhost:7028/api/providers`);
      setProviders(response.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Tipo de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierType}</Text>

        <Text style={styles.cardTitle}>Numero de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierNumber}</Text>

        <Text style={styles.cardTitle}>Nombre : </Text>
        <Text style={styles.cardText}>{item.name}</Text>

        <Text style={styles.cardTitle}>Correo electronico: </Text>
        <Text style={styles.cardText}>{item.emailAddress}</Text>

        <Text style={styles.cardTitle}>Tipo de Producto: </Text>
        <Text style={styles.cardText}>{item.productType}</Text>

        <Divider />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdateProvider(item)}
          >
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDeleteProvider(item.providerID)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleInputChange = (key, value) => {
    setNewProvider({
      ...newProvider,
      [key]: value,
    });
  };

  const handleCreateProvider = async () => {
    try {
      await axios.post(`https://localhost:7028/api/providers`, newProvider);
      fetchProviders();
      setIsModalVisible(false);
      setNewProvider({
        identifierType: "",
        identifierNumber: "",
        name: "",
        emailAddress: "",
        productType: "",
      });
    } catch (error) {
      console.error("Error creating provider:", error);
    }
  };

  const handleDeleteProvider = async (id) => {
    try {
      await axios.delete(`https://localhost:7028/api/providers/${id}`);
      fetchProviders();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  const handleUpdateProvider = (provider) => {
    setSelectedProvider(provider);
    setNewProvider(provider); // Set current provider data in the form fields
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/providers/${selectedProvider.providerID}`,
        newProvider
      );
      fetchProviders();
      setIsModalVisible(false);
      setNewProvider({
        identifierType: "",
        identifierNumber: "",
        name: "",
        emailAddress: "",
        productType: "",
      });
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Proveedores Actuales</Text>
        <FlatList
          data={providers}
          renderItem={renderItem}
          keyExtractor={(item) => item.providerID.toString()}
        />
        <Button title="Agregar Proveedor" onPress={toggleModal} />
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Identificacion"
              value={newProvider.identifierType}
              onChangeText={(text) => handleInputChange("identifierType", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Numero de Identificacion"
              value={newProvider.identifierNumber}
              onChangeText={(text) =>
                handleInputChange("identifierNumber", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newProvider.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={newProvider.emailAddress}
              onChangeText={(text) => handleInputChange("emailAddress", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Producto"
              value={newProvider.productType}
              onChangeText={(text) => handleInputChange("productType", text)}
            />
            <Button title="Guardar" onPress={handleUpdate} />
            <Button title="Cancelar" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  titleLogo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardText: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProveedoresNatural;
