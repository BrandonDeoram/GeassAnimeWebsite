import React, { useState, useEffect, useRef } from 'react';
import style from "./NavBar.module.css";

const SignInModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(username, password);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  }

  

  const formTitle = isRegistering ? 'Register' : 'Sign In';
  const submitButtonText = isRegistering ? 'Register' : 'Sign In';
  const toggleButtonText = isRegistering ? 'Already have an account? Sign In' : 'Don\'t have an account? Register';

  return (
    <div className={style.modal}>
      <div className={style.modalContent} ref={modalRef}>
        <h2>{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit" className={style.signIn}>{submitButtonText}</button>
          </div>
        </form>
        {/* <button onClick={handleCloseModal}>Close</button> */}
        <button onClick={handleToggleRegister}>{toggleButtonText}</button>
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
          <button className={style.signIn} onClick={handleSignInClick}>Sign In</button>
          <button className={style.watchListButton} >Get MongoList</button>
        </li>
      </ul>
      {showModal && <SignInModal onClose={handleCloseModal} />}
    </>
  );
}
