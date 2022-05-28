import { observable, action, makeObservable } from "mobx";

import { IUser } from "api/games";
import { LobbySlot } from "components/Lobby/UserSlot";

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

class Store {
    maxPlayers: number = 0;
    spectators: IPlayer[] = [];
    players: IPlayer[] = [];
    leader: IPlayer | null = null;

    constructor() {
        makeObservable(this, {
            maxPlayers: observable,
            spectators: observable,
            players: observable,
            leader: observable,

            updatePlayersList: action,
        });
    }

    updatePlayersList(playersList: IPlayersList) {
        this.maxPlayers = playersList.maxPlayers;
        this.spectators = playersList.spectators;
        this.players = playersList.players;
        this.leader = playersList.leader;
    }

    isLeader(user: IUser | null) {
        return user && this.leader?._id === user._id;
    }
}

export const GameStore = new Store();
