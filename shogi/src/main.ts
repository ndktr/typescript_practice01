import './style.css'
import { Board } from './models/Board.ts'
import {
  Piece, Pawn, Lance, Knight, Silver, Gold, Bishop, Rook, King
} from './models/Piece.ts'

// Piece Test
const pawn: Piece = new Pawn('P', false, [6, 0])
const possiblePositions1: number[][] = pawn.getNextPositions()
console.log('pawn: possiblePosition1: [6, 0]')
console.log(possiblePositions1)

const lance: Piece = new Lance('L', true, [0, 8])
const knight: Piece = new Knight('KN', false, [8, 7])
const silver: Piece = new Silver('S', true, [0, 2])
const gold: Piece = new Gold('G', false, [8, 3])
const bishop: Piece = new Bishop('B', false, [7, 1])
const rook: Piece = new Rook('R', true, [1, 1])
const king: Piece = new King('K', false, [8, 4])

// Board Test
const board: Board = new Board()
pawn.getCurrentPosition()
board.set(6, 0, pawn)
board.set(0, 8, lance)
board.set(8, 7, knight)
board.set(0, 2, silver)
board.set(8, 3, gold)
board.set(1, 1, rook)
board.set(7, 1, bishop)
board.set(8, 4, king)
console.log(board.getStatus())

