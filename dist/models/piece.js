export class Piece {
    role;
    player;
    position;
    movableAreas;
    constructor(position, player) {
        this.role = '歩';
        this.player = player;
        this.position = position;
        const row = position[0];
        const column = position[1];
        this.movableAreas = [[row + 1, column]];
    }
}
export class Pawn extends Piece {
    constructor(position, player) {
        super(position, player);
    }
}
// export class Rook extends Piece {
//   constructor(position: number[], player: string) {
//     super(position, player);
//     this.role = '飛'
//     const row = position[0];
//     const column = position[1];
//     this.movableAreas = [[0, column], [8, column], [row, 0], [row, 8]];
//   }
// }
// export class Bishop extends Piece {
//   constructor(position: number[], player: string) {
//     super(position, player);
//     this.role = '角'
//     const row = position[0];
//     const column = position[1];
//     this.movableAreas = [[row-1, column-1], [row-1, column+1], [row+1, column-1], [row+1, column+1]];
//   }
// }
