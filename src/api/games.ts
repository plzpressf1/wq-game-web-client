import { AxiosResponse } from "axios";

import $api from "./common";

export interface IPlayer {
    _id: string;
    name: string;
}

export interface IPack {
    _id: string;
    name: string;
    description: string;
}

export interface IGame {
    _id: string;
    name: string;
    host: IPlayer;
    pack: IPack;
    maxPlayers: number;
    players: IPlayer[];
}

export interface GamesResponse {
    games: IGame[];
}

export async function searchGamesByFilter(filter: string): Promise<AxiosResponse<GamesResponse>> {
    return $api.get<GamesResponse>(`/games?filter=${filter}`);
}
