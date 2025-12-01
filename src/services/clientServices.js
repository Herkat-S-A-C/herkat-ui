import axios from "axios";

// ✅ URL correcta según tu documentación
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/clients";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todos los clientes
export const getAllClients = async () => {
  try {
    const { data } = await api.get("/all"); // Ruta explícita
    return data;
  } catch (error) {
    handleError(error, "Error al obtener los clientes:");
  }
};

// 📌 Obtener cliente por ID
export const getClientById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`); // Ruta explícita
    return data;
  } catch (error) {
    handleError(error, `Error al obtener cliente con ID ${id}:`);
  }
};

// 📌 Crear nuevo cliente
export const createClient = async (formData) => {
  try {
    const { data } = await api.post("/new", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al crear cliente:");
  }
};

// 📌 Actualizar cliente
export const updateClient = async (id, formData) => {
  try {
    const { data } = await api.put(`/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar cliente con ID ${id}:`);
  }
};

// 📌 Eliminar cliente
export const deleteClient = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar cliente con ID ${id}:`);
  }
};