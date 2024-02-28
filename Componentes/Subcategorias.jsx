import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Image } from "react-native";
import {
  Headline,
  Text,
  Subheading,
  Button,
  FAB,
  Divider,
  Card,
} from "react-native-paper";
import globalStyles from "./styles/global";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { ScrollView } from "react-native-gesture-handler";

const Subcategories = ({ route }) => {
  const { categoryId } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");

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
    <>
      <ScrollView>
        <View style={styles.cardTotal}>
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>

          <Text style={styles.title}>Modulo de Subcategorias</Text>
          <FlatList
            data={subcategories}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <View style={styles.item} key={item.categoryId}>
                  <Card.Content>
                    <Text style={styles.cardText}>{item.name}</Text>
                  </Card.Content>
                  <Card.Actions style={styles.cardActions}>
                    <Button
                      style={styles.botones}
                      mode="contained"
                      onPress={() =>
                        handleDeleteSubcategory(item.subcategoryId)
                      }
                    >
                      Eliminar
                    </Button>
                  </Card.Actions>
                </View>
              </Card>
            )}
          />
          <TextInput
            style={styles.input}
            value={newSubcategoryName}
            onChangeText={setNewSubcategoryName}
            placeholder="Nombre de nueva categoría"
          />
          <Button mode="contained" onPress={handleCreateSubcategory}>
            Crear SubCategoría
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
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
  titleLogo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardText: {
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  botones: {
    color: "red",
  },
});

export default Subcategories;
