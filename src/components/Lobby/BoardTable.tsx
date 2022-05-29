import { lobbyWs } from "api/ws";
import { BoardTheme, Question } from "stores/Game";

import "./Board.scss";

interface BoardMainProps {
    board: BoardTheme[];
}

function Theme({ themeIndex, theme } : { themeIndex: number, theme: BoardTheme }) {
    const onQuestionClick = (questionIndex: number) => {
        lobbyWs.emit("game-flow/pick", { themeIndex, questionIndex });
    };

    const themeClass = ["block", "name"]
    if (theme.name.length > 20) themeClass.push("small");

    const prepareReward = (question: Question) => {
        if (!question.available) return "";
        let reversed = question.reward.toString().split("").reverse().join("");
        reversed = reversed.slice(0, 3) + " " + reversed.slice(3);
        return reversed.split("").reverse().join("");
    };

    return (
        <div className="theme">
            <div className={themeClass.join(" ")}><span>{theme.name}</span></div>
            {
                theme.questions.map((question, questionIndex) =>
                    <div
                        key={questionIndex}
                        className="block question"
                        onClick={() => onQuestionClick(questionIndex)}
                    >
                        {prepareReward(question)}
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
                board.map((theme, themeIndex) =>
                    <Theme
                        key={themeIndex}
                        theme={theme}
                        themeIndex={themeIndex}
                    />
                )
            }
        </div>
    );
}
