import { Piece } from './Piece.ts'

export class Cell {
  private row: number
  private column: number
  private piece: Piece|null
  private active: boolean

  constructor(row: number, column: number) {
    this.row = row
    this.column = column
    this.piece = null
    this.active = false
  }

  public getRow(): number {
    return this.row
  }

  public getColumn(): number {
    return this.column
  }

  public getPiece(): Piece|null {
    return this.piece
  }

  public set(piece: Piece): void {
    this.piece = piece 
  }

  public remove(): void {
    this.piece = null
  }

  public activate(): void {
    this.active = true
  }

  public deactivate(): void {
    this.active = false
  }

  public isActive(): boolean {
    return this.active
  }

  public hasPiece(): boolean {
    return this.piece !== null
  }
}