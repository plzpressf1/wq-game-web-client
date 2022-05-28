import { IUser } from "api/games";

import styles from "./GameItemPlayer.module.scss";

export interface GameItemPlayerProps {
    player: IUser;
}

export default function GameItemPlayer({ player }: GameItemPlayerProps) {
    return (
        <li className={styles.outer}>
            <div className={styles.inner}/>
        </li>
    );
}
