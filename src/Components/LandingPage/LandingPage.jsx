import React, { useState } from 'react'
import styles from "../LandingPage/LandingPage.module.css"
import SearchBar from './SearchBar';
import { getSearchAnime } from '../../backend/api';
export default function LandingPage() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (searchTerm) => {
        // Perform search logic here and update searchResults state
        console.log(searchTerm);
        // const animeName = 'your_anime_name';
        // const apiUrl = `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=1`;
        // fetch(apiUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         // handle the response data
        //         console.log(data.data); // display the first result
        //     })
        //     .catch(error => console.error(error));
        getSearchAnime(searchTerm).then((res) => console.log(res));
        // setSearchResults([...new Array(10)].map((_, index) => `Result ${index + 1}`));
    };
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
                <ul>
                    {searchResults.map((result) => (
                        <li>{result}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
