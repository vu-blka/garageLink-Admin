import axios from 'axios';
import {
  API_GET_ALL_USER_MAIN,
  API_GET_ALL_USER,
  API_ADD_NEW_USER,
  API_UPDATE_USER,
  API_DELETE_USER,
  API_GET_ALL_CART,
  API_UPDATE_CART,
  API_DELETE_CART,
  API_GET_ALL_SERVICE,
  API_ADD_NEW_SERVICE,
  API_UPDATE_SERVICE,
  API_DELETE_SERVICE,
  API_GET_ALL_PRODUCT,
  API_ADD_NEW_PRODUCT,
  API_UPDATE_PRODUCT,
  API_DELETE_PRODUCT,
  API_GET_ALL_MANUFACTURER,
  API_GET_ALL_PRODUCT_TYPE,
  API_GET_ALL_SERVICE_TYPE,
} from './configs';

export const getAllUserMainAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_USER_MAIN);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllUserAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_USER);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addNewUserAPI = async (body) => {
  try {
    const response = await axios.post(API_ADD_NEW_USER, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const editUserAPI = async (body) => {
  try {
    const response = await axios.patch(API_UPDATE_USER, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteUserAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_USER}/${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllCart = async () => {
  try {
    const response = await axios.get(API_GET_ALL_CART);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getDeleteCart = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_CART}?id=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllServicesAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_SERVICE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addNewServiceAPI = async (body) => {
  try {
    const response = await axios.post(API_ADD_NEW_SERVICE, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getUpdateService = async (id, body) => {
  try {
    const response = await axios.patch(`${API_UPDATE_SERVICE}/${id}`, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const editServiceAPI = async (body) => {
  try {
    const response = await axios.patch(API_UPDATE_SERVICE, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteServiceAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_SERVICE}/${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllProductAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_PRODUCT);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const addNewProductAPI = async (body) => {
  try {
    const response = await axios.post(API_ADD_NEW_PRODUCT, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const editProductAPI = async (body) => {
  try {
    const response = await axios.patch(API_UPDATE_PRODUCT, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const deleteProductAPI = async (id) => {
  try {
    const response = await axios.delete(`${API_DELETE_PRODUCT}/${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllManufacturerAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_MANUFACTURER);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllProductTypeAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_PRODUCT_TYPE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllServiceTypeAPI = async () => {
  try {
    const response = await axios.get(API_GET_ALL_SERVICE_TYPE);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
