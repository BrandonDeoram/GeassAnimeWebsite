import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/"
})
export const getTopAnimes = async () => {
  try {
    const response = await api.get("/topAnimes");
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return error;
  }
};
