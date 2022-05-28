import { lobbyWs } from "api/ws";

import { IPlayer, PlayerRole, PlayerStatus } from "stores/Game";

import styles from "./Spectators.module.scss";

interface SpectatorProps {
    spectators: IPlayer[];
}

export default function Spectators({ spectators }: SpectatorProps) {
    const slot = { role: PlayerRole.SPECTATOR };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <button
                    className={styles.button}
                    onClick={() => lobbyWs.emit("players/slot", { slot })}
                >
                    Зрители
                </button>
            </div>
            <div className={styles.spectators}>
                {
                    spectators.map((player) => {
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
        </div>
    );
}
