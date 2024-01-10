import './style.css'
import { Board } from './models/Board.ts'
import { Piece } from './models/Piece.ts'

// 選択した駒の移動できるマスを計算する
const suggestAllNextPositions = (piece: Piece): number[][][] => {
  const allNextPositions = piece.getAllNextPositions()
  return allNextPositions
}

// 選択した駒を動かす
const movePiece = (piece: Piece, nextPosition: number[]) => {
  // 1 block to move
  const row: number = nextPosition[0]
  const column: number = nextPosition[1]
  const allNextPositions: number[][][] = suggestAllNextPositions(piece)
  board.loadNextPositions(allNextPositions)
  piece.move(row, column)
  return piece
}

const board: Board = new Board()
const currentStatus = board.getStatus()

// 1. 動かす駒を選択する
const piece: Piece|null = currentStatus[0][2].getPiece()
// 2. 選択した駒の移動できるマスを計算する
const allNextPositions: number[][][] = suggestAllNextPositions(piece)
// 3. 選択した駒を動かす


// // if (piece !== null) movePiece(piece, [2, 2])
// if (piece !== null) board.update(movePiece(piece, [1, 2]))
// console.log(board.getStatus())
