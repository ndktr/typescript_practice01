import './style.css'

import { Turn } from './models/Turn.ts'
import { Board } from './models/Board.ts'
import { BoardGenerator } from './views/html/BoardGenerator.ts'
import { BoardRenderer } from './views/html/BoardRenderer.ts'


const main = () => {
  const board: Board = new Board()
  const turn: Turn = new Turn()
  
  // 初期表示 
  const boardRenderer = new BoardRenderer()
  boardRenderer.render(boardHtml)
}

main()
