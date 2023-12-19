import { Piece } from './Piece.ts'

export class Board {
  private status: (null|Piece)[][]

  constructor() {
    this.status = [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ] 
  }

  public getStatus() {
    return this.status
  }

  public set(row: number, column: number, piece: Piece): void {
    this.status[row][column] = piece
  }
}