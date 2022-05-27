import { IPlayer } from "./LobbyPage";

import styles from "./Players.module.scss";

interface PlayersProps {
    maxPlayers: number;
    players: IPlayer[];
}

const prepPlayers = ({ maxPlayers, players }: PlayersProps) => {
    const res = [];
    for (let i = 0; i < maxPlayers; ++i) {
        res.push({
            key: i,
            value: null,
        });
    }
    return res;
};

export default function Players(props: PlayersProps) {
    const players = prepPlayers(props);
    return (
        <div className={styles.wrapper}>
            {
                players.map(player =>
                    <div
                        key={player.key}
                        className={styles.player}
                    />
                )
            }
        </div>
    );
}
