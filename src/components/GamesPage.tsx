import { useState } from "react";

import { IGame, searchGamesByFilter } from "../api/games";

import DebouncedInput from "./DebouncedInput";
import GameItem from "./GameItem";

import "../styles/games.css";

export default function GamesPage() {
    const [games, setGames] = useState<IGame[]>([]);

    const searchGames = async (filter: string) => {
        const response = await searchGamesByFilter(filter);
        setGames(response.data.games);
    };

    return (
        <div className="games-page">
            <div className="search">
                <DebouncedInput
                    autoFocus
                    className="search-input"
                    placeholder="Поиск игры..."
                    callback={searchGames}
                />
            </div>
            <div className="games">
                {
                    games.map(game =>
                        <GameItem
                            key={game._id}
                            game={game}
                        />
                    )
                }
            </div>
        </div>
    );
}
