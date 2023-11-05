import Message from './message.js';
import Player from './player.js';
import Board from './board.js';
export class Shogi {
    board;
    player1;
    player2;
    message;
    constructor() {
        this.board = new Board();
        this.player1 = new Player();
        this.player2 = new Player();
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
            this.board.render();
        }, 100);
    }
    ;
}
