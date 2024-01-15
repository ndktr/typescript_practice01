import { Board } from '../../models/Board'
import { Cell } from '../../models/Cell'
import { Piece } from '../../models/Piece'
import { Turn } from '../../models/Turn'
import { PieceController } from '../../controllers/PieceController.ts'
import { pieceClickHandler } from '../../events/events.ts'


export class BoardGenerator {
  private board: Board
  private turn: Turn
  private pieceController: PieceController

  constructor(board: Board, turn: Turn) {
    this.board = board
    this.turn = turn
    this.pieceController = new PieceController(board, turn)
  }

  public create(): HTMLElement {
    const boardStatus: Cell[][] = this.board.getStatus()

    const boardDiv: HTMLElement = this.createBoard()

    boardStatus.forEach((row: Cell[]) => {
      const rowDiv: HTMLElement = this.createRow()

      row.forEach((cell: Cell) => {
        const cellDiv: HTMLElement = this.createCell(cell)
        rowDiv.appendChild(cellDiv)
      })

      boardDiv.appendChild(rowDiv)
    })

    return boardDiv
  }

  private createBoard(): HTMLElement {
    const boardDiv: HTMLElement = document.createElement('div')
    boardDiv.id = 'board'
    return boardDiv
  }

  private createRow(): HTMLElement {
    const rowDiv: HTMLElement = document.createElement('div') 
    rowDiv.classList.add('row')
    return rowDiv
  }

  private createCell(cell: Cell): HTMLElement {
    const cellDiv: HTMLElement = document.createElement('div')
    const row: number = cell.getRow()
    const column: number = cell.getColumn()

    cellDiv.classList.add('cell')
    cellDiv.dataset.row = row.toString() 
    cellDiv.dataset.column = column.toString()
    // cellDiv.addEventListener('click', (e: Event) => { this.cellClickHandler(e, this.board, this.turn) })
    if (cell.isActive()) cellDiv.classList.add('active')

    if (cell.hasPiece()) {
      const piece: Piece = cell.getPiece() as Piece
      const pieceDiv: HTMLElement = this.createPiece(piece, row, column)
      cellDiv.appendChild(pieceDiv)                           
    }

    return cellDiv
  }

  private createPiece(piece: Piece, row: number, column: number): HTMLElement {
    const pieceDiv: HTMLElement = document.createElement('div')
    pieceDiv.classList.add(`piece-${piece.getBelongTo()}`)
    pieceDiv.innerHTML = piece.getName()
    pieceDiv.dataset.row = row.toString()
    pieceDiv.dataset.column = column.toString()
    pieceDiv.addEventListener('click', () => { pieceClickHandler(this.pieceController, piece)} )
    return pieceDiv
  } 

}