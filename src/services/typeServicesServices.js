import axios from "axios";

// ✅ URL base de la API V2 para Tipos de Servicios
// Corrección: Asegurada la URL única sin segmentos duplicados
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/service-item-types";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los tipos de servicios
// Endpoint: /all
export const getAllServiceTypes = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener todos los tipos de servicios:");
  }
};

// 📌 Obtener detalle de un tipo de servicio por ID
// Endpoint: /{id}/details
export const getServiceTypeById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener el tipo de servicio con ID ${id}:`);
  }
};

// 📌 Crear un nuevo tipo de servicio
// Endpoint: /new
export const createServiceType = async (serviceTypeData) => {
  try {
    // Se asume envío en formato JSON para tipos
    const { data } = await api.post("/new", serviceTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear un nuevo tipo de servicio:");
  }
};

// 📌 Actualizar un tipo de servicio por ID
// Endpoint: /update/{id}
export const updateServiceType = async (id, serviceTypeData) => {
  try {
    const { data } = await api.put(`/update/${id}`, serviceTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar el tipo de servicio con ID ${id}:`);
  }
};

// 📌 Eliminar un tipo de servicio por ID
// Endpoint: /delete/{id}
export const deleteServiceType = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar el tipo de servicio con ID ${id}:`);
  }
};