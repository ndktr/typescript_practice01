import { handleClick } from "../events/board.js";
export default class GameRender {
    constructor() {
        //
    }
    showCurrentTurn(currentTurn) {
        const turnAreaDom = document.getElementById('turn');
        if (turnAreaDom === null)
            return;
        const playerAreaDom = turnAreaDom.querySelector('#player');
        if (playerAreaDom === null)
            return;
        playerAreaDom.innerText = `Player${currentTurn}`;
    }
    showCurrentBoard(currentBoardStatus) {
        const boardDom = document.getElementById('board');
        if (boardDom === null)
            return;
        let boardChildDom = '';
        currentBoardStatus.forEach((row, rowIndex) => {
            boardChildDom += '<div class="row">';
            boardChildDom += (row.map((piece, cellIndex) => {
                let cellDom = `<div class="cell" data-row=${rowIndex} data-cell=${cellIndex}>`;
                if (typeof piece != 'string')
                    cellDom += (`<span class="piece player${piece.player_number}">${piece.displayName}</span>`);
                cellDom += '</div>';
                return cellDom;
            }).join(''));
            boardChildDom += '</div>';
        });
        boardDom.innerHTML = boardChildDom;
        boardDom.addEventListener('click', handleClick);
    }
    ;
    showWelcomeMessage(message) {
        while (true) {
            const answer = confirm(message);
            if (answer)
                break;
        }
        ;
    }
    ;
}
