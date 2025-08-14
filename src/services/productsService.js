// src/services/productsService.js
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/products";

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Error al obtener los productos");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${id}`);
    if (!response.ok) throw new Error(`Error al obtener el producto con ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener producto por nombre
export const getProductByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error(`Error al obtener el producto con nombre ${name}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Crear un nuevo producto (requiere permisos de admin)
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Error al crear el producto");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar un producto por ID (requiere permisos de admin)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error(`Error al actualizar el producto con ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un producto por ID (requiere permisos de admin)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Error al eliminar el producto con ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
