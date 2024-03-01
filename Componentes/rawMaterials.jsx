import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Modal } from "react-native";
import {
  Text,
  Subheading,
  Button,
  FAB,
  Portal,
  Provider,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { Image } from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const rawMaterials = () => {
  const [rawMaterials, setrawMaterials] = useState([]);
  const [newrawMaterialsName, setrawMaterialsName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedrawMaterialsId, setSelectedrawMaterialsId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/rawMaterials"
        );
        setrawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreaterawMaterials = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/rawMaterials",
        {
          name: newrawMaterialsName,
        }
      );

      setrawMaterials([response.data, ...categories]);
      setrawMaterialsName("");
    } catch (error) {
      console.error("Error creating rawMaterials:", error);
    }
  };

  const handleDeleterawMaterials = async (rawMaterialsId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/rawMaterials${rawMaterialsId}`
      );

      const updatedrawMaterials = rawMaterials.filter(
        (rawMaterial) => rawMaterial.rawMaterialsId !== rawMaterialsId
      );
      setrawMaterials(updatedrawMaterials);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting rawMaterials:", error);
    }
  };

  const handleUpdaterawMaterials = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/rawMaterials${setSelectedrawMaterialsId}`,
        {
          name: newrawMaterialsName,
        }
      );

      const updatedrawMaterials = rawMaterials.map((rawMaterial) =>
        rawMaterial.rawMaterialsId === selectedrawMaterialsId
          ? { ...rawMaterial, name: newrawMaterialsName }
          : rawMaterial
      );
      setrawMaterials(updatedrawMaterials);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating rawMaterials:", error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
          </View>
          <Text style={styles.title}>Lista de Materia Prima</Text>
          <FlatList
            data={rawMaterials}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>
                  Id: <Subheading>{item.rawMaterialId}</Subheading>{" "}
                </Text>
                <Text>
                  Nombre: <Subheading>{item.name}</Subheading>{" "}
                </Text>

                <Button
                  icon="pencil"
                  mode="contained"
                  onPress={() => {
                    handleUpdaterawMaterials(item.rawMaterialId);
                    setShowUpdateModal(true);
                  }}
                >
                  Actualizar
                </Button>

                <FAB
                  icon="delete"
                  onPress={() => {
                    setSelectedrawMaterialsId(item.rawMaterialId);
                    setShowDeleteModal(true);
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.rawMaterialId.toString()}
          />
          <TextInput
            style={styles.input}
            value={newrawMaterialsName}
            onChangeText={setrawMaterialsName}
            placeholder="Nombre de nueva Materia Prima"
          />
          <Button mode="contained" onPress={handleCreaterawMaterials}>
            Crear Materia Prima
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
            <Text style={styles.modalTitle}>Actualizar Materia Prima</Text>
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
          <Dialog.Title>Eliminar Materia Prima</Dialog.Title>
          <Dialog.Content>
            <Paragraph>¿Estás seguro de eliminar esta Materia Prima?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteModal(false)}>Cancelar</Button>
            <Button
              onPress={() => handleDeleteCategory(selectedrawMaterialsId)}
            >
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
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    Color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f80759",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default rawMaterials;
