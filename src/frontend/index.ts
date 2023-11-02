import { Shogi } from './models/game.js';
import Board from './models/board.js';
import Player from './models/player.js';


const player1 = new Player('Jun', true);
const player2 = new Player('Miho', false);

const board = new Board();
const game = new Shogi(board, player1, player2)