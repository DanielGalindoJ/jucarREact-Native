import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Button,
  Platform,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { Divider, Card, Text } from "react-native-paper";
// import RNHTMLtoPDF from "react-native-html-to-pdf";
// import RNFS from "react-native-fs";

const AllProveedores = () => {
  const [providers, setProviders] = useState([]);
  //   const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/providers`
        );
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Tipo de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierType}</Text>

        <Text style={styles.cardTitle}>Numero de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierNumber}</Text>

        <Text style={styles.cardTitle}>Nombre : </Text>
        <Text style={styles.cardText}>{item.name}</Text>

        <Text style={styles.cardTitle}>Correo electronico: </Text>
        <Text style={styles.cardText}>{item.emailAddress}</Text>

        <Text style={styles.cardTitle}>Tipo de Producto: </Text>
        <Text style={styles.cardText}>{item.productType}</Text>
        <Divider />
      </Card.Content>
    </Card>
  );

  //   const generatePdf = async () => {
  //     let htmlContent = "";
  //     providers.forEach((provider) => {
  //       htmlContent += `
  //         <div>
  //           <h2>${provider.Name}</h2>
  //           <p><strong>Tipo de Identificacion:</strong> ${provider.IdentifierType}</p>
  //           <p><strong>Numero de Identificacion:</strong> ${provider.IdentifierNumber}</p>
  //           <p><strong>Correo electronico:</strong> ${provider.EmailAddress}</p>
  //           <p><strong>Tipo de Producto:</strong> ${provider.ProductType}</p>
  //           <p><strong>Estado:</strong> ${provider.State}</p>
  //           <hr />
  //         </div>
  //       `;
  //     });

  //     const options = {
  //       html: htmlContent,
  //       fileName: "proveedores.pdf",
  //       directory: "Documents",
  //     };

  //     const pdf = await RNHTMLtoPDF.convert(options);
  //     setPdfUri(pdf.filePath);
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Proveedores Actuales</Text>
        <FlatList
          data={providers}
          renderItem={renderItem}
          keyExtractor={(item) => item.providerID.toString()}
        />
        {/* <Button title="Generar PDF" onPress={generatePdf} />
        {pdfUri && <Text>PDF generado: {pdfUri}</Text>} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTotal: {
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
});

export default AllProveedores;
