import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'
import { BoardRenderer } from '../views/html/BoardRenderer'
import { PieceController } from '../controllers/PieceController'

export const pieceClickHandler = (pieceController: PieceController, piece: Piece): void => {
  const board: Cell[][] = pieceController.selectPiece(piece)
  const boardRenderer: BoardRenderer = new BoardRenderer()
  boardRenderer.update(board)

}

// const cellClickHandler = (e: Event, board: Board, turn: Turn): void => {
//   const target = e.target as HTMLElement
//   const row: number = Number(target.dataset.row)
//   const column: number = Number(target.dataset.column)
//   PieceController.movePiece(board, turn, row, column)
// }