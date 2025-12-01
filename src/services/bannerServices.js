import axios from "axios";

// ✅ URL base de la API V2 para Banners
// Aseguramos que la URL sea la raíz exacta del recurso, sin duplicar "/api/v1"
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/banners";

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
// Endpoint resultante: https://herkat-v2-api.onrender.com/api/v1/banners/all
export const getAllBanners = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "❌ Error al obtener los banners:");
  }
};

// 📌 Obtener banner por ID
// Endpoint resultante: .../banners/{id}/details
export const getBannerById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `❌ Error al obtener el banner con ID ${id}:`);
  }
};

// 📌 Crear un nuevo banner (con imagen)
// Endpoint resultante: .../banners/new
export const createBanner = async (formData) => {
  try {
    const { data } = await api.post("/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "❌ Error al crear el banner:");
  }
};

// 📌 Actualizar un banner por ID (con imagen)
// Endpoint resultante: .../banners/update/{id}
export const updateBanner = async (id, formData) => {
  try {
    const { data } = await api.put(`/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `❌ Error al actualizar el banner con ID ${id}:`);
  }
};

// 📌 Eliminar un banner
// Endpoint resultante: .../banners/delete/{id}
export const deleteBanner = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `❌ Error al eliminar el banner con ID ${id}:`);
  }
};