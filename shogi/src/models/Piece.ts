import { cloneDeep } from 'lodash'

import { Turn } from '../models/Turn'
import { PieceDirectionCalcurator } from '../services/PieceDirectionCalcurator.ts'


export class Piece {
  private name: string
  private belongTo: number 
  private isForward: boolean
  private current: number[]
  private previous: number[]
  private steps: number[]
  private onBoard: boolean

  constructor(name: string, belongTo: number, isForward: boolean, current: number[], steps: number[]) {
    this.name = name
    this.belongTo = belongTo
    this.isForward = isForward
    this.current = current 
    this.previous = current 
    this.steps = steps
    this.onBoard = true
  }
  
  public getAllNextPositions(): number[][][] {
    const forward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'forward', this.isForward, this.current, this.steps[0]))
    const rightForward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'rightForward', this.isForward, this.current, this.steps[1]))
    const right: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'right', this.isForward, this.current, this.steps[2]))
    const rightBackward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'rightBackward', this.isForward, this.current, this.steps[3]))
    const backward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'backward', this.isForward, this.current, this.steps[4]))
    const leftBackward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'leftBackward', this.isForward, this.current, this.steps[5]))
    const left: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'left', this.isForward, this.current, this.steps[6]))
    const leftForward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'leftForward', this.isForward, this.current, this.steps[7]))
    const knightRightForward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'knightRightForward', this.isForward, this.current, this.steps[8]))
    const knightLeftForward: number[][] = (
      PieceDirectionCalcurator.getNextPositions(
        'knightLeftForward', this.isForward, this.current, this.steps[9]))
    return [
      forward, rightForward, right, rightBackward, backward, leftBackward,
      left, leftForward, knightRightForward, knightLeftForward]
  }

  public getName() {
    return this.name
  }

  public getCurrentPosition() {
    return this.current
  }

  public getPreviousPosition() {
    return this.previous
  }

  public getBelongTo() {
    return this.belongTo
  }

  public isOwn(currentTurn: number) {
    if (this.getBelongTo() !== currentTurn) return false
    return true
  }

  public isSameSide(piece: Piece) {
    if (this.getBelongTo() !== piece.getBelongTo()) return false
    return true
  }

  public setNextPosition(row: number, column: number) {
    this.previous = cloneDeep(this.getCurrentPosition())
    this.current = [row, column] 
  }
}

export class Pawn extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

export class Lance extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [8, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

export class Knight extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1])
  }
}

export class Silver extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 0, 1, 0, 1, 0, 1, 0, 0])
  }
}

export class Gold extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0])
  }
}

export class Bishop extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [0, 8, 0, 8, 0, 8, 0, 8, 0, 0])
  }
}

export class Rook extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [8, 0, 8, 0, 8, 0, 8, 0, 0, 0])
  }
}

export class King extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 1, 1, 1, 1, 1, 0, 0])
  }
}
