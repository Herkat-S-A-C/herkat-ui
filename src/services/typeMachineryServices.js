// src/services/typeMachineryServices.js
import axios from "axios";

const BASE_URL = "https://herkat-api.onrender.com/api/v1/machine-types";

// Listar todos los tipos de máquinas
export const getAllMachineTypes = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los tipos de máquinas:", error);
    throw error;
  }
};

// Obtener detalle de un tipo de máquina por ID
export const getMachineTypeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el tipo de máquina con ID ${id}:`, error);
    throw error;
  }
};

// Obtener detalle de un tipo de máquina por nombre
export const getMachineTypeByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el tipo de máquina con nombre ${name}:`, error);
    throw error;
  }
};

// Crear un nuevo tipo de máquina (admin)
export const createMachineType = async (machineTypeData) => {
  try {
    const response = await axios.post(BASE_URL, machineTypeData);
    return response.data;
  } catch (error) {
    console.error("Error al crear un nuevo tipo de máquina:", error);
    throw error;
  }
};

// Actualizar un tipo de máquina por ID (admin)
export const updateMachineType = async (id, machineTypeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, machineTypeData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el tipo de máquina con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un tipo de máquina por ID (admin)
export const deleteMachineType = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el tipo de máquina con ID ${id}:`, error);
    throw error;
  }
};
