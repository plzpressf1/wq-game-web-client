import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/navigation.css";

interface NavigationItem {
    pathname: string;
    text: string;
}

const navigation: NavigationItem[] = [
    {
        pathname: "/lobby",
        text: "Игра",
    },
    {
        pathname: "/games",
        text: "Поиск",
    },
    {
        pathname: "/packs",
        text: "Паки",
    },
];

export default function TopBar() {
    const location = useLocation();

    return (
        <nav>
            {
                navigation.map(item => {
                    const itemClasses = ["item"];
                    if (item.pathname === location.pathname) {
                        itemClasses.push("active");
                    }
                    return <div
                        key={item.pathname}
                        className={itemClasses.join(" ")}
                    >
                        <Link
                            to={item.pathname}
                        >
                            {item.text}
                        </Link>
                    </div>;
                })
            }
        </nav>
    );
}
