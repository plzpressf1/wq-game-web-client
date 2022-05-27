import openSocket, { Socket } from "socket.io-client";
import { WsEndpoint } from "./common";

export let lobbyWs: Socket;

export const openLobbyWs = (userId: string | undefined, gameId: string | undefined) => {
    lobbyWs = openSocket(WsEndpoint, {
        path: "/game",
        query: { userId, gameId }
    });
    return lobbyWs;
};
