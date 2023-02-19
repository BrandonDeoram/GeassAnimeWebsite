import React, { useState } from 'react';
import styles from "../LandingPage/LandingPage.module.css"
import IconButton from '@mui/material/IconButton';
import { AiOutlineSearch } from "react-icons/ai";
function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.searchInput}
            />
           
            {/* <IconButton onSubmit={handleSubmit} className={styles.button} aria-label="search"></IconButton> */}
            <button type="submit" className={styles.button}> <AiOutlineSearch className={styles.searchButton}></AiOutlineSearch></button>

        </form>
    );
}

export default SearchBar;