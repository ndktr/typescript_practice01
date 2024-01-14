import './style.css'

import { Turn } from './models/Turn.ts'
import { Board } from './models/Board.ts'
import { DomRenderer } from './views/renderer.ts'

const main = () => {
  const board: Board = new Board()
  const turn: Turn = new Turn()
  
  // 初期表示 
  const renderer: DomRenderer = new DomRenderer()
  renderer.render(board, turn)

  // // onclick for piece
  // PieceHandler.selectPiece(board, 4, 2)
  // // onclick for cell
  // PieceHandler.movePiece(board, 5, 2)
}

main()
