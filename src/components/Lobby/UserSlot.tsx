import {lobbyWs} from "api/ws";

import { IPlayer, PlayerRole } from "stores/Game";

import "styles/shadows.scss";
import styles from "./UserSlot.module.scss";

export interface LobbySlot {
    role: PlayerRole;
    index?: number;
}

interface UserSlotProps {
    user: IPlayer | null;
    slot: LobbySlot;
}

function UserSlotName({ name } : { name: string }) {
    return (
        <div className={styles.name}>{name}</div>
    )
}

export default function UserSlot({ user, slot }: UserSlotProps) {
    const inlineStyle = {
        width: slot.role === PlayerRole.LEADER ? 217 : 147,
        height: slot.role === PlayerRole.LEADER ? 290 : 197,
    };

    const classes = [styles.slot, "basic-shadow"];
    if (!user) classes.push(styles.empty);

    return (
        <div
            className={classes.join(" ")}
            style={inlineStyle}
            onClick={() => lobbyWs.emit("players/slot", { slot })}
        >
            { user && <UserSlotName name={user.name}/> }
        </div>
    );
}
