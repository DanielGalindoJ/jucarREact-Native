import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
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
            <Divider />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCategoryClick(category.categoryId)}
              >
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdate(category)}
              >
                <Text style={styles.buttonText}>Actulizar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDelete(category.categoryId)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
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
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  titleLogo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
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
});

export default MenuSubcategories;
