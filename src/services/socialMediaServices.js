// src/services/socialMediaService.js
import axios from "axios";

// ✅ URL base de la API
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/social-media";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

export const updateSocialMedia = async (type, data) => {
  try {
    const { data: updated } = await api.put(`/update/${type}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return updated;
  } catch (error) {
    handleError(error, `Error al actualizar red social ${type}:`);
  }
};

export const getSocialMedia = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener las redes sociales:");
  }
};
