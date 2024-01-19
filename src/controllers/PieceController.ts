import { State } from '../types/state'

import store from '../store/Store'
import { App } from '../app/App'
import { Turn } from '../models/Turn'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'
import RuleManager from '../services/RuleManager.ts'


export class PieceController {
  static selectPiece = (selectedPiece: Piece): void => {
    const state: State = store.getState()
    const board: Board = state.board
    if (!RuleManager.canMoveOwnPiece(selectedPiece)) return
    store.setSelectedPiece(selectedPiece)

    if (selectedPiece.isOnBoard()) {
      board.highlightAllNextPositions(selectedPiece)
    } else {
      board.highlightAllNextPositionsForOutOfBoard(selectedPiece)
    }

    App.render()
  }

  static movePiece = (moveToCell: Cell): void => {
    if (!RuleManager.canMoveToTheCell(moveToCell)) return

    const state: State = store.getState()
    const turn: Turn = state.turn
    const board: Board = state.board
    const selectedPiece: Piece|null = state.selectedPiece
    if (selectedPiece === null) return

    const belongedPiece: Piece|null = (
      moveToCell.hasPiece() ? moveToCell.getPiece() : null)
    if (!RuleManager.canTakePieceIfExists(belongedPiece)) return
    
    selectedPiece.setNextPosition(moveToCell.getRow(), moveToCell.getColumn())

    board.update(selectedPiece)
    board.deactivateAllCell()
    turn.changeTurn()
    App.render()
  }
}
