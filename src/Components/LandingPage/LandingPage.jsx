import React, { useState, useEffect } from 'react'
import styles from "../LandingPage/LandingPage.module.css"
import SearchBar from './SearchBar';
import { getSearchAnime } from '../../backend/api';
export default function LandingPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [idk, setIdk] = useState([]);


    const handleSearch = (searchTerm) => {
        // Perform search logic here and update searchResults state
        console.log(searchTerm);
        getSearchAnime(searchTerm).then((res) => setSearchResults(res.data));
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
                <ul>
                    {searchResults.map((anime) => (
                        <div key={anime.mal_id}>
                            <img src={anime['images']['jpg']['image_url']} />
                            <div  >
                                {anime['title']}
                            </div>
                        </div>
                        // <li key={result.mal_id} id={result.mal_id}>{result.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
