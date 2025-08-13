/* src/services/machineryServices.js */
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1";

// Obtener todas las máquinas
export const getAllMachines = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines`);
    if (!response.ok) {
      throw new Error("Error al obtener las máquinas");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener detalle de una máquina por ID
export const getMachineById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines/id/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la máquina por ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener detalle de una máquina por nombre
export const getMachineByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines/name/${name}`);
    if (!response.ok) {
      throw new Error("Error al obtener la máquina por nombre");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Crear una nueva máquina (admin)
export const createMachine = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al crear la máquina");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar una máquina por ID (admin)
export const updateMachine = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la máquina");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar una máquina por ID (admin)
export const deleteMachine = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/machines/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la máquina");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
