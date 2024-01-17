import { Board } from "../models/Board";
import { Piece } from "../models/Piece";
import { Turn } from "../models/Turn";

interface State {
  board: Board
  turn: Turn
  selectedPiece: Piece|null
}