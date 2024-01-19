import { Piece } from '../models/Piece'

export default class PiecePromoteManager {
  static isPromotable(piece: Piece): boolean {
    if (piece.isPromoted() || !piece.isOnBoard()) return false

    const currentPosition: number[] = piece.getCurrentPosition()
    const row: number = currentPosition[0]
    if (piece.getBelongTo() === 1 && row >= 6) return true 
    if (piece.getBelongTo() === 2 && row <= 2) return true
    return false
  }
}