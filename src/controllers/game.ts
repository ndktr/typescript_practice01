import { BoardStatus } from '../types/boardTypes.js';

// import Message from '../models/message.js';
import Board from '../models/board.js';
import Turn from '../models/turn.js';
import GameRender from '../views/game_render.js';

export default class Game {
  // private static message: Message = new Message();
  private static board: Board = new Board();
  private static turn: Turn=  new Turn();
  private static render: GameRender = new GameRender();

    public welcome(): void {
      const currentBoardStatus: BoardStatus = Game.board.getCurrentStatus();
      Game.render.showCurrentBoard(currentBoardStatus); 
      const currentTurn: number = Game.turn.getCurrent();
      Game.render.showCurrentTurn(currentTurn);
    };

    public start():void {

    }
}