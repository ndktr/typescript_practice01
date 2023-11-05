import Message from './message.js';
import Board from './board.js';
export class Shogi {
    board;
    message;
    constructor() {
        this.board = new Board();
        this.message = new Message();
    }
    ;
    renderMessage(situation) {
        while (true) {
            if (confirm(this.message.returnMessage(situation)))
                break;
        }
    }
    ;
    start() {
        this.board.render();
        setTimeout(() => {
            this.renderMessage('welcome');
            this.board.setInitialPositionForPlayer1();
            this.board.setInitialPositionForPlayer2();
            this.board.render();
        }, 100);
    }
    ;
}
