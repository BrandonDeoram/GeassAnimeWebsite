import React from 'react';
import style from "./NavBar.module.css";
export default function NavBar() {
    return (
        <ul className={style.ul} >
            <li className={style.li} ><a className={style.signIn}>Sign In</a></li>
        </ul>
    );
}