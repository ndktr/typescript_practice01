import store from "../store/Store"
import { PieceController } from "../controllers/PieceController"
import { Board } from "../models/Board"
import { Cell } from "../models/Cell"
import { Piece } from "../models/Piece"


export class App {
  static create(board: Board): HTMLElement {
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

    return boardDiv
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
    pieceDiv.dataset.row = row.toString()
    pieceDiv.dataset.column = column.toString()
    pieceDiv.addEventListener('click', () => { PieceController.selectPiece(piece) })
    return pieceDiv
  } 

  static render(): void {
    const app = document.getElementById('app')
    if (app === null) return

    const board: Board = store.getState().board

    const boardHtml: HTMLElement = App.create(board) 
    app.innerHTML = ''
    app.appendChild(boardHtml)
  }
}