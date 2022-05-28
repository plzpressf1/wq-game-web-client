import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { UserStore } from "stores/User";

import LoginPage from "components/Login/LoginPage";
import LobbyPage from "components/Lobby/LobbyPage";
import GamesPage from "components/Games/GamesPage";
import PacksPage from "components/Packs/PacksPage";
import TopBar from "components/TopBar/TopBar";

import "styles/common.css";
import styles from "./App.module.scss";

function App() {
    useEffect(() => {
        UserStore.fetchUser();
    }, []);

    if (UserStore.isFetchingUser) {
        // TODO: replace with some sort of spinner
        return <div>Loading...</div>;
    }

    if (UserStore.user) {
        return (
            <BrowserRouter>
                <div className={styles.wrapper}>
                    <header className={styles.header}>
                        <div className={styles.fixedWidth}>
                            <TopBar/>
                        </div>
                    </header>
                    <main className={`${styles.main} ${styles.fixedWidth}`}>
                        <Routes>
                            <Route path="/lobby" element={<LobbyPage/>}/>
                            <Route path="/games" element={<GamesPage/>}/>
                            <Route path="/packs" element={<PacksPage/>}/>
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
    else {
        return <LoginPage/>;
    }
}

export default observer(App);
