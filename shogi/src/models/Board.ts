import { cloneDeep } from 'lodash'

import { Cell } from './Cell.ts'
import { Piece, Pawn, King, Gold, Silver, Knight, Lance, Rook, Bishop } from './Piece.ts'

export class Board {
  private status: Cell[][]

  constructor() {
    this.status =  (
      Array.from({length:9}).map(
        (_, i) => Array.from({length:9}).map(
          (_, j) => new Cell(i, j))))
    
    this.set(new Pawn('歩', true, [2, 0]))
    this.set(new Pawn('歩', true, [2, 1]))
    this.set(new Pawn('歩', true, [2, 2]))
    this.set(new Pawn('歩', true, [2, 3]))
    this.set(new Pawn('歩', true, [2, 4]))
    this.set(new Pawn('歩', true, [2, 5]))
    this.set(new Pawn('歩', true, [2, 6]))
    this.set(new Pawn('歩', true, [2, 7]))
    this.set(new Pawn('歩', true, [2, 8]))

    this.set(new Pawn('歩', false, [6, 0]))
    this.set(new Pawn('歩', false, [6, 1]))
    this.set(new Pawn('歩', false, [6, 2]))
    this.set(new Pawn('歩', false, [6, 3]))
    this.set(new Pawn('歩', false, [6, 4]))
    this.set(new Pawn('歩', false, [6, 5]))
    this.set(new Pawn('歩', false, [6, 6]))
    this.set(new Pawn('歩', false, [6, 7]))
    this.set(new Pawn('歩', false, [6, 8]))

    this.set(new Rook('飛', true, [1, 1]))
    this.set(new Bishop('角', true, [1, 7]))

    this.set(new Rook('角', false, [7, 1]))
    this.set(new Bishop('飛', false, [7, 7]))

    this.set(new Lance('香', true, [0, 0]))
    this.set(new Knight('桂', true, [0, 1]))
    this.set(new Silver('銀', true, [0, 2]))
    this.set(new Gold('金', true, [0, 3]))
    this.set(new King('王', true, [0, 4]))
    this.set(new Gold('金', true, [0, 5]))
    this.set(new Silver('銀', true, [0, 6]))
    this.set(new Knight('桂', true, [0, 7]))
    this.set(new Lance('香', true, [0, 8]))

    this.set(new Lance('香', true, [8, 0]))
    this.set(new Knight('桂', true, [8, 1]))
    this.set(new Silver('銀', true, [8, 2]))
    this.set(new Gold('金', true, [8, 3]))
    this.set(new King('王', true, [8, 4]))
    this.set(new Gold('金', true, [8, 5]))
    this.set(new Silver('銀', true, [8, 6]))
    this.set(new Knight('桂', true, [8, 7]))
    this.set(new Lance('香', true, [8, 8]))
  }

  public getStatus() {
    return cloneDeep(this.status)
  }

  public setStatus(status: Cell[][]) {
    this.status = cloneDeep(status)
  }

  public set(piece: Piece): void {
    const currentPosition: number[] = piece.getCurrentPosition()
    const row: number = currentPosition[0]
    const column: number = currentPosition[1]
    const cell: Cell = this.status[row][column]
    cell.set(piece)
  }

  public update(piece: Piece): void {
    const currentPosition: number[] = piece.getCurrentPosition()
    const previousPosition: number[] = piece.getPreviousPosition()
    const row: number = currentPosition[0]
    const column: number = currentPosition[1]
    const previousRow: number = previousPosition[0]
    const previousColumn: number = previousPosition[1]
    const prevoiusCell: Cell = this.status[previousRow][previousColumn]
    const cell: Cell = this.status[row][column]
    if (cell.checkIsActive()) {
      cell.set(piece)
      prevoiusCell.remove()
    } else {
      console.error('Select invalid cell')
    }
  }

  public loadNextPositions(allNextPositions: number[][][]) {
    allNextPositions.forEach(eachNextPositions => {
      eachNextPositions.forEach(nextPosition => {
        const row: number = nextPosition[0]
        const column: number = nextPosition[1]
        const currentCell = this.status[row][column]
        if (currentCell.checkHasPiece()) return 
        currentCell.activate()
      })
    })
  }
}