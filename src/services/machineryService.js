// src/services/machineryServices.js
import axios from "axios";

const API_BASE_URL = "https://herkat-api.onrender.com/api/v1/machines";

// Obtener todas las máquinas
export const getAllMachines = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las máquinas:", error);
    throw error;
  }
};

// Obtener detalle de una máquina por ID
export const getMachineById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la máquina con ID ${id}:`, error);
    throw error;
  }
};

// Obtener detalle de una máquina por nombre
export const getMachineByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la máquina con nombre ${name}:`, error);
    throw error;
  }
};

// Crear una nueva máquina (admin)
export const createMachine = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la máquina:", error);
    throw error;
  }
};

// Actualizar una máquina por ID (admin)
export const updateMachine = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la máquina con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar una máquina por ID (admin)
export const deleteMachine = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la máquina con ID ${id}:`, error);
    throw error;
  }
};
