import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import {
  Headline,
  Text,
  Subheading,
  Button,
  FAB,
  Divider,
} from "react-native-paper";
import globalStyles from "./styles/global";
import axios from "axios";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

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

  // Función para crear una nueva categoría
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
  // Función para eliminar una  categoría

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7028/api/categories/${categoryId}`);

      const updatedCategories = categories.filter(
        (category) => category.categoryId !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  // Función para actualizar una  categoría

  const handleUpdateCategory = async (categoryId, newName) => {
    try {
      await axios.put(`https://localhost:7028/api/categories/${categoryId}`, {
        name: newName,
      });

      // Realiza una nueva solicitud para obtener la lista actualizada
      const response = await axios.get("https://localhost:7028/api/categories");

      const updatedCategories = response.data;

      // Actualiza el estado con la nueva lista
      setCategories(updatedCategories);

      setNewCategoryName({
        Name: "",
      });

      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating rawMaterial:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Categorías</Text>
      <FlatList
        data={categories}
        renderItem={(
          { item } // Cambio aquí: Usa 'item' en lugar de 'categories' y 'categoryId'
        ) => (
          <View style={styles.item} key={item.categoryId}>
            <Text style={styles.texto}>
              Nombre: <Subheading>{item.name}</Subheading>{" "}
            </Text>

            <FAB
              style={globalStyles.fab}
              icon="delete"
              title="Eliminar"
              onPress={() => handleDeleteCategory(item.categoryId)} // Cambio aquí: Usa 'item.categoryId'
            />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newCategoryName}
        onChangeText={setNewCategoryName}
        placeholder="Nombre de nueva categoría"
      />
      <Button title="Crear Categoría" onPress={handleCreateCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
  },
  input: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AllCategories;
