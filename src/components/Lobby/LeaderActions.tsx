import { GameStore } from "stores/Game";
import { lobbyWs } from "../../api/ws";

import MainButton from "./MainButton";

import styles from "./LeaderActions.module.scss";

export default function LeaderActions() {
    if (!GameStore.gameFlow) {
        return (
            <div className={styles.wrapper}>
                <MainButton
                    text="Начать игру"
                    extraStyles={{ width: "100%" }}
                    onClick={() => lobbyWs.emit("game-flow/start")}
                />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>Live Actions</div>
    );
}
