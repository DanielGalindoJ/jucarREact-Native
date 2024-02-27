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
//import { useRoute } from "@react-navigation/native";

const Subcategorias = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  // const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/categories/${categoryId}/subcategories`
        );
        setSubcategories(response.data);
        console.log(fetchData());
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
      <>
        <Text style={styles.title}>Modulo de Subcategorias</Text>
        <FlatList
          data={subcategories}
          renderItem={({ item }) => (
            <View style={styles.item} key={item.categoryId}>
              <Text style={styles.texto}>
                Nombre: <Subheading>{item.name}</Subheading>
              </Text>

              <FAB
                style={globalStyles.fab}
                icon="delete"
                title="Eliminar"
                onPress={() => handleDeleteSubcategory(item.categoryId)} // Cambio aquí: Usa 'item.categoryId'
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
      </>
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
    color: "black",
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
