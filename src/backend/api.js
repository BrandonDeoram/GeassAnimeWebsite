import axios from 'axios';
// backtick - `
const api = axios.create({
  baseURL: "http://localhost:5000/"
})
const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v4/"
});

export const getTopAnimes = async () => {
  try {
    const response = await api.get("topAnimes");
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getSearchAnime = async (animeName) => {
  try {
    const response = await jikanApi.get(`anime?q=${animeName}&page=1`);
    return response.data.data
  } catch (error) {
    console.error(error);
    return error;
  }
};
