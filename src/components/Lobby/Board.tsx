import { observer } from "mobx-react";

import { BoardStateType, GameStore } from "stores/Game";

import BoardInfo from "./BoardInfo";
import BoardTable from "./BoardTable";

function Board() {
    if (!GameStore.board) return null;

    switch (GameStore.board.type) {
        case BoardStateType.FULLSCREEN:
            return <BoardInfo board={GameStore.board.messages}/>;
        case BoardStateType.TABLE:
            return <BoardTable board={GameStore.board.table}/>;
    }

    return null;
}

export default observer(Board);
