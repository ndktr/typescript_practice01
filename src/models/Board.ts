import { cloneDeep } from 'lodash'

import { Cell } from './Cell.ts'
import { 
  Piece, Pawn, King, Gold, Silver, Knight, Lance, Rook, Bishop 
} from './Piece.ts'
import RuleManager from '../services/RuleManager.ts'


export class Board {
  private status: Cell[][]
  private outOfBoardPieces: Piece[]

  constructor() {
    this.status = []
    const arrow: Piece = new Lance(1, true, [0, 0])
    this.outOfBoardPieces = []
    this.init()
  }

  public init(): void {
    this.status =  (
      Array.from({length:9}).map(
        (_, i) => Array.from({length:9}).map(
          (_, j) => new Cell(i, j))))

    this.set(new Lance(1, true, [0, 0]))
    this.set(new Knight(1, true, [0, 1]))
    this.set(new Silver(1, true, [0, 2]))
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

  public getStatus(): Cell[][] {
    return cloneDeep(this.status)
  }

  public getCell(row: number, column: number): Cell {
    return this.status[row][column]
  }

  public getOutOfBoardPieces(): Piece[] {
    return this.outOfBoardPieces
  }

  public set(piece: Piece): void {
    const currentPosition: number[] = piece.getCurrentPosition()
    const row: number = currentPosition[0]
    const column: number = currentPosition[1]
    const cell: Cell = this.getCell(row, column)
    cell.set(piece)
  }

  public update(piece: Piece): void {
    const moveToPosition: number[] = piece.getCurrentPosition()
    const moveToRow: number = moveToPosition[0]
    const moveToColumn: number = moveToPosition[1]
    const moveToCell: Cell = this.getCell(moveToRow, moveToColumn)

    if (moveToCell.hasPiece()) {
      const takenPiece: Piece = moveToCell.getPiece() as Piece
      this.addToOutOfBoardPieces(takenPiece)
    }

    if (RuleManager.canPromote(piece) && RuleManager.isMustPromote(piece, moveToRow)) {
      piece.promote()
    } else if (RuleManager.canPromote(piece)) {
      const answer: boolean = confirm('Promote?')
      if (answer) piece.promote()
    }

    if (piece.isOnBoard()) {
      this.removePieceFromPreviousCell(piece)
    } else {
      this.outOfBoardPieces.forEach((eachPiece: Piece, index: number) => { 
        if (eachPiece === piece) this.outOfBoardPieces.splice(index, 1)
      })
    }

    if (!piece.isOnBoard()) piece.setOnBoard()

    moveToCell.set(piece)
  }

  private addToOutOfBoardPieces(piece: Piece): void {
    piece.outFromBoard()
    this.outOfBoardPieces.push(piece)
    this.sortOutOfBoardPieces()
  }

  private sortOutOfBoardPieces(): void {
    this.outOfBoardPieces.sort((a: Piece, b: Piece) => a.size - b.size)
  }

  public removePieceFromPreviousCell(piece: Piece): void {
    const previousPosition: number[] = piece.getPreviousPosition()
    const previousRow: number = previousPosition[0]
    const previousColumn: number = previousPosition[1]
    const prevoiusCell: Cell = this.getCell(previousRow, previousColumn)
    prevoiusCell.remove()
  }

  public highlightAllNextPositions = (selectedPiece: Piece): void => {
    this.deactivateAllCell()

    const allNextPositions: number[][][] = this.suggestAllNextPositions(selectedPiece)

    allNextPositions.forEach((eachDirection: number[][]) => {
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

  //TODO: write logic in the case of king is targeted
  public highlightAllNextPositionsForOutOfBoard = (piece: Piece): void => {
    this.deactivateAllCell()

    const columnsHasPawn: number[] = RuleManager.existsPawnInSameColumn(piece)

    this.status.forEach((row: Cell[], rowIndex: number) => {
      if (RuleManager.cannotSetToTheRow(piece, rowIndex)) return 
      for (const cell of row) {
        if (cell.hasPiece()) continue
        const column: number = cell.getColumn()
        if (columnsHasPawn.includes(column)) continue
        cell.activate()
      }
    })
  }

  private suggestAllNextPositions= (piece: Piece): number[][][] => {
    const allNextPositions = piece.getAllNextPositions()
    return allNextPositions
  }

  public deactivateAllCell(): void {
    this.status.forEach((row: Cell[]) => {
      row.forEach((cell: Cell) => {
        cell.deactivate()
      }) 
    })
  }
}
