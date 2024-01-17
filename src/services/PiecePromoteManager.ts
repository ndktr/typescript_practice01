import {
  Piece, SuperPawn, SuperLance, SuperKnight, SuperSilver,
  SuperBishop, SuperRook
} from '../models/Piece'

export default class PiecePromoteManager {
  static isPromotable(piece: Piece): boolean {
    if (piece.getPromoteTo() === '') return false

    const currentPosition: number[] = piece.getCurrentPosition()
    const row: number = currentPosition[0]
    if (piece.getBelongTo() === 1 && row >= 6) return true 
    if (piece.getBelongTo() === 2 && row <= 2) return true
    return false
  }

  static getInstance(piece: Piece): Piece|null {
      const belongTo: number = piece.getBelongTo()
      const isForward: boolean = piece.getIsForward()
      const current: number[] = piece.getCurrentPosition()
    if (piece.getPromoteTo() === 'SuperPawn') return new SuperPawn('と', belongTo, isForward, current)
    if (piece.getPromoteTo() === 'SuperLance') return new SuperLance('杏', belongTo, isForward, current)
    if (piece.getPromoteTo() === 'SuperKnight') return new SuperKnight('圭', belongTo, isForward, current)
    if (piece.getPromoteTo() === 'SuperSilver') return new SuperSilver('全', belongTo, isForward, current)
    if (piece.getPromoteTo() === 'SuperBishop') return new SuperBishop('馬', belongTo, isForward, current)
    if (piece.getPromoteTo() === 'SuperRook') return new SuperRook('龍', belongTo, isForward, current)
    return null 
  }
}