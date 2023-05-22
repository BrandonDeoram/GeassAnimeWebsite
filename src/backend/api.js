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
export const getHomeAnimes = async () => {
  try {
    const response = await api.get("getHomeAnimes");
    // console.log(response["data"][0]);
    return response["data"][0]["data"];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addToWatchList = async (anime, watchList, token) => {
  const data = {
    anime: anime,
    watchList: watchList,
  };
  try {
    const response = await api.post("addToWatchList", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const deleteAnime = async (anime, token) => {
  const data = {
    anime: anime,
  };
  try {
    const response = await api.post("deleteAnime", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const checkAnimeInList = async (anime) => {
  try {
    const response = await api.post("checkAnimeInList", anime);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getWatchList = async (token) => {
  try {
    const response = await api.get("getWatchList", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getFilteredResults = async (genreList, typeList) => {
  var genreJoined = genreList.join(",");
  var typeJoined = typeList.join(",");
  var string = `anime?genre=${genreJoined}&type=${typeJoined}`
  console.log(string);
  try {
    const response = await jikanApi.get(
      `anime?genres=${genreJoined}&type=${typeJoined}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
