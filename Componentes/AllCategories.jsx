import React, { useEffect, useState } from "react";
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
import { Portal, Provider, Dialog, Paragraph } from "react-native-paper";
import { Divider, Card, Text } from "react-native-paper";

import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/categories",
        {
          name: newCategoryName,
        }
      );

      setCategories([response.data, ...categories]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7028/api/categories/${categoryId}`);

      const updatedCategories = categories.filter(
        (category) => category.categoryId !== categoryId
      );
      setCategories(updatedCategories);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/categories/${selectedCategoryId}`,
        {
          name: newCategoryName,
        }
      );

      const updatedCategories = categories.map((category) =>
        category.categoryId === selectedCategoryId
          ? { ...category, name: newCategoryName }
          : category
      );
      setCategories(updatedCategories);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Nombre : </Text>
        <Text style={styles.cardText}>{item.name}</Text>
        <Divider />
      </Card.Content>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
          </View>
          <Text style={styles.title}>Lista de Categorías</Text>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.categoryId.toString()}
          />
          <TextInput
            style={styles.input}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            placeholder="Nombre de nueva categoría"
          />
          <Button mode="contained" onPress={handleCreateCategory}>
            Crear Categoría
          </Button>
        </View>
      </View>

      {/* Modal para actualizar categoría */}
      <Portal>
        <Modal
          visible={showUpdateModal}
          onRequestClose={() => setShowUpdateModal(false)}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Categoría</Text>
            <TextInput
              style={styles.modalInput}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Nuevo nombre de categoría"
            />
            <Button mode="contained" onPress={handleUpdateCategory}>
              Actualizar
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Modal para eliminar categoría */}
      <Portal>
        <Dialog
          visible={showDeleteModal}
          onDismiss={() => setShowDeleteModal(false)}
        >
          <Dialog.Title>Eliminar Categoría</Dialog.Title>
          <Dialog.Content>
            <Paragraph>¿Estás seguro de eliminar esta categoría?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={styles.textDialog}
              onPress={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button onPress={() => handleDeleteCategory(selectedCategoryId)}>
              Eliminar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
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
    zIndex: 1,
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
    zIndex: 1,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    zIndex: 1,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  textDialog: {
    color: "white",
    fontSize: 10,
  },
});

export default AllCategories;
