import Message from './message.js';
import Board from './board.js';

type Game = {
  start(): void
};

export class Shogi implements Game {
  board: Board;
  message: Message;

  constructor() {
    this.board = new Board();
    this.message = new Message();
  };

  renderMessage(situation: string): void {
    while (true) {
      if (confirm(this.message.returnMessage(situation))) break;
    }
  };

  setPiecesToInitialPosition(): void {
    this.board.setPiecesToInitialPosition();
  }

  start() {
    this.board.render();
    setTimeout(() => {
      this.renderMessage('welcome')
      this.setPiecesToInitialPosition();
      this.board.render();
    }, 100);
  };
}