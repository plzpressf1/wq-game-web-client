import { IUser } from "api/games";

import styles from "./GameItemPlayer.module.scss";

export interface GameItemPlayerProps {
    participant: IUser;
}

export default function GameItemPlayer({ participant }: GameItemPlayerProps) {
    return (
        <li className={styles.outer}>
            <div className={styles.inner}/>
        </li>
    );
}
