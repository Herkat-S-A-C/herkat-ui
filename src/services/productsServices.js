import axios from "axios";

// ✅ CAMBIO 1: Nueva URL base (v2)
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/products";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los productos
export const getAllProducts = async () => {
  try {
    // ✅ CAMBIO: Ruta explícita "/all"
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener los productos:");
  }
};

// 📌 Obtener producto por ID
export const getProductById = async (id) => {
  try {
    // ✅ CAMBIO: Ruta explícita "/{id}/details"
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener producto con ID ${id}:`);
  }
};

// 📌 Crear un nuevo producto
export const createProduct = async (formData) => {
  try {
    // ✅ CAMBIO: Ruta explícita "/new"
    const { data } = await api.post("/new", formData, {
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
    // ✅ CAMBIO: Ruta explícita "/update/{id}"
    const { data } = await api.put(`/update/${id}`, formData, {
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
    // ✅ CAMBIO: Ruta explícita "/delete/{id}"
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar producto con ID ${id}:`);
  }
};