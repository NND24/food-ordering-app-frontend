import { config, instance } from "../utils/axiosConfig";

const getAllDish = async (storeId) => {
  const response = await instance.get(`/customer-store/${storeId}/dish`, config());
  if (response.data) {
    return response.data;
  }
};

const getDish = async (dishId) => {
  const response = await instance.get(`/customer-store/dish/${dishId}`, config());
  if (response.data) {
    return response.data;
  }
};

const getActiveStoreDishGroups = async (storeId) => {
  try {
    const response = await instance.get(`/dish-group/store/${storeId}/active`);
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Unknown error occurred" };
  }
};

export const dishService = {
  getAllDish,
  getDish,
  getActiveStoreDishGroups,
};
