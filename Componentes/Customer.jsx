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

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    identifierType: "",
    identifierNumber: "",
    name: "",
    emailAddress: "",
    customerAddresses: [
      {
        address: "",
        addressType: "",
        neighborhoodId: "",
      },
    ],
    customerPhone: [
      {
        phoneType: "",
        phoneNumber: "",
      },
    ],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/customers",
        newCustomer
      );
      setCustomers([response.data, ...customers]);
      setNewCustomer({
        identifierType: "",
        identifierNumber: "",
        name: "",
        emailAddress: "",
        customerAddresses: [
          {
            address: "",
            addressType: "",
            neighborhoodId: "",
          },
        ],
        customerPhone: [
          {
            phoneType: "",
            phoneNumber: "",
          },
        ],
      });
      toggleModal();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/customer/${selectedCustomer.customerID}`,
        newCustomer
      );
      fetchCustomers();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`https://localhost:7028/api/customer/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  const handleUpdate = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (selectedCustomer) {
      setNewCustomer(selectedCustomer);
    }
  }, [selectedCustomer]);

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

        <Divider />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdate(item)}
          >
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDeleteCustomer(item.customerID)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setNewCustomer({
        identifierType: "",
        identifierNumber: "",
        name: "",
        emailAddress: "",
        customerAddresses: [
          {
            address: "",
            addressType: "",
            neighborhoodId: "",
          },
        ],
        customerPhone: [
          {
            phoneType: "",
            phoneNumber: "",
          },
        ],
      });
    }
  };

  const handleInputChange = (key, value) => {
    setNewCustomer({
      ...newCustomer,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Clientes Actuales</Text>
        <FlatList
          data={customers}
          renderItem={renderItem}
          keyExtractor={(item) => item.customerID.toString()}
        />
        <Pressable title="Agregar Cliente" onPress={toggleModal} />
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Identificacion"
              value={newCustomer.identifierType}
              onChangeText={(text) => handleInputChange("identifierType", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Numero de Identificacion"
              value={newCustomer.identifierNumber}
              onChangeText={(text) =>
                handleInputChange("identifierNumber", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newCustomer.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={newCustomer.emailAddress}
              onChangeText={(text) => handleInputChange("emailAddress", text)}
            />
            <Button
              title={selectedCustomer ? "Actualizar" : "Guardar"}
              onPress={
                selectedCustomer ? handleUpdateCustomer : handleCreateCustomer
              }
            />
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

export default Customers;
