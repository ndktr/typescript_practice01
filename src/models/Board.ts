import { cloneDeep } from 'lodash'

import { Cell } from './Cell.ts'
import { 
  Piece, Pawn, King, Gold, Silver, Knight, Lance, Rook, Bishop 
} from './Piece.ts'
import PiecePromoteManager from '../services/PiecePromoteManager.ts'

export class Board {
  private status: Cell[][]
  private outOfBoardPieces: Piece[]

  constructor() {
    this.status =  (
      Array.from({length:9}).map(
        (_, i) => Array.from({length:9}).map(
          (_, j) => new Cell(i, j))))

    this.outOfBoardPieces = [] 

    this.set(new Lance(1, true, [0, 0]))
    this.set(new Knight(1, true, [0, 1]))
    this.set(new Silver(1, true, [5, 2]))
    this.set(new Gold(1, true, [0, 3]))
    this.set(new King(1, true, [0, 4]))
    this.set(new Gold(1, true, [0, 5]))
    this.set(new Silver(1, true, [0, 6]))
    this.set(new Knight(1, true, [0, 7]))
    this.set(new Lance(1, true, [0, 8]))

    this.set(new Rook(1, true, [1, 1]))
    this.set(new Bishop(1, true, [1, 7]))
    
    this.set(new Pawn(1, true, [2, 0]))
    this.set(new Pawn(1, true, [2, 1]))
    this.set(new Pawn(1, true, [2, 2]))
    this.set(new Pawn(1, true, [2, 3]))
    this.set(new Pawn(1, true, [2, 4]))
    this.set(new Pawn(1, true, [2, 5]))
    this.set(new Pawn(1, true, [2, 6]))
    this.set(new Pawn(1, true, [2, 7]))
    this.set(new Pawn(1, true, [2, 8]))

    this.set(new Lance(2, false, [8, 0]))
    this.set(new Knight(2, false, [8, 1]))
    this.set(new Silver(2, false, [8, 2]))
    this.set(new Gold(2, false, [8, 3]))
    this.set(new King(2, false, [8, 4]))
    this.set(new Gold(2, false, [8, 5]))
    this.set(new Silver(2, false, [8, 6]))
    this.set(new Knight(2, false, [8, 7]))
    this.set(new Lance(2, false, [8, 8]))

    this.set(new Bishop(2, false, [7, 1]))
    this.set(new Rook(2, false, [7, 7]))

    this.set(new Pawn(2, false, [6, 0]))
    this.set(new Pawn(2, false, [6, 1]))
    this.set(new Pawn(2, false, [6, 2]))
    this.set(new Pawn(2, false, [6, 3]))
    this.set(new Pawn(2, false, [6, 4]))
    this.set(new Pawn(2, false, [6, 5]))
    this.set(new Pawn(2, false, [6, 6]))
    this.set(new Pawn(2, false, [6, 7]))
    this.set(new Pawn(2, false, [6, 8]))
  }

  public getStatus() {
    return cloneDeep(this.status)
  }

  public getCell(row: number, column: number) {
    return this.status[row][column]
  }

  public getOutOfBoardPieces() {
    return this.outOfBoardPieces
  }

  public set(piece: Piece): void {
    const currentPosition: number[] = piece.getCurrentPosition()
    const row: number = currentPosition[0]
    const column: number = currentPosition[1]
    const cell: Cell = this.status[row][column]
    cell.set(piece)
  }

  public update(piece: Piece): void {
    const moveToPosition: number[] = piece.getCurrentPosition()
    const moveToRow: number = moveToPosition[0]
    const moveToColumn: number = moveToPosition[1]
    const moveToCell: Cell = this.getCell(moveToRow, moveToColumn)

    const previousPosition: number[] = piece.getPreviousPosition()
    const previousRow: number = previousPosition[0]
    const previousColumn: number = previousPosition[1]
    const prevoiusCell: Cell = this.getCell(previousRow, previousColumn)

    if (!moveToCell.isActive()) return

    if (moveToCell.hasPiece()) {
      const takenPiece: Piece = moveToCell.getPiece() as Piece
      if (takenPiece.isPromoted()) takenPiece.init()
      this.addOutOfBoardPieces(takenPiece)
    }

    if (PiecePromoteManager.isPromotable(piece)) {
      const answer: boolean = confirm('Promote?')
      if (answer) piece.promote()
    }

    moveToCell.set(piece)
    prevoiusCell.remove()
  }

  public highlightAllNextPositions = (selectedPiece: Piece): void => {
    this.deactivateAllCell()

    const allNextPositions: number[][][] = this.suggestAllNextPositions(selectedPiece)

    allNextPositions.forEach(eachDirection => {
      for (const eachPosition of eachDirection) {
        const row: number = eachPosition[0]
        const column: number = eachPosition[1]
        if (row === -1 || column === -1) break

        const cell: Cell = this.getCell(row, column)
        const piece: Piece|null = cell.hasPiece() ? cell.getPiece() : null 
        if (piece !== null && piece.isSameSide(selectedPiece)) break
        cell.activate()
        if (piece !== null) break 
      }
    })
  }

  public highlightAllNextPositionsForOutOfBoard = (selectedPiece: Piece): void => {
    this.deactivateAllCell()

    this.status.forEach((row: Cell[]) => {
      for (const cell of row) {
        if (cell.hasPiece()) continue
        cell.activate()
      }
    })
  }

  private suggestAllNextPositions= (piece: Piece): number[][][] => {
    const allNextPositions = piece.getAllNextPositions()
    return allNextPositions
  }

  public deactivateAllCell() {
    this.status.forEach((row: Cell[]) => {
      row.forEach((cell: Cell) => {
        cell.deactivate()
      }) 
    })
  }

  private addOutOfBoardPieces(piece: Piece) {
    piece.outFromBoard()
    this.outOfBoardPieces.push(piece)
  }

  private removeOutOfBoardPiece(pieces: Piece): void {
    //
  }
}