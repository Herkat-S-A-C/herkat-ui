import axios from "axios";

// ✅ URL base de la API V2 para Servicios
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/service-items";

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
// Endpoint: /all
export const getAllServices = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener los servicios:");
  }
};

// 📌 Obtener servicio por ID
// Endpoint: /{id}/details
export const getServiceById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener servicio con ID ${id}:`);
  }
};

// 📌 Crear un nuevo servicio
// Endpoint: /new
export const createService = async (formData) => {
  try {
    const { data } = await api.post("/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear servicio:");
  }
};

// 📌 Actualizar un servicio por ID
// Endpoint: /update/{id}
export const updateService = async (id, formData) => {
  try {
    const { data } = await api.put(`/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar servicio con ID ${id}:`);
  }
};

// 📌 Eliminar un servicio
// Endpoint: /delete/{id}
export const deleteService = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar servicio con ID ${id}:`);
  }
};