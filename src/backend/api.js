import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4/"
})
export const getAnimeData = async () => {
  try {
    const response = await api.get("/top/anime");
    return response.data
  } catch (error) {
    console.error(error);
    return error;
  }
};
