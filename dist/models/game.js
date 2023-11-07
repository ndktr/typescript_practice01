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
    setPiecesToInitialPosition() {
        this.board.setPiecesToInitialPosition();
    }
    start() {
        this.board.render();
        setTimeout(() => {
            this.renderMessage('welcome');
            this.setPiecesToInitialPosition();
            this.board.render();
        }, 100);
    }
    ;
}
