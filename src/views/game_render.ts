import { BoardStatus } from "../types/boardTypes";

export default class GameRender {
  constructor() {
    return;
  }

  showCurrentBoard(currentBoardStatus: BoardStatus): void {
    const boardDom: HTMLElement | null = document.getElementById('board');
    if (boardDom === null) return;
    let boardChildDom: string = ''; 
    currentBoardStatus.forEach(row => {
      boardChildDom += '<div class="row">';
      boardChildDom += (row.map(piece => {
        if (typeof piece === 'string') return `<div class="cell">${piece}</div>`;
        return `<div class="cell"><span class="player${piece.player_number}">${piece.displayName}</span></div>`;
      }).join(''));
      boardChildDom += '</div>';
    });
    boardDom.innerHTML = boardChildDom;
  };

  showWelcomeMessage(message: string): void {
    while (true) {
      const answer: boolean = confirm(message);
      if (answer) break;
    };
  };
}