import { FullscreenMessage } from "stores/Game";

import "./Board.scss";

interface BoardInfoProps {
    board: FullscreenMessage[];
}

const setFit = (msg: FullscreenMessage) => {
    if (msg.classes === undefined) return [];
    if (msg.classes.length === 1 && msg.classes[0] === "fit") {
        if (msg.text.length < 40) return ["h2"];
        if (msg.text.length < 300) return ["h3"];
        if (msg.text.length < 500) return ["h4"];
        if (msg.text.length < 900) return ["h5"];
        return ["h6"];

    }
    return msg.classes;
};

export default function BoardInfo({ board }: BoardInfoProps) {
    return (
        <div className="board block full-screen">
            {
                board.map((msg, index) => {
                    const classes = setFit(msg);
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
