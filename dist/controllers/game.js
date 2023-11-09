import Message from '../models/message.js';
import Board from '../models/board.js';
import GameRender from '../views/game_render.js';
export default class Game {
    static board = new Board;
    static message = new Message;
    static render = new GameRender;
    welcome() {
        const currentBoardStatus = Game.board.getCurrentStatus();
        Game.render.showCurrentBoard(currentBoardStatus);
        setTimeout(() => {
            const welcomeMessage = Game.message.getWelcome();
            Game.render.showWelcomeMessage(welcomeMessage);
        }, 100);
    }
    ;
}
