// src/services/typeProductsServices.js
import axios from "axios";

const BASE_URL = "https://herkat-api.onrender.com/api/v1/product-types";

// Obtener todos los tipos de producto
export const getAllProductTypes = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los tipos de producto:", error);
    throw error;
  }
};

// Obtener un tipo de producto por ID
export const getProductTypeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el tipo de producto con ID ${id}:`, error);
    throw error;
  }
};

// Obtener un tipo de producto por nombre
export const getProductTypeByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}?name=${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el tipo de producto con nombre ${name}:`, error);
    throw error;
  }
};

// Crear un nuevo tipo de producto
export const createProductType = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear un tipo de producto:", error);
    throw error;
  }
};

// Actualizar un tipo de producto por ID
export const updateProductType = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el tipo de producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un tipo de producto por ID
export const deleteProductType = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el tipo de producto con ID ${id}:`, error);
    throw error;
  }
};
