import store from '../store/Store'

import { App } from '../app/App'
import { Turn } from '../models/Turn'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'


export class PieceController {
  static selectPiece = (selectedPiece: Piece): void => {
    const turn: Turn = store.getState().turn
    const board: Board = store.getState().board
    if (selectedPiece.getBelongTo() !== turn.getTurn()) return
    store.setSelectedPiece(selectedPiece)
    board.highlightAllNextPositions(selectedPiece)
    App.render()
  }

  static movePiece = (cell: Cell): void => {
    const board: Board = store.getState().board
    const turn: Turn = store.getState().turn
    const selectedPiece: Piece|null = store.getState().selectedPiece

    if (selectedPiece === null) return
    if (cell.hasPiece() && !cell.isEnemy(turn.getTurn())) return 

    if (cell.isActive()) {
      selectedPiece.move(cell.getRow(), cell.getColumn())
      board.update(selectedPiece)
      board.deactivateAllCell()
      turn.changeTurn()
      App.render()
    } else {
      console.error('Select invalid cell')
    }
  }
}