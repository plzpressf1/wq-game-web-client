import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { openLobbyWs } from "api/ws";
import { UserStore } from "stores/User";

import Spectators from "./Spectators";
import UserSlot, { LobbySlot } from "./UserSlot";
import Players from "./Players";
import Board from "./Board";

import styles from "./LobbyPage.module.scss";

export enum PlayerStatus {
    NOT_CONNECTED,
    CONNECTED,
}

export enum PlayerRole {
    SPECTATOR,
    LEADER,
    PLAYER,
}

export interface IPlayer {
    _id: string;
    name: string;
    status: PlayerStatus;
    slot: LobbySlot;
}

interface IPlayersList {
    maxPlayers: number;
    spectators: IPlayer[];
    players: IPlayer[];
    leader: IPlayer | null;
}

function LobbyPage() {
    const [maxPlayers, setMaxPlayers] = useState<number>(0);
    const [spectators, setSpectators] = useState<IPlayer[]>([]);
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [leader, setLeader] = useState<IPlayer | null>(null);

    useEffect(() => {
        const socket = openLobbyWs(UserStore.user?._id, UserStore.game?._id);
        socket.on("players/list", handlePlayersList);

        return () => {
            socket.disconnect();
        };
    }, []);

    const handlePlayersList = (resp: IPlayersList) => {
        setMaxPlayers(resp.maxPlayers);
        setSpectators(resp.spectators);
        setPlayers(resp.players);
        setLeader(resp.leader);
    };

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <div className={styles.bottom}>
                    <Spectators spectators={spectators}/>
                </div>
                <div
                    className={`${styles.panel} ${styles.leader}`}
                >
                    <UserSlot
                        user={leader}
                        slot={{ role: PlayerRole.LEADER }}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <div className={`${styles.bottom} ${styles.panel} ${styles.players}`}>
                    <Players
                        maxPlayers={maxPlayers}
                        players={players}
                    />
                </div>
                <div
                    className={styles.panel}
                    style={{ height: "100%" }}
                >
                    <Board/>
                </div>
            </div>
        </div>
    );
}

export default observer(LobbyPage);
