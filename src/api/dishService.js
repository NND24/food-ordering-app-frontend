import { config, instance } from "../utils/axiosConfig";

const getAllDish = async (storeId, activeOnly = false) => {
  const response = await instance.get(
    `/customer-store/${storeId}/dish`,
    {
      params: { activeOnly },
    },
    config()
  );
  if (response.data) {
    return response.data;
  }
};

const getStoreDishGroups = async (storeId, activeOnly = false, dishActiveOnly = true) => {
  try {
    const response = await instance.get(`/dish-group/store/${storeId}`, {
      params: { activeOnly, dishActiveOnly },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Unknown error occurred" };
  }
};

const getDish = async (dishId) => {
  const response = await instance.get(`/customer-store/dish/${dishId}`, config());
  if (response.data) {
    return response.data;
  }
};

export const dishService = {
  getAllDish,
  getDish,
  getStoreDishGroups,
};
