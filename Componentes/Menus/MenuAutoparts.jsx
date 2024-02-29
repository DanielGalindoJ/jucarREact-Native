import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, ScrollView, Modal, Image, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import Logo from "../../assets/imgs/jucar.jpg";

const MenuAutoparts = ({ navigation }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubcategoryClick = (subcategoryId) => {
    navigation.navigate("Autoparts", { subcategoryId });
  };

  return (
    <ScrollView>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Subcategories</Text>
        {subcategories.map((subcategory) => (
          <Card key={subcategory.subcategoryId} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Ver detalle de:</Text>
              <Text style={styles.cardText}>{subcategory.name}</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button
                mode="contained"
                color="green"
                onPress={() =>
                  handleSubcategoryClick(subcategory.subcategoryId)
                }
              >
                Ver
              </Button>
            </Card.Actions>
            {/* <Button
            title={subcategory.name}
            onPress={() => handleSubcategoryClick(subcategory.subcategoryId)}
          /> */}
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
});
export default MenuAutoparts;
