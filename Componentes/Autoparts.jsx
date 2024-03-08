import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Picker,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const Autoparts = ({ route }) => {
  const { subcategoryId } = route.params;
  const [autoparts, setAutoparts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [newAutopart, setNewAutopart] = useState({
    Name: "",
    Description: "",
    Inventory: "",
    Value: "",
    RawMaterialId: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAutopartId, setSelectedAutopartId] = useState("");

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`
        );
        setAutoparts(response.data);
      } catch (error) {
        console.error("Error fetching autoparts:", error);
      }
    };

    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/rawMaterials`
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchAutoparts();
    fetchRawMaterials();
  }, [subcategoryId]);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleCreateAutopart = async () => {
    try {
      // Validación de campos obligatorios y tipos de datos
      if (
        !newAutopart.Name ||
        !newAutopart.Description ||
        !newAutopart.Inventory ||
        !newAutopart.Value ||
        !newAutopart.RawMaterialId ||
        typeof newAutopart.Inventory !== "number" ||
        typeof newAutopart.Value !== "number"
      ) {
        console.error("Por favor complete todos los campos correctamente.");
        return;
      }

      const response = await axios.post(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`,
        newAutopart
      );

      setAutoparts([response.data, ...autoparts]);

      setNewAutopart({
        Name: "",
        Description: "",
        Inventory: "",
        Value: "",
        RawMaterialId: "",
      });

      handleCloseModal(); // Cierra el modal después de crear una autoparte exitosamente
    } catch (error) {
      console.error("Error creating autopart:", error);
    }
  };

  const handleUpdateAutopart = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts/${selectedAutopartId}`,
        newAutopart
      );

      const response = await axios.get(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`
      );

      const updatedAutoparts = response.data;

      setAutoparts(updatedAutoparts);

      handleCloseModal(); // Cierra el modal después de actualizar una autoparte exitosamente
    } catch (error) {
      console.error("Error updating autopart:", error);
    }
  };

  const handleDeleteAutopart = async (autopartId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts/${autopartId}`
      );

      const updatedAutoparts = autoparts.filter(
        (autopart) => autopart.autopartID !== autopartId
      );
      setAutoparts(updatedAutoparts);

      handleCloseModal(); // Cierra el modal después de eliminar una autoparte exitosamente
    } catch (error) {
      console.error("Error deleting autopart:", error);
    }
  };

  const handleShowCreateModal = () => {
    setNewAutopart({
      Name: "",
      Description: "",
      Inventory: "",
      Value: "",
      RawMaterialId: "",
    });
    setShowCreateModal(true);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>Nombre: {item.name}</Text>
      <Text>Descripción: {item.description}</Text>
      <Text>Inventario: {item.inventory}</Text>
      <Text>Valor: {item.value}</Text>
      <Button
        onPress={() => {
          setSelectedAutopartId(item.autopartID);
          setNewAutopart({
            Name: item.name,
            Description: item.description,
            Inventory: item.inventory,
            Value: item.value,
            RawMaterialId: item.rawMaterialId,
          });
          setShowEditModal(true);
        }}
        title="Actualizar"
      />
      <Button
        onPress={() => handleDeleteAutopart(item.autopartID)}
        title="Eliminar"
      />
    </View>
  );

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Autoparte</Text>
        <FlatList
          data={autoparts}
          renderItem={renderItem}
          keyExtractor={(item) => item.autopartID.toString()}
        />
      </View>

      {/* Modal para crear autopartes */}
      <Modal visible={showCreateModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Crear Autoparte</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Autoparte"
            value={newAutopart.Name}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción del Autoparte"
            value={newAutopart.Description}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese la cantidad de Autoparte en el inventario"
            keyboardType="numeric"
            value={newAutopart.Inventory.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Inventory: parseInt(text) })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el valor del Autoparte"
            keyboardType="numeric"
            value={newAutopart.Value.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Value: parseInt(text) })
            }
          />
          <Picker
            selectedValue={newAutopart.RawMaterialId}
            style={styles.input}
            onValueChange={(itemValue) =>
              setNewAutopart({ ...newAutopart, RawMaterialId: itemValue })
            }
          >
            <Picker.Item label="Seleccionar Materia Prima" value="" />
            {rawMaterials.map((material) => (
              <Picker.Item
                key={material.rawMaterialId}
                label={material.name}
                value={material.rawMaterialId}
              />
            ))}
          </Picker>
          <Button onPress={handleCreateAutopart} title="Crear" />
          <Button onPress={() => setShowCreateModal(false)} title="Cancelar" />
        </View>
      </Modal>

      {/* Modal para actualizar autopartes */}
      <Modal visible={showEditModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Actualizar Autoparte</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={newAutopart.Name}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={newAutopart.Description}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el valor"
            keyboardType="numeric"
            value={newAutopart.Value.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Value: parseInt(text) })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese la cantidad del inventario"
            keyboardType="numeric"
            value={newAutopart.Inventory.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Inventory: parseInt(text) })
            }
          />
          <Picker
            selectedValue={newAutopart.RawMaterialId}
            style={styles.input}
            onValueChange={(itemValue) =>
              setNewAutopart({ ...newAutopart, RawMaterialId: itemValue })
            }
          >
            <Picker.Item label="Seleccionar Materia Prima" value="" />
            {rawMaterials.map((material) => (
              <Picker.Item
                key={material.rawMaterialId}
                label={material.name}
                value={material.rawMaterialId}
              />
            ))}
          </Picker>
          <Button onPress={handleUpdateAutopart} title="Actualizar" />
          <Button onPress={() => setShowEditModal(false)} title="Cancelar" />
        </View>
      </Modal>

      {/* Modal para eliminar autopartes */}
      <Modal visible={showDeleteModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Eliminar Autoparte</Text>
          {/* Contenido del modal para eliminar autopartes */}
          <Button onPress={handleDeleteAutopart} title="Eliminar" />
          <Button onPress={() => setShowDeleteModal(false)} title="Cancelar" />
        </View>
      </Modal>

      <Button onPress={handleShowCreateModal} title="Crear Autoparte" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "80%",
  },
  inputButtones: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Autoparts;
