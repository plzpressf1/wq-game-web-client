import React from "react";
import { observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";

import { UserStore } from "stores/User";

import styles from "./Navigation.module.scss";

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
        pathname: "/host",
        text: "Захостить",
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

function Navigation() {
    const location = useLocation();

    return (
        <nav className={styles.navigation}>
            {
                navigation.map((item) => {
                    if (item.pathname === "/host" && UserStore.game) {
                        return null;
                    }
                    if (item.pathname === "/lobby" && !UserStore.game) {
                        return null;
                    }
                    const itemClasses = [styles.item];
                    if (item.pathname === location.pathname) {
                        itemClasses.push(styles.active);
                    }
                    return <div
                        key={item.pathname}
                        className={itemClasses.join(" ")}
                    >
                        <Link
                            className={styles.link}
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

export default observer(Navigation);
