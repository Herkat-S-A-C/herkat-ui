// src/services/productsService.js
import axios from "axios";

const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/products"; // <- usar proxy de Vite para evitar CORS

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    throw error;
  }
};

// Obtener producto por nombre
export const getProductByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto con nombre ${name}:`, error);
    throw error;
  }
};

// Crear un nuevo producto (requiere permisos de admin)
export const createProduct = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

// Actualizar un producto por ID
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    throw error;
  }
};
