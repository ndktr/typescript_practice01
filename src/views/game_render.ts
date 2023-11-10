import { BoardStatus } from "../types/boardTypes";

import { handleClick } from "../events/board.js";

export default class GameRender {
  constructor() {
    //
  }

  showCurrentTurn(currentTurn: number): void {
    const turnAreaDom: HTMLElement | null = document.getElementById('turn');
    if (turnAreaDom === null) return;
    const playerAreaDom: HTMLElement | null = turnAreaDom.querySelector('#player');
    if (playerAreaDom === null) return;
    // playerAreaDom.classList.add('')
    playerAreaDom.innerText = `Player${currentTurn}`;
  }

  showCurrentBoard(currentBoardStatus: BoardStatus): void {
    const boardDom: HTMLElement | null = document.getElementById('board');
    if (boardDom === null) return;
    let boardChildDom: string = ''; 
    currentBoardStatus.forEach((row, rowIndex) => {
      boardChildDom += '<div class="row">';
      boardChildDom += (row.map((piece, cellIndex) => {
        let cellDom: string = `<div class="cell" data-row=${rowIndex} data-cell=${cellIndex}>`;
        if (typeof piece != 'string') cellDom += (
          `<span class="piece player${piece.player_number}">${piece.displayName}</span>`);
        cellDom += '</div>'; 
        return cellDom
      }).join(''));
      boardChildDom += '</div>';
    });
    boardDom.innerHTML = boardChildDom;
    boardDom.addEventListener('click', handleClick);
  };

  showWelcomeMessage(message: string): void {
    while (true) {
      const answer: boolean = confirm(message);
      if (answer) break;
    };
  };
}