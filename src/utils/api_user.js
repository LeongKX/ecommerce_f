import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:5555";

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email: email,
      password: password,
    });
    console.log("Login Success:", response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const userSignup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    console.log("Signup Success:", response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
