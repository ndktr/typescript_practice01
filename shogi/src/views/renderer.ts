import { Turn } from '../models/Turn.ts'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Piece } from '../models/Piece'
import { PieceHandler } from '../handlers/PieceHandler.ts'


export class DomRenderer {

  public createBoard(board: Board, turn: Turn): HTMLElement {
    const boardStatus: Cell[][] = board.getStatus()
    const boardDiv = document.createElement('div')
    boardDiv.id = 'board'

    boardStatus.forEach((row: Cell[]) => {
      const rowDiv = document.createElement('div')
      rowDiv.classList.add('row')

      row.forEach((cell: Cell) => {
        const cellDiv = document.createElement('div')

        cellDiv.classList.add('cell')
        cellDiv.dataset.row = cell.getRow().toString()
        cellDiv.dataset.column = cell.getColumn().toString()
        cellDiv.addEventListener('click', (e: Event) => {this.cellClickHandler(e, board, turn)})

        if (cell.checkIsActive()) cellDiv.classList.add('active')

        if (cell.checkHasPiece()) {
          const piece: Piece|null = cell.getPiece() as Piece
          const row: number = piece.getCurrentPosition()[0]
          const column: number = piece.getCurrentPosition()[1]
          const pieceDiv = document.createElement('div')

          pieceDiv.classList.add('piece')
          pieceDiv.classList.add(`piece-${piece.getBelongTo()}`)
          pieceDiv.innerHTML = piece.getName()
          pieceDiv.dataset.row = row.toString()
          pieceDiv.dataset.column = column.toString()
          pieceDiv.addEventListener('click', (e: Event) => {this.pieceClickHandler(e, board, turn)})
          cellDiv.appendChild(pieceDiv)
        }

        rowDiv.appendChild(cellDiv)
      })

      boardDiv.appendChild(rowDiv)
    })

    return boardDiv
  }

  private pieceClickHandler = (e: Event, board: Board, turn: Turn): void => {
    const target = e.target as HTMLElement
    const row: number = Number(target.dataset.row)
    const column: number = Number(target.dataset.column)
    PieceHandler.selectPiece(board, turn, row, column)
    this.render(board, turn)
  }

  private cellClickHandler = (e: Event, board: Board, turn: Turn): void => {
    const target = e.target as HTMLElement
    const row: number = Number(target.dataset.row)
    const column: number = Number(target.dataset.column)
    PieceHandler.movePiece(board, turn, row, column)
    this.render(board, turn)
  }

  public render(board: Board, turn: Turn): void {
    const app = document.getElementById('app')
    const boardDom: HTMLElement = this.createBoard(board, turn)

    if (app === null) return

    app.innerHTML = ''
    app.appendChild(boardDom)
  }
}