import { State } from "../types/state"

import store from "../store/Store"
import { Board } from "../models/Board"
import { Cell } from "../models/Cell"
import { Piece } from "../models/Piece"
import { Turn } from "../models/Turn"
import PiecePromoteManager from "./PiecePromoteManager"

export default class RuleManager {
  static existsPawnInSameColumn(piece: Piece): number[] {
    const state: State = store.getState()
    const board: Board = state.board
    const boardStatus: Cell[][] = board.getStatus()

    const columns: number[] = []
    boardStatus.forEach((row: Cell[]) => {
      row.forEach((cell: Cell) => {
      const targetPiece = cell.hasPiece() ? cell.getPiece() : null
      if (targetPiece !== null && targetPiece.getName() === '歩' &&
        piece.getBelongTo() === targetPiece.getBelongTo()) {
          const column: number = cell.getColumn()
          columns.push(column)
        }
      })
    })

    return columns
  }

  static canMoveOwnPiece(piece: Piece): boolean {
    const state: State = store.getState()
    const turn: Turn = state.turn
    if (!piece.isOwn(turn.getTurn())) return false
    return true
  }

  static canMoveToTheCell(cell: Cell): boolean {
    return cell.isActive()
  }

  static canTakePieceIfExists(piece: Piece|null): boolean {
    const state: State = store.getState()
    const turn: Turn = state.turn
    if (piece !== null && piece.isOwn(turn.getTurn())) return false
    if (piece === null) return true
    return true
  }

  static canPromote(piece: Piece): boolean {
    if (PiecePromoteManager.isPromotable(piece)) return true
    return false
  }

  static isMustPromote(piece: Piece, cell: Cell): boolean {
    const row: number = cell.getRow()
    if (piece.getName() === '歩' && (row === 0 || row === 8)) return true
    if (piece.getName() === '香' && (row === 0 || row === 8)) return true
    if (piece.getName() === '桂' && (row === 1 || row === 7)) return true
    return false
  }

}