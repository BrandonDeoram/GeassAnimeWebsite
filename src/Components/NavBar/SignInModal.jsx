import React, { useState } from 'react';
import Modal from 'react-modal';

const SignInModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    }

    return (
        <>
            <button onClick={() => setModalIsOpen(true)}>Sign In</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
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
            </Modal>
        </>
    );
};

export default SignInModal;
