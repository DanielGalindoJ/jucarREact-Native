import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import agregarUsu from "../assets/imgs/agregarUsuario.png";
import ajustes from "../assets/imgs/ajustes.png";
import { DataTable } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const AllAutoparts = () => {
  const [autopartes, setAutopartes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://localhost:7028/api/autoparts");
      setAutopartes(response.data);
    };
    fetchData();
  }, []);

  const onPressItem = (autoparte) => {
    navigation.navigate("PantallaFormulario", { autoparte });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />

        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <FlatList
        data={autopartes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
  // const [items, setItems] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [error, setError] = useState(null);
  // const [autoparts, setAutopart] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://localhost:7028/api/autoparts");

  //       if (response.ok) {
  //         const data = await response.json();
  //         setAutopart(data);
  //       } else {
  //         console.error("Error en la solicitud a la API");
  //       }
  //     } catch (error) {
  //       console.error("Error al realizar la solicitud a la API", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleItemPress = (item) => {
  //   setSelectedItem(item);

  //   setModalVisible(true);
  // };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.navbar}>
  //       <Image source={Logo} style={styles.logo} />

  //       <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
  //     </View>
  //     <Text style={styles.header}>Autopartes</Text>

  //     <ScrollView style={styles.container}>
  //       {/*botones crud */}
  //       <View style={styles.tab}>
  //         <TouchableOpacity onPress={() => navigation.navigate("AllAutoparts")}>
  //           <Image source={agregarUsu} style={styles.tabIcon} />
  //         </TouchableOpacity>

  //         <TouchableOpacity onPress={() => navigation.navigate("AllAutoparts")}>
  //           <Image source={ajustes} style={styles.tabIcon} />
  //         </TouchableOpacity>

  //         <TouchableOpacity onPress={() => navigation.navigate("AllAutoparts")}>
  //           <Image source={agregarUsu} style={styles.tabIcon} />
  //         </TouchableOpacity>

  //         <TouchableOpacity onPress={() => navigation.navigate("AllAutoparts")}>
  //           <Image source={agregarUsu} style={styles.tabIcon} />
  //         </TouchableOpacity>
  //       </View>

  //       <View style={styles.tableContainer}>
  //         <View style={styles.tableHeader}>
  //           <Text style={styles.headerText}>AutopartID</Text>
  //           <Text style={styles.headerText}>Nombre</Text>
  //           <Text style={styles.headerText}>Descripción</Text>
  //           <Text style={styles.headerText}>Inventario</Text>
  //           <Text style={styles.headerText}>Valor </Text>
  //           <Text style={styles.headerText}>Estado</Text>
  //         </View>

  //         {autoparts.map((autopart) => (
  //           <View key={autopart.AutopartID} style={styles.row}>
  //             <Text style={styles.cell}>{autopart.nombre}</Text>
  //             <Text style={styles.cell}>{usuario.descripcion}</Text>
  //             <Text style={styles.cell}>{usuario.Inventario}</Text>
  //             <Text style={styles.cell}>{usuario.Valor}</Text>
  //             <Text style={styles.cell}>{usuario.Estado}</Text>
  //           </View>
  //         ))}
  //       </View>
  //     </ScrollView>
  //      <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => setModalVisible(false)}
  //     >
  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <View
  //           style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
  //         >
  //           {selectedItem && (
  //             <>
  //               <Text>AutopartID: {selectedItem.AutopartID}</Text>

  //               <Text>Nombre: {selectedItem.name}</Text>

  //               <Text>Descripción: {selectedItem.Descripcion}</Text>

  //               <Text>Inventario: {selectedItem.Inventory}</Text>

  //               <Text>Valor: {selectedItem.value}</Text>

  //               <Text>Estado: {selectedItem.State}</Text>
  //             </>
  //           )}

  //           <Pressable onPress={() => setModalVisible(false)}>
  //             <Text style={{ color: "blue", marginTop: 10 }}>Cerrar</Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "5%",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dataTable: {
    marginTop: 16,
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
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 128,
    marginRight: -21,
    marginBottom: -19,
    width: 269.906,
    height: 68,
  },
  //table ->
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    padding: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    padding: 8,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC",
    paddingHorizontal: 8,
  },
  //table <-

  //botonesCrud
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  tabIcon: {
    // Adjust image dimensions as needed
    width: 30,
    height: 30,
  },
  //botonesCrud
});

export default AllAutoparts;
