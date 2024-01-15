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

  public getPiece(): Piece|null {
    return this.piece
  }

  public getRow(): number {
    return this.row
  }

  public getColumn(): number {
    return this.column
  }

  public set(piece: Piece) {
    this.piece = piece 
  }

  public remove() {
    this.piece = null
  }

  public activate() {
    this.active = true
  }

  public deactivate() {
    this.active = false
  }

  public isActive(): boolean {
    return this.active
  }

  public hasPiece(): boolean {
    return this.piece !== null
  }

  public isEnemy(belongTo: number): boolean {
    const piece: Piece = this.getPiece() as Piece
    if (belongTo !== piece.getBelongTo()) return true 
    return false 
  }
}