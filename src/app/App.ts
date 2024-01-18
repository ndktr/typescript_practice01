import store from "../store/Store"
import { PieceController } from "../controllers/PieceController"
import { Board } from "../models/Board"
import { Cell } from "../models/Cell"
import { Piece } from "../models/Piece"


export class App {
  static createGame(board: Board): HTMLElement {
    const boardStatus: Cell[][] = board.getStatus()

    const boardDiv: HTMLElement = App.createBoard()

    boardStatus.forEach((row: Cell[]) => {
      const rowDiv: HTMLElement = App.createRow()

      row.forEach((cell: Cell) => {
        const cellDiv: HTMLElement = App.createCell(cell)
        rowDiv.appendChild(cellDiv)
      })

      boardDiv.appendChild(rowDiv)
    })

    const gameDiv: HTMLElement = document.createElement('div')
    gameDiv.id = 'game'
    gameDiv.appendChild(boardDiv)

    return gameDiv
  }

  static createBoard(): HTMLElement {
    const boardDiv: HTMLElement = document.createElement('div')
    boardDiv.id = 'board'
    return boardDiv
  }

  static createRow(): HTMLElement {
    const rowDiv: HTMLElement = document.createElement('div') 
    rowDiv.classList.add('row')
    return rowDiv
  }

  static createCell(cell: Cell): HTMLElement {
    const cellDiv: HTMLElement = document.createElement('div')
    const row: number = cell.getRow()
    const column: number = cell.getColumn()

    cellDiv.classList.add('cell')
    cellDiv.dataset.row = row.toString() 
    cellDiv.dataset.column = column.toString()
    cellDiv.addEventListener('click', () => { PieceController.movePiece(cell) })
    if (cell.isActive()) cellDiv.classList.add('active')

    if (cell.hasPiece()) {
      const piece: Piece = cell.getPiece() as Piece
      const pieceDiv: HTMLElement = App.createPiece(piece, row, column)
      cellDiv.appendChild(pieceDiv)                           
    }

    return cellDiv
  }

  static createPiece(piece: Piece, row: number, column: number): HTMLElement {
    const pieceDiv: HTMLElement = document.createElement('div')
    pieceDiv.classList.add('piece')
    pieceDiv.classList.add(`piece-${piece.getBelongTo()}`)
    pieceDiv.innerHTML = piece.getName()
    pieceDiv.addEventListener('click', () => { PieceController.selectPiece(piece) })
    return pieceDiv
  } 

  static createOutOfBoard(outOfBoardPieces: Piece[], belongTo: number): HTMLElement {
    const outOfBoardDiv: HTMLElement = document.createElement('div')
    outOfBoardDiv.classList.add('out-of-board')
    outOfBoardDiv.classList.add(`out-of-board-${belongTo}`)
    const filteredOutOfBoardPieces: Piece[] = (
      outOfBoardPieces.filter((piece: Piece) => piece.getBelongTo() === belongTo)) 
    filteredOutOfBoardPieces.forEach((piece: Piece) => {
      const pieceDiv: HTMLElement = App.createPiece(piece, 0, 0)
      outOfBoardDiv.appendChild(pieceDiv)
    })
    return outOfBoardDiv
  }

  static render(): void {
    const app = document.getElementById('app')
    if (app === null) return

    const board: Board = store.getState().board
    const outOfBoardPieces: Piece[] = board.getOutOfBoardPieces()

    const boardHtml: HTMLElement = App.createGame(board)
    const outOfBoardHtml1: HTMLElement = App.createOutOfBoard(outOfBoardPieces, 1)
    const outOfBoardHtml2: HTMLElement = App.createOutOfBoard(outOfBoardPieces, 2)
    app.innerHTML = ''
    app.appendChild(outOfBoardHtml1)
    app.appendChild(boardHtml)
    app.appendChild(outOfBoardHtml2)
  }
}