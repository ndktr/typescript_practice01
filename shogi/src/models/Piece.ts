import { cloneDeep } from 'lodash'

import PieceDirectionManager from '../services/PieceDirectionManager.ts'


export class Piece {
  private name: string
  private belongTo: number 
  private isForward: boolean
  private current: number[]
  private previous: number[]
  private steps: number[]
  private onBoard: boolean
  private promoteTo: string

  constructor(
    name: string, belongTo: number,isForward: boolean, current: number[],
    steps: number[], promoteTo: string) {
    this.name = name
    this.belongTo = belongTo
    this.isForward = isForward
    this.current = current 
    this.previous = current 
    this.steps = steps
    this.onBoard = true
    this.promoteTo = promoteTo 
  }
  
  public getAllNextPositions(): number[][][] {
    const forward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'forward', this.isForward, this.current, this.steps[0]))
    const rightForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'rightForward', this.isForward, this.current, this.steps[1]))
    const right: number[][] = (
      PieceDirectionManager.getNextPositions(
        'right', this.isForward, this.current, this.steps[2]))
    const rightBackward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'rightBackward', this.isForward, this.current, this.steps[3]))
    const backward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'backward', this.isForward, this.current, this.steps[4]))
    const leftBackward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'leftBackward', this.isForward, this.current, this.steps[5]))
    const left: number[][] = (
      PieceDirectionManager.getNextPositions(
        'left', this.isForward, this.current, this.steps[6]))
    const leftForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'leftForward', this.isForward, this.current, this.steps[7]))
    const knightRightForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'knightRightForward', this.isForward, this.current, this.steps[8]))
    const knightLeftForward: number[][] = (
      PieceDirectionManager.getNextPositions(
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

  public getIsForward() {
    return this.isForward
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

  isOnBoard() {
    return this.onBoard
  }

  public outFromBoard() {
    this.belongTo = this.belongTo === 1 ? 2 : 1
    this.onBoard = false
  }

  public getPromoteTo() {
    return this.promoteTo
  }
}

export class Pawn extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'SuperPawn')
  }
}

export class SuperPawn extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0], '')
  }
}

export class Lance extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [8, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'SuperLance')
  }
}

export class SuperLance extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0], '')
  }
}

export class Knight extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], 'SuperKnight')
  }
}

export class SuperKnight extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0], '')
  }
}

export class Silver extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 0, 1, 0, 1, 0, 1, 0, 0], 'SuperSilver')
  }
}

export class SuperSilver extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0], '')
  }
}

export class Gold extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0], '')
  }
}

export class Bishop extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [0, 8, 0, 8, 0, 8, 0, 8, 0, 0], 'SuperBishop')
  }
}

export class SuperBishop extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 8, 1, 8, 1, 8, 1, 8, 0, 0], '')
  }
}

export class Rook extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [8, 0, 8, 0, 8, 0, 8, 0, 0, 0], 'SuperRook')
  }
}

export class SuperRook extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [8, 1, 8, 1, 8, 1, 8, 1, 0, 0], '')
  }
}

export class King extends Piece {
  constructor (name: string, belongTo: number, isForward: boolean, current: number[]) {
    super(name, belongTo, isForward, current, [1, 1, 1, 1, 1, 1, 1, 1, 0, 0], '')
  }
}
