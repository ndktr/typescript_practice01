export class Piece {
    role;
    displayName;
    player_number;
    constructor(player_number) {
        this.role = 'pawn';
        this.displayName = this.role === 'pawn' ? '歩' : 'と';
        this.player_number = player_number;
    }
}
export class King extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'king';
        this.displayName = player_number === 1 ? '王' : '玉';
    }
}
export class Rook extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'rook';
        this.displayName = this.role === 'rook' ? '飛' : '龍';
    }
}
export class Bishop extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'bishop';
        this.displayName = this.role === 'bishop' ? '角' : '馬';
    }
}
export class Gold extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'gold';
        this.displayName = '金';
    }
}
export class Silver extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'silever';
        this.displayName = '銀';
    }
}
export class Knight extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'knight';
        this.displayName = '桂';
    }
}
export class Lance extends Piece {
    constructor(player_number) {
        super(player_number);
        this.role = 'lance';
        this.displayName = '香';
    }
}
export class Pawn extends Piece {
    constructor(player_number) {
        super(player_number);
    }
}
