import { BoardStatus, RowStatus } from '../types/boardTypes';

import {
  King, Rook, Bishop, Gold, Silver, Knight, Lance, Pawn
} from './piece.js';

export default class Board {
  private status: BoardStatus;

  constructor() {
    this.status = Board.setPiecesToInitialPosition();
  };

  private static setPiecesToInitialPosition(): BoardStatus {
    const initialStatus: BoardStatus = Array.from(
      {length: 9}, () => Array.from({length: 9}, () => ''));
    const rowsWithPlayer1: BoardStatus = (
      Board.setPiecesToInitPerPlayer(1).reverse());
    const rowsWithPlayer2: BoardStatus = Board.setPiecesToInitPerPlayer(2);
    initialStatus.splice(6, 9, ...rowsWithPlayer1);
    initialStatus.splice(0, 3, ...rowsWithPlayer2);
    return initialStatus;
  };

  private static setPiecesToInitPerPlayer(player_number: number): BoardStatus {
    const row1: string[] = Array.from({length: 9}, () => '');
    const row2: string[] = Array.from({length: 9}, () => '');
    const row3: string[] = Array.from({length: 9}, () => '');

    const row1SettedPieces: RowStatus = row1.map((_, index) => {
      if (index === 0) return new Lance(player_number); 
      if (index === 1) return new Knight(player_number); 
      if (index === 2) return new Silver(player_number); 
      if (index === 3) return new Gold(player_number); 
      if (index === 4) return new King(player_number); 
      if (index === 5) return new Gold(player_number); 
      if (index === 6) return new Silver(player_number); 
      if (index === 7) return new Knight(player_number); 
      if (index === 8) return new Lance(player_number); 
      return ''
    });
    const row2SettedPieces: RowStatus = row2.map((cell, index) => {
      if (player_number == 1) {
        if (index === 1) return new Bishop(player_number);
        if (index === 7) return new Rook(player_number);
      }
      if (player_number == 2) {
        if (index === 1) return new Rook(player_number);
        if (index === 7) return new Bishop(player_number);
      }
      return cell 
    });
    const row3SettedPieces: RowStatus = (
      row3.map(_ => new Pawn(player_number)));

    return [row1SettedPieces, row2SettedPieces, row3SettedPieces];
  };

  public getCurrentStatus(): BoardStatus {
    return this.status;
  };
};