import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LobbyPage from "./components/LobbyPage";
import GamesPage from "./components/GamesPage";
import PacksPage from "./components/PacksPage";
import TopBar from "./components/TopBar";

import "./App.css";

export default function App() {
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
