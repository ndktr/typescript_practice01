import { cloneDeep } from 'lodash'

import { Cell } from './Cell.ts'
import { Piece } from './Piece.ts'

export class Board {
  private status: Cell[][]

  constructor() {
    this.status =  (
      Array.from({length:9}).map(
        (_, i) => Array.from({length:9}).map(
          (_, j) => new Cell(i, j))))
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

  public loadNextPositions(allNextPositions: number[][][]) {
    allNextPositions.forEach(eachNextPositions => {
      eachNextPositions.forEach(nextPosition => {
        const row: number = nextPosition[0]
        const column: number = nextPosition[1]
        this.status[row][column].activate()
      })
    })
  }
}