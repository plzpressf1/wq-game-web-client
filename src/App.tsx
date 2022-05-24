import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { UserStore } from "./stores/User";

import LoginPage from "./components/LoginPage";
import LobbyPage from "./components/LobbyPage";
import GamesPage from "./components/GamesPage";
import PacksPage from "./components/PacksPage";
import TopBar from "./components/TopBar";

import "./App.css";

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
                <div className="main-wrapper">
                    <header>
                        <TopBar/>
                    </header>
                    <main>
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
