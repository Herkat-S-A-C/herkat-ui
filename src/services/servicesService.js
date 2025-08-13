/* src/services/servicesServices.js */
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1";

/**
 * Listar todos los servicios
 */
export const getAllServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items`);
    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Obtener detalle de un servicio por su ID
 * @param {string} id 
 */
export const getServiceById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items/id/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el servicio por ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Obtener detalle de un servicio por su nombre
 * @param {string} name 
 */
export const getServiceByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items/name/${name}`);
    if (!response.ok) {
      throw new Error("Error al obtener el servicio por nombre");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Crear un nuevo servicio (admin)
 * @param {object} data 
 */
export const createService = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al crear el servicio");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Actualizar un servicio por ID (admin)
 * @param {string} id 
 * @param {object} data 
 */
export const updateService = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el servicio");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Eliminar un servicio por ID (admin)
 * @param {string} id 
 */
export const deleteService = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service-items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el servicio");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
