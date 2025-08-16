// src/services/bannerServices.js
import axios from "axios";

// ✅ URL base de la API
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/banners";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los banners
export const getAllBanners = async () => {
  try {
    const { data } = await api.get("");
    return data;
  } catch (error) {
    handleError(error, "❌ Error al obtener los banners:");
  }
};

// 📌 Obtener banner por ID
export const getBannerById = async (id) => {
  try {
    const { data } = await api.get(`/id/${id}`);
    return data;
  } catch (error) {
    handleError(error, `❌ Error al obtener el banner con ID ${id}:`);
  }
};

// 📌 Obtener banner por nombre
export const getBannerByName = async (name) => {
  try {
    const { data } = await api.get(`/name/${encodeURIComponent(name)}`);
    return data;
  } catch (error) {
    handleError(error, `❌ Error al obtener el banner con nombre ${name}:`);
  }
};

// 📌 Crear un nuevo banner (con imagen)
export const createBanner = async (formData) => {
  try {
    const { data } = await api.post("", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "❌ Error al crear el banner:");
  }
};

// 📌 Actualizar un banner por ID (con imagen)
export const updateBanner = async (id, formData) => {
  try {
    const { data } = await api.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `❌ Error al actualizar el banner con ID ${id}:`);
  }
};

// 📌 Eliminar un banner
export const deleteBanner = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error, `❌ Error al eliminar el banner con ID ${id}:`);
  }
};
