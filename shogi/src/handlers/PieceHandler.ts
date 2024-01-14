import { Turn } from '../models/Turn'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'

export class PieceHandler {
  private static currentPiece: Piece|null = null

  static selectPiece = (board: Board, turn: Turn, row: number, column: number): void => {
    const selectedPiece = PieceHandler.getPiece(board, row, column)
    if (selectedPiece.getBelongTo() === turn.getTurn()) {
      PieceHandler.currentPiece = selectedPiece
      PieceHandler.highlightAllNextPositions(board)
    } else {
      if (PieceHandler.currentPiece !== null) return
    }
  }

  static getPiece = (board: Board, row: number, column: number): Piece => {
    const cell: Cell = board.getCell(row, column)
    const piece: Piece = cell.getPiece()
    return piece
  }

  static highlightAllNextPositions = (board: Board): void => {
    if (PieceHandler.currentPiece === null) return
    board.deactivateAllCell()

    const currentPiece: Piece = PieceHandler.currentPiece
    const currentPieceBelongTo: number = currentPiece.getBelongTo()
    const allNextPositions: number[][][] = this.suggestAllNextPositions(currentPiece)

    allNextPositions.forEach(eachNextPositions => {
      for (const nextPosition of eachNextPositions) {
        const row: number = nextPosition[0]
        const column: number = nextPosition[1]
        if (row === -1 || column === -1) break

        const cell: Cell = board.getCell(row, column)
        console.log(currentPieceBelongTo)
        if (cell.checkHasPiece() && cell.checkSameBelongTo(currentPieceBelongTo)) {
          break
        }
        if (cell.checkHasPiece()) {
          cell.activate()
          break
        }
        cell.activate()
      }
    })
  }

  static suggestAllNextPositions= (piece: Piece): number[][][] => {
    const allNextPositions = piece.getAllNextPositions()
    console.log(allNextPositions)
    return allNextPositions
  }

  static movePiece = (board: Board, turn: Turn, row: number, column: number): void => {
    // 現在の駒がない場合は何もしない
    if (PieceHandler.currentPiece === null) return

    const piece = PieceHandler.currentPiece
    const status: Cell[][] = board.getStatus()
    const cell: Cell = status[row][column]

    // 移動先のセルがアクティブかどうか確認
    if (cell.checkIsActive()) {
      piece.move(row, column)
      board.update(piece)
      board.deactivateAllCell()
    } else {
      console.error('Select invalid cell')
    }
  }
}