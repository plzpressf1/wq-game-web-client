import { IGame } from "../api/games";

interface GameItemProps {
    game: IGame;
}

export default function GameItem({ game }: GameItemProps) {
    return (
        <div className="game">
            {game._id} - {game.name}
        </div>
    );
}
