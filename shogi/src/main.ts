import './style.css'

import { PieceHandler } from './event-handler/PieceHandler.ts'
import { Board } from './models/Board.ts'

const main = () => {
  const board: Board = new Board()
  PieceHandler.selectPiece(board, 0, 2)
  PieceHandler.movePiece(board, 1, 2)
  console.log(board.getStatus())
}

main()
