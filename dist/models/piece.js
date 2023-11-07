export class Piece {
    role;
    player;
    constructor(player) {
        this.role = 'pawn';
        this.player = player;
    }
}
export class King extends Piece {
    constructor(player) {
        super(player);
        this.role = 'king';
    }
}
export class Rook extends Piece {
    constructor(player) {
        super(player);
        this.role = 'rook';
    }
}
export class Bishop extends Piece {
    constructor(player) {
        super(player);
        this.role = 'bishop';
    }
}
export class Gold extends Piece {
    constructor(player) {
        super(player);
        this.role = 'gold';
    }
}
export class Silver extends Piece {
    constructor(player) {
        super(player);
        this.role = 'silever';
    }
}
export class Knight extends Piece {
    constructor(player) {
        super(player);
        this.role = 'knight';
    }
}
export class Lance extends Piece {
    constructor(player) {
        super(player);
        this.role = 'lance';
    }
}
export class Pawn extends Piece {
    constructor(player) {
        super(player);
    }
}
