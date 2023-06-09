import React, { useState } from "react";
import styles from "../LandingPage/LandingPage.module.css";
import { getFilteredResults, getSearchAnime } from "../../backend/api";
import { AiOutlineSearch } from "react-icons/ai";
import SearchCards from "./SearchCards";
import { BeatLoader } from "react-spinners";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import { Checkbox } from "@mui/material";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearchResults] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterGenre, setFilterGenre] = useState([]);
  const [filterType, setFilterType] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleSearch(searchTerm);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSearch = (searchTerm) => {
    setIsLoading(true);
    getSearchAnime(searchTerm)
      .then((res) => {
        setSearchResults(res.data);
        setClicked(true);
      })
      .finally(() => setIsLoading(false));
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterGenre(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setFilterType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onFilterClicked = () => {
    // Call api with query of filters selected
    const genreIds = filterGenre.map((genreName) => {
      const genre = genres.find(
        (g) => g.name.toLowerCase() === genreName.toLowerCase()
      );
      return genre ? genre.mal_id : null;
    });
    console.log(genreIds);
    getFilteredResults(genreIds, filterType).then((res) => {
      console.log(res.data);
      setSearchResults(res.data);
      setClicked(true);
    });
  };
  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Anime Name"
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.button}>
          <AiOutlineSearch className={styles.searchButton}></AiOutlineSearch>
        </button>
      </form>
      <div className={styles.filterRow}>
        <FormControl
          className={styles.genreSelect}
          sx={{
            mt: 2,
            width: 100,
            height: 35,
            borderRadius: "500px",
          }}
        >
          <Select
            sx={{
              height: "38px",
              fontSize: ".8rem",
              color: "white",
              backgroundColor: "#171921",
              border: "1px solid #a5965c",
              width: "100px",

              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiOutlinedInput-root:hover .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            displayEmpty
            multiple
            value={filterGenre}
            onChange={handleChange}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Genre</em>;
              }

              return selected.join(", ");
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Genre</em>
            </MenuItem>
            {genres.map((genre, index) => (
              <MenuItem key={index} value={genre["name"]}>
                <Checkbox
                  checked={filterGenre.indexOf(genre["name"]) > -1}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />

                {genre["name"]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          className={styles.genreSelect}
          sx={{
            mt: 2,
            width: 100,
            height: 35,
            borderRadius: "500px",
          }}
        >
          <Select
            sx={{
              height: "35px",
              fontSize: ".8rem",
              color: "white",
              backgroundColor: "#171921",
              border: "1px solid #a5965c",
              width: "100px",

              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "none",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiOutlinedInput-root:hover .MuiSelect-root": {
                backgroundColor: "none",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            displayEmpty
            multiple
            value={filterType}
            onChange={handleChange2}
            MenuProps={MenuProps}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Type</em>;
              }

              return selected.join(", ");
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Genre</em>
            </MenuItem>
            {types.map((type, index) => (
              <MenuItem key={index} value={type}>
                <Checkbox
                  checked={filterType.indexOf(type) > -1}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className={styles.backButton} onClick={onFilterClicked}>
          Filter
        </Button>
      </div>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <BeatLoader color={"#ffff"} loading={isLoading} size={20} />
        </div>
      ) : clicked ? (
        <div>
          <SearchCards searchResults={search} />
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "250px",
      margin: "20px",
      backgroundColor: "#171921",
      color: "white",
    },
  },
};
const types = ["Movie", "TV", "OVA", "ONA", "Special", "Music"];
const genres = [
  {
    mal_id: 1,
    name: "Action",
    url: "https://myanimelist.net/anime/genre/1/Action",
    count: 4651,
  },
  {
    mal_id: 2,
    name: "Adventure",
    url: "https://myanimelist.net/anime/genre/2/Adventure",
    count: 3808,
  },
  {
    mal_id: 5,
    name: "Avant Garde",
    url: "https://myanimelist.net/anime/genre/5/Avant_Garde",
    count: 763,
  },
  {
    mal_id: 46,
    name: "Award Winning",
    url: "https://myanimelist.net/anime/genre/46/Award_Winning",
    count: 237,
  },
  {
    mal_id: 28,
    name: "Boys Love",
    url: "https://myanimelist.net/anime/genre/28/Boys_Love",
    count: 164,
  },
  {
    mal_id: 4,
    name: "Comedy",
    url: "https://myanimelist.net/anime/genre/4/Comedy",
    count: 7095,
  },
  {
    mal_id: 8,
    name: "Drama",
    url: "https://myanimelist.net/anime/genre/8/Drama",
    count: 2818,
  },
  {
    mal_id: 10,
    name: "Fantasy",
    url: "https://myanimelist.net/anime/genre/10/Fantasy",
    count: 5222,
  },
  {
    mal_id: 26,
    name: "Girls Love",
    url: "https://myanimelist.net/anime/genre/26/Girls_Love",
    count: 111,
  },
  {
    mal_id: 47,
    name: "Gourmet",
    url: "https://myanimelist.net/anime/genre/47/Gourmet",
    count: 142,
  },
  {
    mal_id: 14,
    name: "Horror",
    url: "https://myanimelist.net/anime/genre/14/Horror",
    count: 527,
  },
  {
    mal_id: 7,
    name: "Mystery",
    url: "https://myanimelist.net/anime/genre/7/Mystery",
    count: 839,
  },
  {
    mal_id: 22,
    name: "Romance",
    url: "https://myanimelist.net/anime/genre/22/Romance",
    count: 2039,
  },
  {
    mal_id: 24,
    name: "Sci-Fi",
    url: "https://myanimelist.net/anime/genre/24/Sci-Fi",
    count: 3067,
  },
  {
    mal_id: 36,
    name: "Slice of Life",
    url: "https://myanimelist.net/anime/genre/36/Slice_of_Life",
    count: 1746,
  },
  {
    mal_id: 30,
    name: "Sports",
    url: "https://myanimelist.net/anime/genre/30/Sports",
    count: 764,
  },
  {
    mal_id: 37,
    name: "Supernatural",
    url: "https://myanimelist.net/anime/genre/37/Supernatural",
    count: 1491,
  },
  {
    mal_id: 41,
    name: "Suspense",
    url: "https://myanimelist.net/anime/genre/41/Suspense",
    count: 235,
  },
  {
    mal_id: 9,
    name: "Ecchi",
    url: "https://myanimelist.net/anime/genre/9/Ecchi",
    count: 792,
  },
  {
    mal_id: 49,
    name: "Erotica",
    url: "https://myanimelist.net/anime/genre/49/Erotica",
    count: 54,
  },
  {
    mal_id: 12,
    name: "Hentai",
    url: "https://myanimelist.net/anime/genre/12/Hentai",
    count: 1477,
  },
  {
    mal_id: 50,
    name: "Adult Cast",
    url: "https://myanimelist.net/anime/genre/50/Adult_Cast",
    count: 443,
  },
  {
    mal_id: 51,
    name: "Anthropomorphic",
    url: "https://myanimelist.net/anime/genre/51/Anthropomorphic",
    count: 787,
  },
  {
    mal_id: 52,
    name: "CGDCT",
    url: "https://myanimelist.net/anime/genre/52/CGDCT",
    count: 203,
  },
  {
    mal_id: 53,
    name: "Childcare",
    url: "https://myanimelist.net/anime/genre/53/Childcare",
    count: 63,
  },
  {
    mal_id: 54,
    name: "Combat Sports",
    url: "https://myanimelist.net/anime/genre/54/Combat_Sports",
    count: 90,
  },
  {
    mal_id: 81,
    name: "Crossdressing",
    url: "https://myanimelist.net/anime/genre/81/Crossdressing",
    count: 39,
  },
  {
    mal_id: 55,
    name: "Delinquents",
    url: "https://myanimelist.net/anime/genre/55/Delinquents",
    count: 51,
  },
  {
    mal_id: 39,
    name: "Detective",
    url: "https://myanimelist.net/anime/genre/39/Detective",
    count: 285,
  },
  {
    mal_id: 56,
    name: "Educational",
    url: "https://myanimelist.net/anime/genre/56/Educational",
    count: 244,
  },
  {
    mal_id: 57,
    name: "Gag Humor",
    url: "https://myanimelist.net/anime/genre/57/Gag_Humor",
    count: 227,
  },
  {
    mal_id: 58,
    name: "Gore",
    url: "https://myanimelist.net/anime/genre/58/Gore",
    count: 162,
  },
  {
    mal_id: 35,
    name: "Harem",
    url: "https://myanimelist.net/anime/genre/35/Harem",
    count: 422,
  },
  {
    mal_id: 59,
    name: "High Stakes Game",
    url: "https://myanimelist.net/anime/genre/59/High_Stakes_Game",
    count: 39,
  },
  {
    mal_id: 13,
    name: "Historical",
    url: "https://myanimelist.net/anime/genre/13/Historical",
    count: 1460,
  },
  {
    mal_id: 60,
    name: "Idols (Female)",
    url: "https://myanimelist.net/anime/genre/60/Idols_Female",
    count: 268,
  },
  {
    mal_id: 61,
    name: "Idols (Male)",
    url: "https://myanimelist.net/anime/genre/61/Idols_Male",
    count: 150,
  },
  {
    mal_id: 62,
    name: "Isekai",
    url: "https://myanimelist.net/anime/genre/62/Isekai",
    count: 299,
  },
  {
    mal_id: 63,
    name: "Iyashikei",
    url: "https://myanimelist.net/anime/genre/63/Iyashikei",
    count: 184,
  },
  {
    mal_id: 64,
    name: "Love Polygon",
    url: "https://myanimelist.net/anime/genre/64/Love_Polygon",
    count: 76,
  },
  {
    mal_id: 65,
    name: "Magical Sex Shift",
    url: "https://myanimelist.net/anime/genre/65/Magical_Sex_Shift",
    count: 30,
  },
  {
    mal_id: 66,
    name: "Mahou Shoujo",
    url: "https://myanimelist.net/anime/genre/66/Mahou_Shoujo",
    count: 273,
  },
  {
    mal_id: 17,
    name: "Martial Arts",
    url: "https://myanimelist.net/anime/genre/17/Martial_Arts",
    count: 557,
  },
  {
    mal_id: 18,
    name: "Mecha",
    url: "https://myanimelist.net/anime/genre/18/Mecha",
    count: 1226,
  },
  {
    mal_id: 67,
    name: "Medical",
    url: "https://myanimelist.net/anime/genre/67/Medical",
    count: 39,
  },
  {
    mal_id: 38,
    name: "Military",
    url: "https://myanimelist.net/anime/genre/38/Military",
    count: 674,
  },
  {
    mal_id: 19,
    name: "Music",
    url: "https://myanimelist.net/anime/genre/19/Music",
    count: 3396,
  },
  {
    mal_id: 6,
    name: "Mythology",
    url: "https://myanimelist.net/anime/genre/6/Mythology",
    count: 605,
  },
  {
    mal_id: 68,
    name: "Organized Crime",
    url: "https://myanimelist.net/anime/genre/68/Organized_Crime",
    count: 71,
  },
  {
    mal_id: 69,
    name: "Otaku Culture",
    url: "https://myanimelist.net/anime/genre/69/Otaku_Culture",
    count: 78,
  },
  {
    mal_id: 20,
    name: "Parody",
    url: "https://myanimelist.net/anime/genre/20/Parody",
    count: 731,
  },
  {
    mal_id: 70,
    name: "Performing Arts",
    url: "https://myanimelist.net/anime/genre/70/Performing_Arts",
    count: 112,
  },
  {
    mal_id: 71,
    name: "Pets",
    url: "https://myanimelist.net/anime/genre/71/Pets",
    count: 93,
  },
  {
    mal_id: 40,
    name: "Psychological",
    url: "https://myanimelist.net/anime/genre/40/Psychological",
    count: 411,
  },
  {
    mal_id: 3,
    name: "Racing",
    url: "https://myanimelist.net/anime/genre/3/Racing",
    count: 198,
  },
  {
    mal_id: 72,
    name: "Reincarnation",
    url: "https://myanimelist.net/anime/genre/72/Reincarnation",
    count: 110,
  },
  {
    mal_id: 73,
    name: "Reverse Harem",
    url: "https://myanimelist.net/anime/genre/73/Reverse_Harem",
    count: 72,
  },
  {
    mal_id: 74,
    name: "Romantic Subtext",
    url: "https://myanimelist.net/anime/genre/74/Romantic_Subtext",
    count: 48,
  },
  {
    mal_id: 21,
    name: "Samurai",
    url: "https://myanimelist.net/anime/genre/21/Samurai",
    count: 222,
  },
  {
    mal_id: 23,
    name: "School",
    url: "https://myanimelist.net/anime/genre/23/School",
    count: 1928,
  },
  {
    mal_id: 75,
    name: "Showbiz",
    url: "https://myanimelist.net/anime/genre/75/Showbiz",
    count: 33,
  },
  {
    mal_id: 29,
    name: "Space",
    url: "https://myanimelist.net/anime/genre/29/Space",
    count: 598,
  },
  {
    mal_id: 11,
    name: "Strategy Game",
    url: "https://myanimelist.net/anime/genre/11/Strategy_Game",
    count: 316,
  },
  {
    mal_id: 31,
    name: "Super Power",
    url: "https://myanimelist.net/anime/genre/31/Super_Power",
    count: 633,
  },
  {
    mal_id: 76,
    name: "Survival",
    url: "https://myanimelist.net/anime/genre/76/Survival",
    count: 83,
  },
  {
    mal_id: 77,
    name: "Team Sports",
    url: "https://myanimelist.net/anime/genre/77/Team_Sports",
    count: 301,
  },
  {
    mal_id: 78,
    name: "Time Travel",
    url: "https://myanimelist.net/anime/genre/78/Time_Travel",
    count: 129,
  },
  {
    mal_id: 32,
    name: "Vampire",
    url: "https://myanimelist.net/anime/genre/32/Vampire",
    count: 154,
  },
  {
    mal_id: 79,
    name: "Video Game",
    url: "https://myanimelist.net/anime/genre/79/Video_Game",
    count: 136,
  },
  {
    mal_id: 80,
    name: "Visual Arts",
    url: "https://myanimelist.net/anime/genre/80/Visual_Arts",
    count: 88,
  },
  {
    mal_id: 48,
    name: "Workplace",
    url: "https://myanimelist.net/anime/genre/48/Workplace",
    count: 164,
  },
  {
    mal_id: 43,
    name: "Josei",
    url: "https://myanimelist.net/anime/genre/43/Josei",
    count: 116,
  },
  {
    mal_id: 15,
    name: "Kids",
    url: "https://myanimelist.net/anime/genre/15/Kids",
    count: 5925,
  },
  {
    mal_id: 42,
    name: "Seinen",
    url: "https://myanimelist.net/anime/genre/42/Seinen",
    count: 944,
  },
  {
    mal_id: 25,
    name: "Shoujo",
    url: "https://myanimelist.net/anime/genre/25/Shoujo",
    count: 659,
  },
  {
    mal_id: 27,
    name: "Shounen",
    url: "https://myanimelist.net/anime/genre/27/Shounen",
    count: 1908,
  },
];
