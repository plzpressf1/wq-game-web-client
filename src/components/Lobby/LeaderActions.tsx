import { GameStore } from "stores/Game";

import MainButton from "./MainButton";

import styles from "./LeaderActions.module.scss";

export default function LeaderActions() {
    if (!GameStore.gameFlow) {
        return (
            <div className={styles.wrapper}>
                <MainButton
                    text="Начать игру"
                    extraStyles={{ width: "100%" }}
                />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>Live Actions</div>
    );
}
