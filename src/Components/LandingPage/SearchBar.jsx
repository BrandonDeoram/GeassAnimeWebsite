import React, { useState } from 'react';
import styles from "../LandingPage/LandingPage.module.css";
import { getSearchAnime } from '../../backend/api';
import { AiOutlineSearch } from "react-icons/ai";
import SearchCards from './SearchCards';
import Welcome from './Welcome';
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearchResults] = useState([]);
    const [clicked, setClicked] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchTerm);
        setClicked(true);
    };

    const handleSearch = (searchTerm) => {
        getSearchAnime(searchTerm).then((res) => setSearchResults(res.data));
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.button}> <AiOutlineSearch className={styles.searchButton}></AiOutlineSearch></button>
            </form>
            {clicked ? <SearchCards searchResults={search}></SearchCards> : <Welcome></Welcome>}
        </>
    );
}

export default SearchBar;