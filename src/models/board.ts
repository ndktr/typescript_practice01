import { Piece, King, Rook, Bishop, Gold, Silver, Knight, Lance, Pawn } from './piece.js';

export default class Board {
  status: (string | Piece)[][];

  constructor() {
    this.status = this.setPiecesToInitialPosition();
  };

  setPiecesToInitialPosition() {
    const rowsWithPlayer1 = (
      this.setPiecesToInitialPositionPerPlayer(1).reverse());
    const rowsWithPlayer2 = this.setPiecesToInitialPositionPerPlayer(2);
    const initialStatus: (string | Piece)[][] = Array.from(
      {length: 9}, () => Array.from({length: 9}, () => ''));
    initialStatus.splice(6, 9, ...rowsWithPlayer1);
    initialStatus.splice(0, 3, ...rowsWithPlayer2);
    console.log(initialStatus);
    return initialStatus;
  };

  setPiecesToInitialPositionPerPlayer(player_number: number) {
    const row1: string[] = Array.from({length: 9}, () => '');
    const row2: string[] = Array.from({length: 9}, () => '');
    const row3: string[] = Array.from({length: 9}, () => '');

    const row1SettedPieces: (string | Piece)[] = row1.map((_, index) => {
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
    })
    const row2SettedPieces: (string | Piece)[] = row2.map((cell, index) => {
      if (player_number == 1) {
        if (index === 1) return new Bishop(player_number);
        if (index === 7) return new Rook(player_number);
      }
      if (player_number == 2) {
        if (index === 1) return new Rook(player_number);
        if (index === 7) return new Bishop(player_number);
      }
      return cell 
    })
    const row3SettedPieces: (string | Piece)[] = (
      row3.map(_ => new Pawn(player_number)));

    return [row1SettedPieces, row2SettedPieces, row3SettedPieces];
  }

  render(): void {
    const boardDom: HTMLElement | null = document.getElementById('board');
    if (boardDom === null) return;
    let boardChildDom: string = ''; 
    this.status.forEach(row => {
      boardChildDom += '<div class="row">';
      boardChildDom += (row.map(piece => {
        if (typeof piece === 'string') return `<div class="cell">${piece}</div>`;
        return `<div class="cell"><span class="player${piece.player_number}">${piece.displayName}</span></div>`;
      }).join(''));
      boardChildDom += '</div>';
    });
    boardDom.innerHTML = boardChildDom;
  }
}