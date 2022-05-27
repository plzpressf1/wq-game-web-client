import {IPlayer, PlayerRole} from "./LobbyPage";

import UserSlot from "./UserSlot";

import styles from "./Players.module.scss";

interface PlayersProps {
    maxPlayers: number;
    players: IPlayer[];
}

const prepPlayers = ({ maxPlayers, players }: PlayersProps) => {
    const getPlayerInSlot = (index: number) => {
        for (const player of players) {
            if (player.slot.index === index) return player;
        }
        return null;
    };

    const res = [];
    for (let key = 0; key < maxPlayers; ++key) {
        res.push({ key, value: getPlayerInSlot(key) });
    }
    return res;
};

export default function Players(props: PlayersProps) {
    const players = prepPlayers(props);
    return (
        <div className={styles.wrapper}>
            {
                players.map(player =>
                    <UserSlot
                        key={player.key}
                        user={player.value}
                        slot={{ role: PlayerRole.PLAYER, index: player.key }}
                    />
                )
            }
        </div>
    );
}
