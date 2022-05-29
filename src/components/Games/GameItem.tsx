import { Game, User } from "api/games";

import GameItemPlayer from "./GameItemPlayer";
import JoinGameButton from "./JoinGameButton";

import styles from "./GameItem.module.scss";

interface GameItemProps {
    game: Game;
}

function useParticipantsList(game: Game): [User[], boolean] {
    const participants = [...game.participants];
    for (let i = participants.length; i < game.playerSlots; ++i) {
        participants.push({
            _id: i.toString(),
            name: "",
        });
    }
    return [participants, game.participants.length !== game.playerSlots];
}

export default function GameItem({ game }: GameItemProps) {
    const [participants, canJoin] = useParticipantsList(game);

    return (
        <li className={styles.game}>
            <div className={styles.info}>
                <span className={styles.name}>{game.name}</span>
                <span className={styles.pack}>{game.pack.name}</span>
                <span className={styles.description}>{game.pack.description}</span>
            </div>
            <div className={styles.actions}>
                <ul className={styles.players}>
                    {
                        participants.map((participant) =>
                            <GameItemPlayer
                                key={participant._id}
                                participant={participant}
                            />
                        )
                    }
                </ul>
                { canJoin && <JoinGameButton/> }
            </div>
        </li>
    );
}
