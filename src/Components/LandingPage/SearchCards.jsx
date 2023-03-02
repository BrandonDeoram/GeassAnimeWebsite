import React from 'react'
import styles from "../LandingPage/LandingPage.module.css"
export default function SearchCards({ searchResults }) {
    console.log(searchResults);
    return (
        <div className={styles.searchResContainer}>
            {searchResults.map((anime) => (
                <div key={anime.mal_id} className={styles.card}>
                    <img src={anime['images']['jpg']['image_url']} />
                    <div className={styles.title}>
                        {anime['title']}
                    </div>
                </div>
            ))}
        </div>
    )
}
