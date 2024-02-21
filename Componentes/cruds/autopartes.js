const API_URL = "https://localhost:7028/api/autoparts";

// Resto del código de las funciones..

// Función para crear una nueva categoría
export async function crearAutoparte(nuevaAutoparte) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaAutoparte),
    });
    const data = await response.json();
    console.log("Autoparte creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear la Autoparte:", error);
    throw error;
  }
}

// Función para obtener todas las categorías
export async function obtenerAutoaprte() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Autoparte obtenidas:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener la Autoparte:", error);
    throw error;
  }
}

// Función para actualizar una categoría existente
export async function actualizarAutoparte(idAutoparte, AutoparteActualizada) {
  try {
    const response = await fetch(`${API_URL}/${idAutoparte}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AutoparteActualizada),
    });
    const data = await response.json();
    console.log("Autoparte actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar la Autoparte:", error);
    throw error;
  }
}

// Función para eliminar una categoría existente
export async function eliminarAutoparte(idAutoparte) {
  try {
    const response = await fetch(`${API_URL}/${idAutoparte}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Autoparte eliminada:", data);
    return data;
  } catch (error) {
    console.error("Error al eliminar la Autoparte:", error);
    throw error;
  }
}
