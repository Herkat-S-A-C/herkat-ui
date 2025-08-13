/* src/services/socialMediaService.js */
const API_BASE_URL = "https://herkat-api.onrender.com/api/v1";

/**
 * Actualiza una red social por tipo.
 * @param {string} type - Tipo de red social (ej. 'facebook', 'instagram', etc.)
 * @param {Object} data - Datos a actualizar, por ejemplo { url: 'https://...' }
 */
export const updateSocialMedia = async (type, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/social-media/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar red social");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateSocialMedia:", error);
    throw error;
  }
};

/**
 * Obtiene todas las redes sociales.
 * @returns {Promise<Array>} Lista de redes sociales.
 */
export const getSocialMedia = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/social-media`);

    if (!response.ok) {
      throw new Error("Error al obtener las redes sociales");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getSocialMedia:", error);
    throw error;
  }
};
