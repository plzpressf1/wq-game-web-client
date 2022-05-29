import { FullscreenMessage } from "stores/Game";

import "./Board.scss";

interface BoardInfoProps {
    board: FullscreenMessage[];
}

export default function BoardInfo({ board }: BoardInfoProps) {
    return (
        <div className="board block full-screen">
            {
                board.map((msg, index) => {
                    const classes = msg.classes || [];
                    classes.push("message");
                    return <div
                        key={index}
                        className={classes.join(" ")}
                    >
                        {msg.text}
                    </div>;
                })
            }
        </div>
    );
}
