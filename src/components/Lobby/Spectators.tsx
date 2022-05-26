import { IPlayer } from "./LobbyPage";

interface SpectatorProps {
    spectators: IPlayer[];
}

export default function Spectators({ spectators }: SpectatorProps) {
    return (
        <div>
            <span>spectators: </span>
            {
                spectators.map(player => <span>{player.name} {player.status} </span>)
            }
        </div>
    );
}
