import axios from "axios";

// ✅ URL base de la API V2 para Tipos de Maquinaria
// Corrección: Eliminada la duplicidad de segmentos en la URL
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/machine-types";

// ✅ Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 📌 Función auxiliar para manejar errores
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los tipos de maquinaria
// Endpoint: /all
export const getAllMachineTypes = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener todos los tipos de máquinas:");
  }
};

// 📌 Obtener detalle de un tipo de máquina por ID
// Endpoint: /{id}/details
export const getMachineTypeById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener el tipo de máquina con ID ${id}:`);
  }
};

// 📌 Crear un nuevo tipo de máquina
// Endpoint: /new
export const createMachineType = async (machineTypeData) => {
  try {
    // Se asume envío en formato JSON para tipos
    const { data } = await api.post("/new", machineTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear un nuevo tipo de máquina:");
  }
};

// 📌 Actualizar un tipo de máquina por ID
// Endpoint: /update/{id}
export const updateMachineType = async (id, machineTypeData) => {
  try {
    const { data } = await api.put(`/update/${id}`, machineTypeData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar el tipo de máquina con ID ${id}:`);
  }
};

// 📌 Eliminar un tipo de máquina por ID
// Endpoint: /delete/{id}
export const deleteMachineType = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar el tipo de máquina con ID ${id}:`);
  }
};