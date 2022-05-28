import { IBoardTheme } from "stores/Game";

import "./Board.scss";

interface BoardMainProps {
    board: IBoardTheme[];
}

function Theme({ theme } : { theme: IBoardTheme }) {
    return (
        <div className="theme">
            <div className="block name">{theme.name}</div>
            {
                theme.questions.map((reward, index) =>
                    <div
                        key={index}
                        className="block question"
                    >
                        {reward}
                    </div>
                )
            }
        </div>
    );
}

export default function BoardTable({ board }: BoardMainProps) {
    return (
        <div className="board main">
            {
                board.map((theme, index) =>
                    <Theme
                        key={index}
                        theme={theme}
                    />
                )
            }
        </div>
    );
}
