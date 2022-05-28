import { observer } from "mobx-react";

import { GameStore } from "stores/Game";
import { lobbyWs } from "../../api/ws";

import MainButton from "./MainButton";

import styles from "./LeaderActions.module.scss";

function LeaderActions() {
    if (!GameStore.isRunning) {
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

export default observer(LeaderActions);
