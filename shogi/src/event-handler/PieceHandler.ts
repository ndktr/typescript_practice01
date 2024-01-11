import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'

export class PieceHandler {
  private static piece: Piece|null = null

  static selectPiece = (board: Board, row: number, column: number) => {
    PieceHandler.getPiece(board, row, column)
    PieceHandler.highlightAllNextPositions(board)
  }

  static getPiece = (board: Board, row: number, column: number): void => {
    const currentStatus = board.getStatus()
    const cell: Cell = currentStatus[row][column]
    const piece: Piece|null = cell.getPiece()
    if (piece === null) console.error('Current cell does not have piece')
    PieceHandler.piece = piece
  }

  static suggestAllNextPositions= (piece: Piece): number[][][] => {
    const allNextPositions = piece.getAllNextPositions()
    return allNextPositions
  }

  static highlightAllNextPositions = (board: Board): void => {
    if (PieceHandler.piece === null) return
    const piece = PieceHandler.piece
    const allNextPositions: number[][][] = this.suggestAllNextPositions(piece)
    allNextPositions.forEach(eachNextPositions => {
      eachNextPositions.forEach(nextPosition => {
        board.activateCell(nextPosition)
      })
    })
  }

  static movePiece = (board: Board, row: number, column: number): void => {
    if (PieceHandler.piece === null) return
    const piece = PieceHandler.piece
    piece.move(row, column)
    board.update(piece)
    board.deactivateAllCell()
  }
}