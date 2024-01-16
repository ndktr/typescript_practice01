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
    if (!selectedPiece.isOwn(turn.getTurn())) return
    store.setSelectedPiece(selectedPiece)
    board.highlightAllNextPositions(selectedPiece)
    App.render()
  }

  static movePiece = (moveToCell: Cell): void => {
    if (!moveToCell.isActive()) return

    const board: Board = store.getState().board
    const turn: Turn = store.getState().turn
    const selectedPiece: Piece|null = store.getState().selectedPiece
    if (selectedPiece === null) return

    const belongedPiece: Piece|null = moveToCell.hasPiece() ? moveToCell.getPiece() : null 
    if (belongedPiece !== null && belongedPiece.isOwn(turn.getTurn())) return
    
    selectedPiece.setNextPosition(moveToCell.getRow(), moveToCell.getColumn())
    board.update(selectedPiece)
    board.deactivateAllCell()
    turn.changeTurn()
    App.render()
  }
}