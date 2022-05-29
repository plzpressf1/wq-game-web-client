import { lobbyWs } from "api/ws";

import { Participant, ParticipantRole, ParticipantStatus } from "stores/Game";

import styles from "./Spectators.module.scss";

interface SpectatorProps {
    spectators: Participant[];
}

export default function Spectators({ spectators }: SpectatorProps) {
    const slot = { role: ParticipantRole.SPECTATOR };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <button
                    className={styles.button}
                    onClick={() => lobbyWs.emit("participants/slot", { slot })}
                >
                    Зрители
                </button>
            </div>
            <div className={styles.spectators}>
                {
                    spectators.map((participant) => {
                        const specStyle = [styles.spectator];
                        if (participant.status === ParticipantStatus.NOT_CONNECTED) {
                            specStyle.push(styles.disconnected);
                        }
                        return <span
                            key={participant._id}
                            className={specStyle.join(" ")}
                        >
                            {participant.name}
                        </span>;
                    })
                }
            </div>
        </div>
    );
}
