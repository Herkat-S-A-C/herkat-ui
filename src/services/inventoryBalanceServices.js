import axios from "axios";

// ✅ URL Base: Balance de Inventario
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/inventory-balance";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Obtener todo el balance (Stock de todos los productos)
// Endpoint: /all
export const getAllInventoryBalances = async () => {
  try {
    const { data } = await api.get("/all");
    return data;
  } catch (error) {
    handleError(error, "Error al obtener balances de inventario:");
  }
};

// 📌 Obtener detalle de balance por su ID de registro
// Endpoint: /{id}/details
export const getInventoryBalanceById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener balance con ID ${id}:`);
  }
};

// 📌 Obtener balance por ID del Ítem (Producto/Máquina)
// Endpoint: /item/{id}
export const getInventoryBalanceByItemId = async (itemId) => {
  try {
    const { data } = await api.get(`/item/${itemId}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener balance del ítem ${itemId}:`);
  }
};