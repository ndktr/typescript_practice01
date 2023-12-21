import './style.css'
import { Board } from './models/Board.ts'
import {
  Piece, Pawn, Lance, Knight, Silver, Gold, Bishop, Rook, King
} from './models/Piece.ts'

const selectPiece = (board: Board, piece: Piece): void => {
  const allNextPositions: number[][][] = piece.getAllNextPositions()
  const filteredAllNextPositions: number[][][] = (
    allNextPositions.filter(NextPositions => NextPositions[0][0] !== -1))
  const currentStatus = board.getStatus()
  board.loadNextPositions(filteredAllNextPositions)
  console.log(board.getStatus())
  board.setStatus(currentStatus)
}

// Init Piece
const pawn: Piece = new Pawn('P', false, [6, 0])
const lance: Piece = new Lance('L', true, [0, 8])
const knight: Piece = new Knight('KN', false, [8, 7])
const silver: Piece = new Silver('S', true, [0, 2])
const gold: Piece = new Gold('G', false, [8, 3])
const bishop: Piece = new Bishop('B', false, [7, 1])
const rook: Piece = new Rook('R', true, [1, 1])
const king: Piece = new King('K', false, [8, 4])

// Init Board
const board: Board = new Board()
board.set(pawn)
board.set(lance)
board.set(knight)
board.set(silver)
board.set(gold)
board.set(rook)
board.set(bishop)
board.set(king)

// First Step (select Bishop to move)
selectPiece(board, bishop)

// Second Step (select Rook to move)
selectPiece(board, rook)

// Third Step (move Rook)

