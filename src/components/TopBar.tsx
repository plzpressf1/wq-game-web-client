import React from "react";
import { Link } from "react-router-dom";

import "../styles/navigation.css";

export default function TopBar() {
    return (
        <nav>
            <Link to="/lobby">Игра</Link>
            <Link to="/games">Поиск</Link>
            <Link to="/packs">Паки</Link>
        </nav>
    );
}
