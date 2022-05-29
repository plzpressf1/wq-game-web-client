import { useEffect } from "react";
import { observer } from "mobx-react";
import { Socket } from "socket.io-client";

import { openLobbyWs } from "api/ws";
import { UserStore } from "stores/User";
import { GameStore, ParticipantRole } from "stores/Game";

import Spectators from "./Spectators";
import UserSlot from "./UserSlot";
import Players from "./Players";
import Board from "./Board";
import LeaderActions from "./LeaderActions";

import styles from "./LobbyPage.module.scss";

function LobbyPage() {
    useEffect(() => {
        const userId = UserStore.user?._id;
        const gameId = UserStore.game?._id;
        let socket: Socket;
        if (userId && gameId) {
            socket = openLobbyWs(userId, gameId);
            socket.on("participants/list", (resp) => GameStore.updateParticipantsList(resp));
            socket.on("game-flow/clean", () => GameStore.cleanGameFlow());
            socket.on("game-flow/board", (resp) => GameStore.dispatchBoard(resp));
            socket.on("game-flow/logic", (resp) => GameStore.dispatchLogic(resp));

            return () => {
                socket.disconnect();
            };
        }
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <div className={styles.bottom}>
                    <Spectators spectators={GameStore.spectators}/>
                </div>
                <div
                    className={`${styles.panel} ${styles.leader}`}
                >
                    <UserSlot
                        user={GameStore.leader}
                        slot={{ role: ParticipantRole.LEADER }}
                    />
                    {GameStore.isLeader(UserStore.user) && <LeaderActions/>}
                </div>
            </div>
            <div className={styles.right}>
                <div className={`${styles.bottom} ${styles.panel} ${styles.players}`}>
                    <Players
                        playerSlots={GameStore.playerSlots}
                        players={GameStore.players}
                    />
                </div>
                <div
                    className={styles.panel}
                    style={{ height: "100%", display: "flex", overflowY: "hidden" }}
                >
                    <Board/>
                </div>
            </div>
        </div>
    );
}

export default observer(LobbyPage);
