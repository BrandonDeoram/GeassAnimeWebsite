import React, { useState } from 'react';
import style from "./NavBar.module.css";

const SignInModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
        onClose();
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default function NavBar() {
    const [showModal, setShowModal] = useState(false);

    const handleSignInClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <ul className={style.ul}>
                <li className={style.li}>
                    <button className={style.signIn}  onClick={handleSignInClick}>Sign In</button>
                </li>
            </ul>
            {showModal && <SignInModal onClose={handleCloseModal} />}
        </>
    );
}
