import './style.css'
import { Board } from './models/Board.ts'
import { Piece, Rook, Bishop, Gold, Silver, Knight, Lance, Pawn } from './models/Piece.ts'

// Piece Test
const pawn: Piece = new Pawn('P', false, [6, 0])
const possiblePositions1: number[][] = pawn.getNextPositions()
console.log('pawn: possiblePosition1: [6, 0]')
console.log(possiblePositions1)

// Piece Test
const lance: Piece = new Lance('L', true, [0, 8])
const possiblePositions2: number[][] = lance.getNextPositions()
console.log('lance: possiblePosition2: [0, 8]')
console.log(possiblePositions2)

// Piece Test
const knight: Piece = new Knight('K', false, [8, 7])
const possiblePositions3: number[][] = knight.getNextPositions()
console.log('knight: possiblePosition3: [8, 7]')
console.log(possiblePositions3)

// // Piece Test
const silver: Piece = new Silver('S', true, [0, 2])
const possiblePosition4: number[][] = silver.getNextPositions()
console.log('silver: possiblePosition5: [0, 2]')
console.log(possiblePosition4)

// // Piece Test
const gold: Piece = new Gold('G', false, [8, 3])
const possiblePositions5: number[][] = gold.getNextPositions()
console.log('gold: possiblePosition2: [8, 3]')
console.log(possiblePositions5)

// // Piece Test
const rook: Piece = new Rook('R', true, [1, 1])
const possiblePosition6: number[][] = rook.getNextPositions()
console.log('rook: possiblePosition3: [1, 1]')
console.log(possiblePosition6)

// // Piece Test
const bishop: Piece = new Bishop('B', false, [7, 7])
const possiblePosition7: number[][] = bishop.getNextPositions()
console.log('bishop: possiblePosition4: [7, 7]')
console.log(possiblePosition7)

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
console.log(board.getStatus())

