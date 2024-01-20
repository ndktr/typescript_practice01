import { State } from "../types/state";

import { Board } from "../models/Board";
import { Piece } from "../models/Piece";
import { Turn } from "../models/Turn";


class Store {
  private state: State

  constructor(board: Board, turn: Turn) {
    this.state = {
      board: board,
      turn: turn,
      selectedPiece: null
    }
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

  public getState(): State {
    return this.state
  }
}

const board: Board = new Board()
const turn: Turn = new Turn()

const store = new Store(board, turn)
export default store