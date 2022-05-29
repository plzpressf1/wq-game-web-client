import { RefObject } from "react";

import { lobbyWs } from "api/ws";
import { Participant, ParticipantRole } from "stores/Game";
import useHover from "hooks/useHover";

import "styles/shadows.scss";
import styles from "./UserSlot.module.scss";
import { ReactComponent as EditSvg } from "svg/edit.svg";

export interface LobbySlot {
    role: ParticipantRole;
    index?: number;
}

function UserSlotName({ name } : { name: string }) {
    return (
        <div className={styles.name}>{name}</div>
    )
}

function EditUserButton() {
    return <div className={styles.edit}><EditSvg/></div>;
}

interface UserSlotProps {
    user: Participant | null;
    slot: LobbySlot;
}

export default function UserSlot({ user, slot }: UserSlotProps) {
    const inlineStyle = {
        width: slot.role === ParticipantRole.LEADER ? 217 : 147,
        height: slot.role === ParticipantRole.LEADER ? 290 : 197,
    };
    const [ref, isHover] = useHover();
    const classes = [styles.slot, "basic-shadow"];

    if (!user) classes.push(styles.empty);
    return (
        <div
            className={classes.join(" ")}
            style={inlineStyle}
            onClick={() => lobbyWs.emit("participants/slot", { slot })}
            ref={ref as RefObject<HTMLDivElement>}
        >
            {user && <UserSlotName name={user.name}/>}
            {user && isHover && <EditUserButton/>}
        </div>
    );
}
