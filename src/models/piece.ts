export class Piece {
  role: string;
  player_number: number;

  constructor(player_number: number) {
    this.role = 'pawn';
    this.player_number = player_number;
  }
}

export class King extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'king'
  }
}

export class Rook extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'rook'
  }
}

export class Bishop extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'bishop'
  }
}

export class Gold extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'gold'
  }
}

export class Silver extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'silever'
  }
}

export class Knight extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'knight'
  }
}

export class Lance extends Piece {
  constructor(player_number: number) {
    super(player_number);
    this.role = 'lance'
  }
}

export class Pawn extends Piece {
  constructor(player_number: number) {
    super(player_number);
  }
}

