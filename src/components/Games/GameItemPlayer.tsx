import { IPlayer } from "../../api/games";

import styles from "./GameItemPlayer.module.scss";

export interface GameItemPlayerProps {
    player: IPlayer;
}

export default function GameItemPlayer({ player }: GameItemPlayerProps) {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                {player.name[0].toUpperCase()}
            </div>
        </div>
    );
}
