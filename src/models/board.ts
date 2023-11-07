import { Piece, King, Rook, Bishop, Gold, Silver, Knight, Lance, Pawn } from './piece.js';

export default class Board {
  status: string[][] | Piece[][];

  private static initialPosition: string[][] = [
    ['Lance', 'Knight', 'Silver', 'Gold', 'King', 'Gold', 'Silver', 'Knight', 'Lance'],
    ['', 'Bishop', '', '', '', '', '', 'Rook', ''],
    ['Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn'],
  ];

  constructor() {
    this.status = [
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
    ];
  };

  updateStatusByRow(index: number, row: string[] | Piece[]): void {
    this.status[index] = row;
  }
  
  setPiecesToInitialPosition() {
    this.setPiecesToInitialPositionForPlayer1();
  };

  setPiecesToInitialPositionForPlayer1() {
    const initialPositionForPlayer1 = Board.initialPosition;
    initialPositionForPlayer1.map(row => {
      console.log(row);
      row.map(piece => new (eval(piece))('player1'));
    });
    console.log(initialPositionForPlayer1)
  }
 
  setInitialPositionForPlayer2() {
    const row2: string[] | Piece[] = this.status[2];
    for (let i = 0; i < 9; i++) {
      const pawn = new Pawn('player2');
      row2[i] = pawn;
    }
    this.updateStatusByRow(2, row2);
  };

  render(): void {
    const boardDom: HTMLElement | null = document.getElementById('board');
    if (boardDom === null) return;
    let boardChildDom: string = ''; 
    this.status.forEach(row => {
      boardChildDom += '<div class="row">';
      boardChildDom += (row.map(piece => {
        if (typeof piece === 'string') return `<div class="cell">${piece}</div>`;
        return `<div class="cell"><span class="${piece.player}">${piece.role}</span></div>`;
      }).join(''));
      boardChildDom += '</div>';
    });
    boardDom.innerHTML = boardChildDom;
  }
}