import { State } from "../types/state";

import { Board } from "../models/Board";
import { Piece } from "../models/Piece";
import { Turn } from "../models/Turn";


class Store {
  private state: {
    board: Board,
    turn: Turn,
    selectedPiece: Piece|null
  }

  constructor(board: Board, turn: Turn) {
    this.state = {
      board: board,
      turn: turn,
      selectedPiece: null
    }
  }

  public getState(): State {
    return this.state
  }

  setBoard(board: Board): void {
    this.state.board = board
  }

  setTurn(turn: Turn): void {
    this.state.turn = turn
  }

  setSelectedPiece(piece: Piece|null): void {
    this.state.selectedPiece = piece
  }
}

const board: Board = new Board()
const turn: Turn = new Turn()

const store = new Store(board, turn)
export default store