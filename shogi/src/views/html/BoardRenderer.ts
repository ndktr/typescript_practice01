import { Board } from '../../models/Board'
import { Turn } from '../../models/Turn'
import { BoardGenerator } from './BoardGenerator'

export class BoardRenderer {
  static render(board: Board, turn: Turn): void {
    const app = document.getElementById('app')
    if (app === null) return

    const boardGenerator = new BoardGenerator(board, turn)
    const boardHtml = boardGenerator.create()

    app.innerHTML = ''
    app.appendChild(boardHtml)
  }

  static update(board: Board, turn: Turn): void {
    const app = document.getElementById('app')
    if (app === null) return

    const boardGenerator = new BoardGenerator(board, turn)
    const boardHtml = boardGenerator.create()

    app.innerHTML = ''
    app.appendChild(boardHtml)
  }
}