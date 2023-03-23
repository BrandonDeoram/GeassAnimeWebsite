import axios from "axios";

// backtick - `
const api = axios.create({
  baseURL: "http://localhost:5000/",
});
const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});

export const getTopAnimes = async () => {
  try {
    const response = await api.get("topAnimes");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
//MonogDB Stuff
export const sendAnime = async (anime) => {
  console.log("SEND ANIME");
  try {
    const response = await api.post("http://localhost:5000/anime", anime);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getGenre = async (id) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await jikanApi.get(`anime?genres=${id}`);
        resolve(response.data);
      } catch (error) {
        console.error(error);
        resolve(error);
      }
    }, 3000);
  });
};

export const getSearchAnime = async (animeName) => {
  try {
    const response = await jikanApi.get(`anime?q=${animeName}&page=1`);
    // console.log(response.data.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getAnimeDetails = async (id) => {
  try {
    const response = await jikanApi.get(`anime/${id}/full`);
    // console.log(response.data.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
