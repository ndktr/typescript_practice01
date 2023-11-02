import Board from './board.js';
import Player from './player.js';

type Game = {
  start(): void
}

export class Shogi implements Game {
  board: Board;
  player1: Player;
  player2: Player;

  constructor(board: Board, player1: Player, player2: Player) {
    this.board = board
    this.player1 = player1
    this.player2 = player2
  }

  start() {
    console.log('start')
  }
}