export class Turn {
  private turn: number

  constructor() {
    this.turn = 1
  }

  public getTurn(): number {
    return this.turn
  }

  public changeTurn(): void {
    this.turn = this.turn === 1 ? 2 : 1
  }
}

