import { IGame, IPlayer } from "api/games";

import GameItemPlayer from "./GameItemPlayer";
import JoinGameButton from "./JoinGameButton";

import styles from "./GameItem.module.scss";

interface GameItemProps {
    game: IGame;
}

function usePlayersList(game: IGame): [IPlayer[], boolean] {
    const players = [...game.players];
    for (let i = players.length; i < game.maxPlayers; ++i) {
        players.push({
            _id: i.toString(),
            name: "",
        });
    }
    return [players, game.players.length !== game.maxPlayers];
}

export default function GameItem({ game }: GameItemProps) {
    const [players, canJoin] = usePlayersList(game);

    return (
        <li className={styles.game}>
            <div className={styles.info}>
                <span className={styles.name}>{game.name}</span>
                <span className={styles.pack}>{game.pack.name}</span>
                <span className={styles.description}>{game.pack.description}</span>
            </div>
            <div className={styles.actions}>
                <ul className={styles.players}>
                    {
                        players.map(player =>
                            <GameItemPlayer
                                key={player._id}
                                player={player}
                            />
                        )
                    }
                </ul>
                { canJoin && <JoinGameButton/> }
            </div>
        </li>
    );
}
