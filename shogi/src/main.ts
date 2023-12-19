import './style.css'
import { Board } from './models/Board.ts'
import { Piece, Rook, Bishop, Gold, Pawn } from './models/Piece.ts'

// Piece Test
const pawn: Piece = new Pawn('P', false, [6, 0])
const possiblePositions1: number[][] = pawn.getPossiblePositions()
console.log('possiblePosition1: [6, 0]')
console.log(possiblePositions1)

// Piece Test
const gold: Piece = new Gold('G', false, [8, 3])
const possiblePositions2: number[][] = gold.getPossiblePositions()
console.log('possiblePosition2: [8, 3]')
console.log(possiblePositions2)

// Piece Test
const rook: Piece = new Rook('R', true, [1, 1])
const possiblePosition3: number[][] = rook.getPossiblePositions()
console.log('possiblePosition3: [1, 1]')
console.log(possiblePosition3)

// Piece Test
const bishop: Piece = new Bishop('B', false, [7, 1])
const possiblePosition4: number[][] = bishop.getPossiblePositions()
console.log('possiblePosition4: [7, 1]')
console.log(possiblePosition4)

// Board Test
const board: Board = new Board()
board.set(6, 0, pawn)
board.set(8, 3, gold)
board.set(1, 1, rook)
board.set(7, 1, bishop)
console.log(board.getStatus())

