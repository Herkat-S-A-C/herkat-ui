// src/services/bannerServices.js
import axios from "axios";

const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/banners";

// Listar todos los banners
export const getAllBanners = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los banners:", error);
    throw error;
  }
};

// Obtener detalle de un banner por ID
export const getBannerById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el banner con ID ${id}:`, error);
    throw error;
  }
};

// Obtener detalle de un banner por nombre
export const getBannerByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el banner con nombre ${name}:`, error);
    throw error;
  }
};

// Crear un nuevo banner (admin)
export const createBanner = async (bannerData) => {
  try {
    const response = await axios.post(API_BASE_URL, bannerData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el banner:", error);
    throw error;
  }
};

// Actualizar un banner (admin)
export const updateBanner = async (id, bannerData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, bannerData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el banner con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un banner (admin)
export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el banner con ID ${id}:`, error);
    throw error;
  }
};
