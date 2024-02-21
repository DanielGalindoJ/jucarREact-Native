// categorias.js

const API_URL = "https://localhost:7028/api/categories";

// Resto del código de las funciones..

// Función para crear una nueva categoría
export async function crearCategoria(nuevaCategoria) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaCategoria),
    });
    const data = await response.json();
    console.log("Categoría creada:", data);
    return data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
}

// Función para obtener todas las categorías
export async function obtenerCategorias() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Categorías obtenidas:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
}

// Función para actualizar una categoría existente
export async function actualizarCategoria(idCategoria, categoriaActualizada) {
  try {
    const response = await fetch(`${API_URL}/${idCategoria}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriaActualizada),
    });
    const data = await response.json();
    console.log("Categoría actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw error;
  }
}

// Función para eliminar una categoría existente
export async function eliminarCategoria(idCategoria) {
  try {
    const response = await fetch(`${API_URL}/${idCategoria}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Categoría eliminada:", data);
    return data;
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  }
}
