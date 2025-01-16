import { Apartment, Api } from "@mui/icons-material";
import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

//get products (public data)
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    );
    //http://localhost:5555/products
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get product (public data)
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    //http://localhost:5555/products
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      { name: name },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteCategory = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/categories/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

//add new product
export const addNewProduct = async (
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/products",
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          //Bearer sfagrafiigiuao143u3
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const editCategory = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + _id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update product
export const editProduct = async (
  id,
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/products/" + id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete product
export const deleteProduct = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/products/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
