import axios from "axios";

// ✅ URL base de la API V2 para Tipos de Productos
// Corrección: Cambiado a 'product-types' (singular) para coincidir con la convención de 'machine-types'
// y evitar el error 500 del servidor.
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/product-types";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los tipos de productos
// Endpoint: /all
export const getAllProductTypes = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener todos los tipos de productos:");
  }
};

// 📌 Obtener detalle de un tipo de producto por ID
// Endpoint: /{id}/details
export const getProductTypeById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener el tipo de producto con ID ${id}:`);
  }
};

// 📌 Crear un nuevo tipo de producto
// Endpoint: /new
export const createProductType = async (productTypeData) => {
  try {
    // Se asume envío en formato JSON para tipos
    const { data } = await api.post("/new", productTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear un nuevo tipo de producto:");
  }
};

// 📌 Actualizar un tipo de producto por ID
// Endpoint: /update/{id}
export const updateProductType = async (id, productTypeData) => {
  try {
    const { data } = await api.put(`/update/${id}`, productTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar el tipo de producto con ID ${id}:`);
  }
};

// 📌 Eliminar un tipo de producto por ID
// Endpoint: /delete/{id}
export const deleteProductType = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar el tipo de producto con ID ${id}:`);
  }
};