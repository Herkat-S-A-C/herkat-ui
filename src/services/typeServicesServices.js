// src/services/typeServicesServices.js
import axios from "axios";

const BASE_URL = "https://herkat-api.onrender.com/api/v1/service-item-types";

export const getAllServiceTypes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getServiceTypeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/id/${id}`);
  return response.data;
};

export const getServiceTypeByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data;
};

export const createServiceType = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateServiceType = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteServiceType = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
