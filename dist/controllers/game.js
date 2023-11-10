// import Message from '../models/message.js';
import Board from '../models/board.js';
import Turn from '../models/turn.js';
import GameRender from '../views/game_render.js';
export default class Game {
    // private static message: Message = new Message();
    static board = new Board();
    static turn = new Turn();
    static render = new GameRender();
    welcome() {
        const currentBoardStatus = Game.board.getCurrentStatus();
        Game.render.showCurrentBoard(currentBoardStatus);
        const currentTurn = Game.turn.getCurrent();
        Game.render.showCurrentTurn(currentTurn);
    }
    ;
    start() {
    }
}
