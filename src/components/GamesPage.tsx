import DebouncedInput from "./DebouncedInput";

import "../styles/games.css";

export default function GamesPage() {
    return (
        <div className="search">
            <DebouncedInput
                autoFocus
                className="search-input"
                placeholder="Поиск игры..."
                callback={(value: string) => console.log(value)}
            />
        </div>
    );
}
