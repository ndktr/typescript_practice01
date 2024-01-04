import './style.css'
import { Board } from './models/Board.ts'
import {
  Piece, Pawn, Lance, Knight, Silver, Gold, Bishop, Rook, King
} from './models/Piece.ts'

const selectPiece = (piece: Piece): number[][][] => {
  const allNextPositions = piece.getAllNextPositions()
  return allNextPositions
}

const pawn: Piece = new Pawn('P', false, [6, 0])
const lance: Piece = new Lance('L', true, [0, 8])
const knight: Piece = new Knight('KN', false, [8, 7])
const silver: Piece = new Silver('S', true, [0, 2])
const gold: Piece = new Gold('G', false, [8, 3])
const bishop: Piece = new Bishop('B', false, [7, 1])
const rook: Piece = new Rook('R', true, [1, 1])
const king: Piece = new King('K', false, [8, 4])

const board: Board = new Board()
board.set(pawn)
board.set(lance)
board.set(knight)
board.set(silver)
board.set(gold)
board.set(rook)
board.set(bishop)
board.set(king)

const movePiece = (piece: Piece, position: number[]) => {
  // 1 block to move
  const targetPiece = piece 
  const row: number = position[0]
  const column: number = position[1]
  const allNextPositions: number[][][] = selectPiece(targetPiece)
  board.loadNextPositions(allNextPositions)
  targetPiece.move(row, column)
  board.update(targetPiece)
}

movePiece(bishop, [6, 0])
movePiece(silver, [1, 3])
console.log(board.getStatus())
