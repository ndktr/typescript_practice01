import store from "../store/Store"
import { PieceController } from "../controllers/PieceController"
import { Turn } from '../models/Turn'
import { Board } from "../models/Board"
import { Cell } from "../models/Cell"
import { Piece } from "../models/Piece"


export class App {
  static createGame(board: Board): HTMLElement {
    const boardStatus: Cell[][] = board.getStatus()
    const outOfBoardPieces: Piece[] = board.getOutOfBoardPieces()

    // TODO: Need to change
    const boardOuterDiv: HTMLElement = App.createBoard()
    const outOfBoardHtml1: HTMLElement = App.createOutOfBoard(outOfBoardPieces, 1)
    const outOfBoardHtml2: HTMLElement = App.createOutOfBoard(outOfBoardPieces, 2)
    const playerTextHtml1: HTMLElement = App.createPlayerText(1)
    const playerTextHtml2: HTMLElement = App.createPlayerText(2)
    boardOuterDiv.appendChild(outOfBoardHtml1)
    boardOuterDiv.appendChild(outOfBoardHtml2)
    boardOuterDiv.appendChild(playerTextHtml1)
    boardOuterDiv.appendChild(playerTextHtml2)
    const boardDiv: HTMLElement = boardOuterDiv.firstElementChild as HTMLElement 

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
    gameDiv.appendChild(boardOuterDiv)

    return gameDiv
  }

  static createBoard(): HTMLElement {
    const boardOuterDiv: HTMLElement = document.createElement('div')
    const boardDiv: HTMLElement = document.createElement('div')
    boardOuterDiv.id = 'board-outer'
    boardDiv.id = 'board'
    boardOuterDiv.appendChild(boardDiv)
    return boardOuterDiv
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
      const pieceDiv: HTMLElement = App.createPiece(piece)
      cellDiv.appendChild(pieceDiv)                           
    }

    return cellDiv
  }

  static createPiece(piece: Piece): HTMLElement {
    const pieceDiv: HTMLElement = document.createElement('div')
    pieceDiv.classList.add('piece')
    pieceDiv.classList.add(`piece-${piece.getBelongTo()}`)
    if (piece.isPromoted()) pieceDiv.classList.add('promoted')
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
    filteredOutOfBoardPieces.forEach((piece: Piece, counter: number) => {
      const pieceDiv: HTMLElement = App.createPiece(piece)
      if (counter >= 9) pieceDiv.classList.add('not-top')
      if ((counter+1) % 9 === 0 || filteredOutOfBoardPieces.length === (counter+1)) pieceDiv.classList.add('line-end')
      outOfBoardDiv.appendChild(pieceDiv)
    })
    return outOfBoardDiv
  }

  static createPlayerText(playerNumber: number): HTMLElement {
    const playerTextDiv: HTMLElement = document.createElement('div')
    playerTextDiv.classList.add(`player-text`)
    playerTextDiv.classList.add(`player-text-${playerNumber}`)
    playerTextDiv.innerHTML = `Player ${playerNumber}` 
    return playerTextDiv
  }

  static render(): void {
    const app = document.getElementById('app')
    if (app === null) return

    const board: Board = store.getState().board

    const boardHtml: HTMLElement = App.createGame(board)
    app.innerHTML = ''
    app.appendChild(boardHtml)
  }

  static init(): void {
    const resettedBoard: Board = new Board()
    const resettedTurn: Turn = new Turn()
    store.setBoard(resettedBoard)
    store.setTurn(resettedTurn)
    App.render()
  }
}