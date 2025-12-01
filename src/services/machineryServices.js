import axios from "axios";

// ✅ URL base para Maquinaria (V2)
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/machines";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todas las máquinas
export const getAllMachines = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener maquinaria:");
  }
};

// 📌 Obtener máquina por ID
export const getMachineById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener máquina con ID ${id}:`);
  }
};

// 📌 Crear nueva máquina
export const createMachine = async (formData) => {
  try {
    const { data } = await api.post("/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear máquina:");
  }
};

// 📌 Actualizar máquina
export const updateMachine = async (id, formData) => {
  try {
    const { data } = await api.put(`/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar máquina con ID ${id}:`);
  }
};

// 📌 Eliminar máquina
export const deleteMachine = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar máquina con ID ${id}:`);
  }
};