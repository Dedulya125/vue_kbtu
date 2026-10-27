import axios from "axios";

const api = axios.create({
  baseURL: "https://6ae03bbe8e42963c8d5f2929.mockapi.io/api/products",
});

export default api;
