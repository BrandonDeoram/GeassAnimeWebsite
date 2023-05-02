import React, { useState } from "react";
import styles from "../LandingPage/LandingPage.module.css";
import { getSearchAnime } from "../../backend/api";
import { AiOutlineSearch } from "react-icons/ai";
import SearchCards from "./SearchCards";
import Welcome from "./Welcome";
import { BeatLoader } from "react-spinners";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearchResults] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Anime Name"
          value={searchTerm}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.button}>
          {" "}
          <AiOutlineSearch className={styles.searchButton} ></AiOutlineSearch>
        </button>
      </form>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <BeatLoader color={"#ffff"} loading={isLoading} size={20} />
        </div>
      ) : clicked ? (
        <div>
          <SearchCards searchResults={search} />
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default SearchBar;
