import { Turn } from '../models/Turn'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'


export class PieceController {
  private board: Board
  private turn: Turn 
  private currentPiece: Piece|null

  constructor(board: Board, turn: Turn) {
    this.board = board
    this.turn = turn
    this.currentPiece = null
  }

  public selectPiece = (piece: Piece): Cell[][] => {
    if (piece.getBelongTo() !== this.turn.getTurn() && this.currentPiece !== null) return
    this.setCurrentPiece(piece)
    this.board.highlightAllNextPositions(piece)
    return this.board.getStatus()
  }

  private setCurrentPiece = (piece: Piece): void => {
    this.currentPiece = piece
  }

  static movePiece = (board: Board, turn: Turn, row: number, column: number): void => {
    // 現在の駒がない場合は何もしない
    if (this.currentPiece === null) return

    const piece = this.currentPiece
    const status: Cell[][] = board.getStatus()
    const cell: Cell = status[row][column]

    // 移動先のセルがアクティブかどうか確認
    if (cell.isActive()) {
      piece.move(row, column)
      board.update(piece)
      board.deactivateAllCell()
    } else {
      console.error('Select invalid cell')
    }
  }
}