import axios from "axios";

// ✅ URL Base: Movimientos de Inventario (Kardex)
const API_BASE_URL = "https://herkat-v2-api.onrender.com/api/v1/inventory-movements";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  throw error;
};

// 📌 Registrar un nuevo movimiento (Entrada/Salida)
// Endpoint: /new
export const createInventoryMovement = async (movementData) => {
  try {
    // Se espera un objeto JSON con la estructura:
    // { itemId: 1, type: "IN" | "OUT", quantity: 10 }
    const { data } = await api.post("/new", movementData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, "Error al registrar movimiento:");
  }
};

// 📌 Obtener movimiento por su ID
// Endpoint: /{id}/details
export const getInventoryMovementById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/details`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener movimiento ${id}:`);
  }
};

// 📌 Obtener historial de movimientos de un ítem específico
// Endpoint: /item/{itemId}
export const getInventoryMovementsByItemId = async (itemId) => {
  try {
    const { data } = await api.get(`/item/${itemId}`);
    return data;
  } catch (error) {
    handleError(error, `Error al obtener movimientos del ítem ${itemId}:`);
  }
};

// 📌 Actualizar un movimiento existente
// Endpoint: /update/{id}
export const updateInventoryMovement = async (id, movementData) => {
  try {
    const { data } = await api.put(`/update/${id}`, movementData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    handleError(error, `Error al actualizar movimiento ${id}:`);
  }
};

// 📌 Eliminar un movimiento (rollback)
// Endpoint: /delete/{id}
export const deleteInventoryMovement = async (id) => {
  try {
    const { data } = await api.delete(`/delete/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Error al eliminar movimiento ${id}:`);
  }
};