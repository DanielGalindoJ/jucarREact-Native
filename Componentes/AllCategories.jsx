import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} from "./cruds/categorias";

const AllCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");
  const [categoriaEliminada, setCategoriaEliminada] = useState("");

  useEffect(() => {
    obtenerCategoriasAPI();
  }, [categoriaEditada, categoriaEliminada]);

  const obtenerCategoriasAPI = async () => {
    try {
      const categoriasObtenidas = await obtenerCategorias();
      setCategorias(categoriasObtenidas);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleCrearCategoria = async () => {
    try {
      await crearCategoria({ nombre: nuevaCategoria });
      setNuevaCategoria("");
      obtenerCategoriasAPI();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  const handleActualizarCategoria = async (id, nuevaInfo) => {
    try {
      await actualizarCategoria(id, nuevaInfo);
      setCategoriaEditada(id);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await eliminarCategoria(id);
      setCategoriaEliminada(id);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Categorías</Text>
      <FlatList
        data={categorias}
        renderItem={({ item, index }) => (
          <View style={styles.item} key={index}>
            <Text style={styles.text}>{item.name}</Text>
            <Button
              title="Editar"
              onPress={() =>
                handleActualizarCategoria(item.id, { nombre: "Nuevo nombre" })
              }
            />
            <Button
              title="Eliminar"
              onPress={() => handleEliminarCategoria(item.id)}
            />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={nuevaCategoria}
        onChangeText={setNuevaCategoria}
        placeholder="Nombre de nueva categoría"
      />
      <Button title="Crear Categoría" onPress={handleCrearCategoria} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: "black",
  },
});

export default AllCategories;
