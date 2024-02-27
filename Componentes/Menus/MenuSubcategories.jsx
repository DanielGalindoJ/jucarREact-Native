import React, { useState, useEffect } from "react";

import axios from "axios";
import { Button } from "react-native-paper";

import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { View } from "react-native-web";

const MenuSubcategories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

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

  const handleCategoryClick = (categoryId) => {
    navigation.navigate("Subcategorias", { categoryId });
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Categorías</Text>
      {categories.map((category) => (
        <View key={category.categoryId} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Ver Subcategorías de:</Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>{category.name}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => handleCategoryClick(category.categoryId)}
            >
              <Button style={styles.button} mode="contained" color="green">
                Ver
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: "#333", // Gris oscuro
    padding: 20,
    flexDirection: "row", // Utiliza flexbox en fila
    flexWrap: "wrap",
    justifyContent: "center", // Centra las cartas si no llenan una fila completa
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 20, // Asegura un poco de espacio entre el título y las cartas
  },
  card: {
    backgroundColor: "red", // Fondo rojo
    color: "white", // Texto blanco
    fontWeight: "bold", // Texto en negrilla
    width: 250, // Ancho fijo
    marginBottom: 20, // Espacio debajo de cada carta
  },
  btnSuccess: {
    backgroundColor: "#28a745", // Opcional: personaliza el color del botón si es necesario
  },
});

export default MenuSubcategories;
