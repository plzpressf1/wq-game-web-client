import { useState } from "react";

import { Game, searchGamesByFilter } from "api/games";

import DebouncedInput from "components/common/DebouncedInput";
import GameItem from "./GameItem";

import styles from "./GamesPage.module.scss";

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);

    const searchGames = async (filter: string) => {
        const response = await searchGamesByFilter(filter);
        setGames(response.data.games);
    };

    return (
        <div className={styles.page}>
            <DebouncedInput
                autoFocus
                className={styles.search}
                placeholder="Поиск игры..."
                callback={searchGames}
            />
            <ul className={styles.games}>
                {
                    games.map((game) =>
                        <GameItem
                            key={game._id}
                            game={game}
                        />
                    )
                }
            </ul>
        </div>
    );
}
