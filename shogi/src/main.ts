import './style.css'
import { Board } from './models/Board.ts'
import { Piece } from './models/Piece.ts'

// 選択した駒の移動できるマスを計算する
const suggestAllNextPositions = (piece: Piece): number[][][] => {
  const allNextPositions = piece.getAllNextPositions()
  return allNextPositions
}

const highlightAllNextPositions = (board: Board, allNextPositions: number[][][]) => {
    allNextPositions.forEach(eachNextPositions => {
      eachNextPositions.forEach(nextPosition => {
        board.activateCell(nextPosition)
      })
    })
}

// 選択した駒を動かす
const movePiece = (piece: Piece, nextPosition: number[]) => {
  // 1 block to move
  const row: number = nextPosition[0]
  const column: number = nextPosition[1]
  piece.move(row, column)
  return piece
}

const main = () => {
  const board: Board = new Board()
  const currentStatus = board.getStatus()

  // 駒をクリックした時の動き
  // 1. 動かす駒を選択する
  const piece: Piece|null = currentStatus[0][2].getPiece()
  if (piece === null) return
  // 2. 選択した駒の移動できるマスを計算する
  const allNextPositions: number[][][] = suggestAllNextPositions(piece)
  // 3. 計算したマスをハイライトする
  highlightAllNextPositions(board, allNextPositions)
  // 駒をクリックしたときの動き終わり

  // 動かす先のマスをクリックしたときの動き
  // 4. 選択した駒を動かす
  const nextPosition: number[] = [1, 2]
  board.update(movePiece(piece, nextPosition))
  console.log(board.getStatus())
  // 動かす先のマスをクリックしたときの動き
}

main()


// // if (piece !== null) movePiece(piece, [2, 2])
// if (piece !== null) board.update(movePiece(piece, [1, 2]))
// console.log(board.getStatus())
