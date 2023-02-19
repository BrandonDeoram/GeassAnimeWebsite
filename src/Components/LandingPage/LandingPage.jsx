import React, { useState } from 'react'
import styles from "../LandingPage/LandingPage.module.css"
import SearchBar from './SearchBar';

export default function LandingPage() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (searchTerm) => {
        // Perform search logic here and update searchResults state
        setSearchResults([...new Array(10)].map((_, index) => `Result ${index + 1}`));
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
