import React from 'react';
import style from "./NavBar.module.css";
export default function NavBar() {
    return (
        <ul className={style.ul} >
            <li className={style.li}><a href="#home">Geass</a></li>
            <li className={style.li}><a href="#home">Search</a></li>
            <li className={style.li}><a href="#news">User</a></li>
        </ul>
    );
}