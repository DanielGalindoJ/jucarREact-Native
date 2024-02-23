// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   View,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Pressable,
//   Image,
//   FlatList,
//   TextInput,
// } from "react-native";
// import {
//   Headline,
//   Text,
//   Subheading,
//   Button,
//   FAB,
//   Divider,
// } from "react-native-paper";
// //import { Text } from "react-native-paper";
// import agregarUsu from "../assets/imgs/agregarUsuario.png";
// import ajustes from "../assets/imgs/ajustes.png";
// import { DataTable } from "react-native-paper";
// import axios from "axios";

// import Logo from "../assets/imgs/jucar.jpg";
// import globalStyles from "./styles/global";

// const AllAutoparts = () => {
//   // const [autopartes, setAutopartes] = useState([]);
//   // const [nuevoAutoparte, setNuevaAutoparte] = useState("");
//   // const [AutoparteEditada, setAutoparteEditada] = useState("");
//   // const [AutoparteEliminada, setAutoparteEliminada] = useState("");

//   // useEffect(() => {
//   //   obtenerAutoparteAPI();
//   // }, [AutoparteEditada, AutoparteEliminada]);

//   // const obtenerAutoparteAPI = async () => {
//   //   try {
//   //     const autopartesObtenidas = await obtenerAutoaprte();
//   //     setAutopartes(autopartesObtenidas);
//   //   } catch (error) {
//   //     console.error("Error al obtener las Autoparte:", error);
//   //   }
//   // };

//   // const handleCrearAutoparte = async () => {
//   //   try {
//   //     await crearAutoparte({ nombre: nuevoAutoparte });
//   //     setNuevaAutoparte("");
//   //     obtenerAutoparteAPI();
//   //   } catch (error) {
//   //     console.error("Error al crear la categoría:", error);
//   //   }
//   // };

//   // const handleActualizarAutoparte = async (id, nuevaInfo) => {
//   //   try {
//   //     await actualizarAutoparte(id, nuevaInfo);
//   //     setAutoparteEditada(id);
//   //   } catch (error) {
//   //     console.error("Error al actualizar la categoría:", error);
//   //   }
//   // };

//   // const handleEliminarAutoparte = async (id) => {
//   //   try {
//   //     await eliminarAutoparte(id);
//   //     setAutoparteEliminada(id);
//   //   } catch (error) {
//   //     console.error("Error al eliminar la categoría:", error);
//   //   }
//   // };

//   return (
//     <View style={styles.contenedor}>
//       <View style={styles.navbar}>
//         <Image source={Logo} style={styles.logo} />

//         <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
//       </View>
//       <Headline style={globalStyles.titulo}>
//         {" "}
//         {autopartes.length > 0 ? "Clientes" : "Aún no hay Clientes"}{" "}
//       </Headline>

//       <FlatList
//         data={autopartes}
//         renderItem={({ item, index }) => (
//           <View style={styles.item} key={index}>
//             <Headline style={globalStyles.titulo}></Headline>
//             <Divider />
//             <Text style={styles.texto}>
//               Nombre: <Subheading>{item.name}</Subheading>{" "}
//             </Text>

//             <Text style={styles.texto}>
//               Inventario: <Subheading>{item.inventory}</Subheading>{" "}
//             </Text>

//             <Text style={styles.texto}>
//               Valor: <Subheading>{item.value}</Subheading>{" "}
//             </Text>

//             {/* <Text style={styles.text}>{item.name}</Text>
//             <Text style={styles.text}>{item.inventory}</Text>
//             <Text style={styles.text}>{item.value}</Text> */}

//             {/* <Button
//               title="Editar"
//               onPress={() =>
//                 handleActualizarAutoparte(item.id, { nombre: "Nuevo nombre" })
//               }
//             />
//             <Button
//               title="Eliminar"
//               onPress={() => handleEliminarAutoparte(item.id)}
//             /> */}
//             <FAB
//               icon="delete"
//               style={globalStyles.fab}
//               onPress={() =>
//                 navigation.navigate("NuevoCliente", { guardarConsultarAPI })
//               }
//             />
//             <Divider />
//             <TextInput
//               style={styles.input}
//               value={newCategoryName}
//               onChangeText={setNewCategoryName}
//               placeholder="Nombre de nueva categoría"
//             />
//             <Button title="Crear Categoría" onPress={handleCrearAutoparte} />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5DC",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingTop: "5%",
//   },
//   scrollContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   dataTable: {
//     marginTop: 16,
//   },
//   navbar: {
//     backgroundColor: "#f80759",
//     color: "#fff",
//     borderColor: "#03a9f4",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "flex-start",
//     padding: 30,
//     fontWeight: 500,

//     marginTop: 1,
//   },
//   logo: {
//     width: 107,
//     height: 57,
//     resizeMode: "contain",
//     marginLeft: 50,
//   },
//   title: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//     marginLeft: 128,
//     marginRight: -21,
//     marginBottom: -19,
//     width: 269.906,
//     height: 68,
//   },
//   //table ->
//   container: {
//     padding: 16,
//     backgroundColor: "#F5F5F5",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: "#CCCCCC",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#EEEEEE",
//     padding: 8,
//   },
//   headerText: {
//     flex: 1,
//     fontWeight: "bold",
//   },
//   row: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#CCCCCC",
//     padding: 8,
//   },
//   cell: {
//     flex: 1,
//     borderRightWidth: 1,
//     borderRightColor: "#CCCCCC",
//     paddingHorizontal: 8,
//   },
//   //table <-

//   //botonesCrud
//   tab: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "flex-start",
//     flexDirection: "row",
//   },
//   tabIcon: {
//     // Adjust image dimensions as needed
//     width: 30,
//     height: 30,
//   },
//   //botonesCrud

//   texto: {
//     marginBottom: 20,
//     fontSize: 18,
//   },
//   boton: {
//     marginTop: 100,
//     backgroundColor: "red",
//   },
// });

// export default AllAutoparts;
