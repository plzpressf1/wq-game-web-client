import { IParticipant, ParticipantRole } from "stores/Game";

import UserSlot from "./UserSlot";

import styles from "./Players.module.scss";

interface PlayersProps {
    playerSlots: number;
    players: IParticipant[];
}

const prepPlayers = ({ playerSlots, players }: PlayersProps) => {
    const getPlayerInSlot = (index: number) => {
        for (const player of players) {
            if (player.slot.index === index) return player;
        }
        return null;
    };

    const res = [];
    for (let key = 0; key < playerSlots; ++key) {
        res.push({ key, value: getPlayerInSlot(key) });
    }
    return res;
};

export default function Players(props: PlayersProps) {
    const players = prepPlayers(props);
    return (
        <div className={styles.wrapper}>
            {
                players.map((player) =>
                    <UserSlot
                        key={player.key}
                        user={player.value}
                        slot={{ role: ParticipantRole.PLAYER, index: player.key }}
                    />
                )
            }
        </div>
    );
}
