// src/services/productsService.js
import axios from "axios";

// ✅ URL base de la API
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/products";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los productos
export const getAllProducts = async () => {
  try {
    // ❗ Aquí quitamos "/" para que sea exactamente /api/v1/products
    const { data } = await api.get("");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener los productos:");
  }
};

// 📌 Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/id/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener producto con ID ${id}:`);
  }
};

// 📌 Obtener producto por nombre
export const getProductByName = async (name) => {
  try {
    const { data } = await api.get(`/name/${encodeURIComponent(name)}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener producto con nombre ${name}:`);
  }
};

// 📌 Crear un nuevo producto
export const createProduct = async (formData) => {
  try {
    const { data } = await api.post("", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear producto:");
  }
};

// 📌 Actualizar un producto por ID
export const updateProduct = async (id, formData) => {
  try {
    const { data } = await api.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar producto con ID ${id}:`);
  }
};

// 📌 Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar producto con ID ${id}:`);
  }
};
