import { IPlayer, PlayerStatus } from "./LobbyPage";

import styles from "./Spectators.module.scss";

interface SpectatorProps {
    spectators: IPlayer[];
}

export default function Spectators({ spectators }: SpectatorProps) {
    return (
        <div className={styles.spectators}>
            {
                spectators.map(player => {
                    const specStyle = [styles.spectator];
                    if (player.status === PlayerStatus.NOT_CONNECTED) {
                        specStyle.push(styles.disconnected);
                    }
                    return <span
                        key={player._id}
                        className={specStyle.join(" ")}
                    >
                        {player.name}
                    </span>;
                })
            }
        </div>
    );
}
