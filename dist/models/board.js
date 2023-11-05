import { Pawn } from './piece.js';
export default class Board {
    status;
    constructor() {
        this.status = [
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
        ];
    }
    ;
    updateStatusByRow(index, row) {
        this.status[index] = row;
    }
    updateStatusByPiece(piece) {
        const row = piece.position[0];
        const column = piece.position[1];
        this.status[row][column] = piece;
    }
    setInitialPositionForPlayer1() {
        const row2 = this.status[2];
        for (let i = 0; i < 9; i++) {
            const pawn = new Pawn([2, i], 'player1');
            row2[i] = pawn;
            this.updateStatusByRow(2, row2);
        }
    }
    ;
    render() {
        const boardDom = document.getElementById('board');
        if (boardDom === null)
            return;
        let boardChildDom = '';
        console.log(this.status);
        this.status.forEach(row => {
            boardChildDom += '<div class="row">';
            boardChildDom += (row.map(piece => {
                if (typeof piece === 'string')
                    return `<div class="cell">${piece}</div>`;
                return `<div class="cell">${piece.role}</div>`;
            }).join(''));
            boardChildDom += '</div>';
        });
        boardDom.innerHTML = boardChildDom;
    }
}
