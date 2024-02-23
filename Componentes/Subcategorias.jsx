import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import {
  Headline,
  Text,
  Subheading,
  Button,
  FAB,
  Divider,
  Image,
} from "react-native-paper";
import globalStyles from "./styles/global";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const Subcategorias = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/categories/${categoryId}/subcategories`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleCreateSubcategory = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/categories/${categoryId}/subcategories`,
        {
          name: newSubcategoryName,
        }
      );

      setSubcategories([response.data, ...subcategories]);
      setNewSubcategoryName("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  const handleUpdateSubcategory = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/categories/${categoryId}/subcategories/${selectedSubcategoryId}`,
        {
          name: newSubcategoryName,
        }
      );

      const updatedSubcategories = subcategories.map((subcategory) =>
        subcategory.subcategoryId === selectedSubcategoryId
          ? { ...subcategory, name: newSubcategoryName }
          : subcategory
      );

      setSubcategories(updatedSubcategories);
      setNewSubcategoryName("");
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/categories/${categoryId}/subcategories/${subcategoryId}`
      );

      const updatedSubcategories = subcategories.filter(
        (subcategory) => subcategory.subcategoryId !== subcategoryId
      );
      setSubcategories(updatedSubcategories);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <Text style={styles.title}>Lista de SubCategorías</Text>
      <FlatList
        data={subcategories}
        renderItem={(
          { item } // Cambio aquí: Usa 'item' en lugar de 'categories' y 'categoryId'
        ) => (
          <View style={styles.item} key={item.subcategoryId}>
            <Text style={styles.texto}>
              Nombre: <Subheading>{item.name}</Subheading>{" "}
            </Text>

            <FAB
              style={globalStyles.fab}
              icon="delete"
              title="Eliminar"
              onPress={() => handleDeleteSubcategory(item.subcategoryId)} // Cambio aquí: Usa 'item.categoryId'
            />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newSubcategoryName}
        onChangeText={setNewSubcategoryName}
        placeholder="Nombre de nueva categoría"
      />
      <Button title="Crear Categoría" onPress={handleCreateSubcategory} />
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

export default Subcategorias;
