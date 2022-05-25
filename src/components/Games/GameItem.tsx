import { IGame } from "../../api/games";

import GameItemPlayer from "./GameItemPlayer";

import styles from "./GameItem.module.scss";

interface GameItemProps {
    game: IGame;
}

export default function GameItem({ game }: GameItemProps) {
    return (
        <li className={styles.game}>
            <div className={styles.name}>{game.name}</div>
            <ul className={styles.players}>
                {
                    game.players.map(player =>
                        <li key={player._id}>
                            <GameItemPlayer player={player}/>
                        </li>
                    )
                }
            </ul>
        </li>
    );
}
