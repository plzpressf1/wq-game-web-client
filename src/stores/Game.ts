import { observable, action, makeObservable } from "mobx";

import { User } from "api/games";
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

export interface Participant {
    _id: string;
    name: string;
    status: ParticipantStatus;
    slot: LobbySlot;
    score: number;
}

interface ParticipantsList {
    playerSlots: number;
    spectators: Participant[];
    players: Participant[];
    leader: Participant | null;
}

export interface FullscreenMessage {
    text: string;
    classes?: string[];
}

export interface BoardTheme {
    name: string;
    questions: string[];
}

export enum BoardStateType {
    FULLSCREEN,
    TABLE,
}

interface BoardState {
    type: BoardStateType;
    messages: FullscreenMessage[];
    table: BoardTheme[];
}

export enum LogicStateType {
    PICK,
    QUESTION,
    ANSWER,
}

interface LogicState {
    type: LogicStateType;
    userId: string;
}

class Store {
    playerSlots: number = 0;
    spectators: Participant[] = [];
    players: Participant[] = [];
    leader: Participant | null = null;
    isRunning = false;
    board: BoardState | null = null;
    logic: LogicState | null = null;

    constructor() {
        makeObservable(this, {
            playerSlots: observable,
            spectators: observable,
            players: observable,
            leader: observable,
            isRunning: observable,
            board: observable,
            logic: observable,

            updateParticipantsList: action,
            cleanGameFlow: action,
            dispatchBoard: action,
            dispatchLogic: action,
            isLeader: action,
        });
    }

    updateParticipantsList(playersList: ParticipantsList) {
        this.playerSlots = playersList.playerSlots;
        this.spectators = playersList.spectators;
        this.players = playersList.players;
        this.leader = playersList.leader;
    }

    cleanGameFlow() {
        this.isRunning = false;
        this.board = null;
    }

    dispatchBoard(state: BoardState) {
        this.board = state;
    }

    dispatchLogic(state: LogicState) {
        this.logic = state;
    }

    isLeader(user: User | null) {
        return user && this.leader?._id === user._id;
    }
}

export const GameStore = new Store();
