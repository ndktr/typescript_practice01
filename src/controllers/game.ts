import { BoardStatus } from '../types/boardTypes.js';

import Message from '../models/message.js';
import Board from '../models/board.js';
import GameRender from '../views/game_render.js';

export default class Game {
  private static board: Board = new Board;
  private static message: Message = new Message;
  private static render: GameRender = new GameRender;

  public welcome(): void {
    const currentBoardStatus: BoardStatus = Game.board.getCurrentStatus();
    Game.render.showCurrentBoard(currentBoardStatus); 
    setTimeout(() => {
      const welcomeMessage: string = Game.message.getWelcome();
      Game.render.showWelcomeMessage(welcomeMessage);
    }, 100);
  };
}