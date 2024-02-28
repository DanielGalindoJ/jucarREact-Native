import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, ScrollView, Modal, Image, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import Logo from "../../assets/imgs/jucar.jpg";

const MenuSubcategories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7028/api/categories/${categoryId}`);
      setCategories(categories.filter((cat) => cat.categoryId !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Categorías</Text>
        {categories.map((category) => (
          <Card key={category.categoryId} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Ver Subcategorías de:</Text>
              <Text style={styles.cardText}>{category.name}</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="contained"
                color="green"
                onPress={() => handleCategoryClick(category.categoryId)}
              >
                Ver
              </Button>
              <Button mode="contained" onPress={() => handleUpdate(category)}>
                Actualizar
              </Button>
              <Button
                mode="contained"
                color="red"
                onPress={() => handleDelete(category.categoryId)}
              >
                Eliminar
              </Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Modal para actualizar categoría */}
        <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Categoría</Text>
            {/* Aquí va el contenido del modal para actualizar */}
            <Button onPress={() => setShowModal(false)}>Cerrar</Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  cardActions: {
    justifyContent: "space-around",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
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
});

export default MenuSubcategories;
