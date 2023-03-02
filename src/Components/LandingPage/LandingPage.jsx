import React, { useState, useEffect } from 'react'
import styles from "../LandingPage/LandingPage.module.css"
import SearchBar from './SearchBar';
import { getSearchAnime } from '../../backend/api';
import SearchCards from './SearchCards';
export default function LandingPage() {

    const [search, setSearchResults] = useState([]);
    const [idk, setIdk] = useState([]);


    const handleSearch = (searchTerm) => {
        // Perform search logic here and update searchResults state
        console.log(searchTerm);
        getSearchAnime(searchTerm).then((res) => setSearchResults(res.data));
        console.log(search);
        // setSearchResults([...new Array(10)].map((_, index) => `Result ${index + 1}`));

    };
    useEffect(() => {
        console.log(idk.map(item => item['mal_id']));


    }, [idk]);
    return (
        <div className={styles.container}>
            <img src="http://www.clker.com/cliparts/C/8/5/F/s/V/geass-kr-md.png" alt="no pic" className={styles.geassImage} />
            {/* <div className={styles.searchBackground}>
                Search
            </div> */}
            <div className={styles.linkContainer}>
                <a href="Home" className={styles.link}>
                    Home
                </a>
                <a href="Trending" className={styles.link}>
                    Trending
                </a>
                <a href="New" className={styles.link}>
                    New Releases
                </a>
                <a href="Top" className={styles.link}>
                    Top 10
                </a>
            </div>

            <div className={styles.searchContent}>
                <SearchBar onSearch={handleSearch} />
            </div>
            <SearchCards searchResults={search}></SearchCards>
        </div>
    )
}
