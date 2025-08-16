// src/services/servicesServices.js
import axios from "axios";

// ✅ URL base de la API
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/service-items";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los servicios
export const getAllServices = async () => {
  try {
    // ❗ Sin "/" final, para que quede exactamente /api/v1/service-items
    const { data } = await api.get("");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener los servicios:");
  }
};

// 📌 Obtener servicio por ID
export const getServiceById = async (id) => {
  try {
    const { data } = await api.get(`/id/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener servicio con ID ${id}:`);
  }
};

// 📌 Obtener servicio por nombre
export const getServiceByName = async (name) => {
  try {
    const { data } = await api.get(`/name/${encodeURIComponent(name)}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener servicio con nombre ${name}:`);
  }
};

// 📌 Crear un nuevo servicio (admin)
export const createService = async (formData) => {
  try {
    const { data } = await api.post("", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear servicio:");
  }
};

// 📌 Actualizar un servicio por ID (admin)
export const updateService = async (id, formData) => {
  try {
    const { data } = await api.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar servicio con ID ${id}:`);
  }
};

// 📌 Eliminar un servicio (admin)
export const deleteService = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar servicio con ID ${id}:`);
  }
};
