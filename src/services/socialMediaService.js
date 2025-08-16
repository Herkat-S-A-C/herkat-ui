// src/services/socialMediaService.js
import axios from "axios";

// ✅ URL base de la API
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/social-media";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

/**
 * 📌 Actualiza una red social por tipo.
 * @param {string} type - Tipo de red social (ej. 'facebook', 'instagram', etc.)
 * @param {Object} data - Datos a actualizar, por ejemplo { url: 'https://...' }
 */
export const updateSocialMedia = async (type, data) => {
  try {
    const { data: updated } = await api.put(`/${type}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return updated;
  } catch (error) {
    handleError(error, `Error al actualizar red social ${type}:`);
  }
};

/**
 * 📌 Obtiene todas las redes sociales.
 * @returns {Promise<Array>} Lista de redes sociales.
 */
export const getSocialMedia = async () => {
  try {
    const { data } = await api.get("");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener las redes sociales:");
  }
};
