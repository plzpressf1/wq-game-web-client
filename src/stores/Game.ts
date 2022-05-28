import { observable, action, makeObservable } from "mobx";

import { IUser } from "api/games";
import { LobbySlot } from "components/Lobby/UserSlot";

export enum ParticipantStatus {
    NOT_CONNECTED,
    CONNECTED,
}

export enum ParticipantRole {
    SPECTATOR,
    LEADER,
    PLAYER,
}

export interface IParticipant {
    _id: string;
    name: string;
    status: ParticipantStatus;
    slot: LobbySlot;
    score: number;
}

interface IParticipantsList {
    playerSlots: number;
    spectators: IParticipant[];
    players: IParticipant[];
    leader: IParticipant | null;
}

export enum BoardStateType {
    FULLSCREEN,
    TABLE,
}

export interface IFullscreenMessage {
    text: string;
    classes?: string[];
}

export interface IBoardTheme {
    name: string;
    questions: string[];
}

interface IBoardState {
    type: BoardStateType;
    messages: IFullscreenMessage[];
    table: IBoardTheme[];
}

class Store {
    playerSlots: number = 0;
    spectators: IParticipant[] = [];
    players: IParticipant[] = [];
    leader: IParticipant | null = null;
    isRunning = false;
    board: IBoardState | null = null;

    constructor() {
        makeObservable(this, {
            playerSlots: observable,
            spectators: observable,
            players: observable,
            leader: observable,
            isRunning: observable,
            board: observable,

            updateParticipantsList: action,
            cleanGameFlow: action,
            dispatchBoard: action,
            isLeader: action,
        });
    }

    updateParticipantsList(playersList: IParticipantsList) {
        this.playerSlots = playersList.playerSlots;
        this.spectators = playersList.spectators;
        this.players = playersList.players;
        this.leader = playersList.leader;
    }

    cleanGameFlow() {
        this.isRunning = false;
        this.board = null;
    }

    dispatchBoard(state: IBoardState) {
        this.board = state;
    }

    isLeader(user: IUser | null) {
        return user && this.leader?._id === user._id;
    }
}

export const GameStore = new Store();
