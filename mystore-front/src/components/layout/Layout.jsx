import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import Footer from "./Footer";
import styles from './layout.module.scss'
import { createContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from "universal-cookie";

export const AppContext = createContext({})

export default function Layout() {
   
    const [appState, setAppState] = useState({
        popup: {
            show: false,
            message: '',
        },
        search: '',
        category: '',
        user: null,
        token: '', // cookie
        cart: [{ id: 1, qty: 2 }] // cookie
    })
    const closePopup = () => setAppState({ ...appState, popup: { show: false } });
    const showPopup = (msg) => setAppState({ ...appState, popup: { message: msg, show: true } });
    const setSearch = (newText) => setAppState({ ...appState, search: newText })
    const setCategory = (newCategory) => setAppState({ ...appState, category: newCategory })
    const setToken = (token) => setAppState({ ...appState, token })
    const setUser = (user) => setAppState({ ...appState, user })
    return <AppContext.Provider value={{
        appState, setAppState, closePopup, showPopup, setSearch, setCategory, setToken, setUser
    }}>
        <div className={styles.layout}>
            <AppBar />
            <div className={styles.page}>
                <Outlet />
            </div>
            {/* <Button variant="primary" onClick={() => showPopup('Hi from button')}>
                Launch demo modal
            </Button> */}
            <Footer />
            <Modal show={appState.popup.show} onHide={closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>{appState.popup.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closePopup}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={closePopup}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    </AppContext.Provider>
}