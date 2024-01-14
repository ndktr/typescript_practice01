import { Piece } from './Piece.ts'

export class Cell {
  private row: number
  private column: number
  private piece: Piece|null
  private hasPiece: boolean
  private isActive: boolean

  constructor(row: number, column: number) {
    this.row = row
    this.column = column
    this.piece = null
    this.hasPiece = false
    this.isActive = false
  }

  public getPiece(): Piece {
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
    this.hasPiece = true
  }

  public remove() {
    this.piece = null
    this.hasPiece = false
  }

  public activate() {
    this.isActive = true
  }

  public deactivate() {
    this.isActive = false
  }

  public checkIsActive(): boolean {
    return this.isActive
  }

  public checkHasPiece(): boolean {
    return this.hasPiece
  }

  public checkSameBelongTo(belongTo: number): boolean {
    const piece: Piece = this.getPiece()
    if (piece === null) return false
    if (belongTo !== piece.getBelongTo()) return false 
    return true
  }
}