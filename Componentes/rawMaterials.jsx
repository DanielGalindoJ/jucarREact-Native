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
  const [rawMaterials, setRawMaterials] = useState([]);
  const [newRawMaterial, setNewRawMaterial] = useState({
    Name: "",
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedrawMaterialsId, setSelectedrawMaterialsId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/rawMaterials"
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching rawMaterials:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateRawMaterial = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/rawMaterials",
        newRawMaterial
      );

      setRawMaterials([response.data, ...rawMaterials]);

      setNewRawMaterial({
        Name: "",
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error creating rawMaterial:", error);
    }
  };

  const handleDeleteRawMaterial = async (rawMaterialId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/rawMaterials/${rawMaterialId}`
      );

      const updatedRawMaterials = rawMaterials.filter(
        (rawMaterial) => rawMaterial.rawMaterialId !== rawMaterialId
      );

      setRawMaterials(updatedRawMaterials);
    } catch (error) {
      console.error("Error deleting rawMaterial:", error);
    }
  };

  const handelUpdateRawMaterial = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/rawMaterials/${selectedRawMaterialId}`,
        newRawMaterial
      );

      // Realiza una nueva solicitud para obtener la lista actualizada
      const response = await axios.get(
        "https://localhost:7028/api/rawMaterials"
      );

      const updatedRawMaterials = response.data;

      // Actualiza el estado con la nueva lista
      setRawMaterials(updatedRawMaterials);

      setNewRawMaterial({
        Name: "",
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error updating rawMaterial:", error);
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
            value={newRawMaterial}
            onChangeText={setNewRawMaterial}
            placeholder="Nombre de nueva Materia Prima"
          />
          <Button mode="contained" onPress={handleCreateRawMaterial}>
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
              value={newRawMaterial}
              onChangeText={setNewRawMaterial}
              placeholder="Nuevo nombre de categoría"
            />
            <Button mode="contained" onPress={handelUpdateRawMaterial}>
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
              onPress={() => handleDeleteRawMaterial(selectedrawMaterialsId)}
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
