// src/services/typeProductsServices.js
import axios from "axios";

const BASE_URL = "https://herkat-api.onrender.com/api/v1/product-types";

export const getAllProductTypes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getProductTypeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/id/${id}`);
  return response.data;
};

export const getProductTypeByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data;
};

export const createProductType = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateProductType = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteProductType = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
