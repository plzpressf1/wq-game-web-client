import { User } from "api/games";

import styles from "./GameItemPlayer.module.scss";

interface GameItemPlayerProps {
    participant: User;
}

export default function GameItemPlayer({ participant }: GameItemPlayerProps) {
    return (
        <li className={styles.outer}>
            <div className={styles.inner}/>
        </li>
    );
}
