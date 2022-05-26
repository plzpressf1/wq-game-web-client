import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import openSocket from "socket.io-client";

import { WsEndpoint } from "../../api/common";
import { UserStore } from "../../stores/User";

import Spectators from "./Spectators";

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
    role: PlayerRole;
}

interface IPlayersList {
    spectators: IPlayer[];
    players: IPlayer[];
    leader: IPlayer | null;
}

function LobbyPage() {
    const [spectators, setSpectators] = useState<IPlayer[]>([]);
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [leader, setLeader] = useState<IPlayer | null>(null);

    useEffect(() => {
        const socket = openSocket(WsEndpoint, {
            path: "/game",
            query: {
                userId: UserStore.user?._id,
                gameId: UserStore.game?._id,
            }
        });
        socket.on("players/list", handlePlayersList);

        return () => {
            socket.disconnect();
        };
    }, []);

    const handlePlayersList = (resp: IPlayersList) => {
        setSpectators(resp.spectators);
        setPlayers(resp.players);
        setLeader(resp.leader);
    };

    return (
        <div>
            <Spectators spectators={spectators}/>
        </div>
    );
}

export default observer(LobbyPage);
