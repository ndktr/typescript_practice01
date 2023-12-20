import { PieceCalcurator } from "../utils/PieceCalcurator.ts"


export class Piece {
  private name: string
  private isForward: boolean
  private current: number[]
  private steps: number[]

  constructor(name: string, isForward: boolean, current: number[], steps: number[]) {
    this.name = name
    this.isForward = isForward
    this.current = current 
    this.steps = steps
  }
  
  public getNextPositions(): number[][] {
    const forward: number[] = (
      PieceCalcurator.getNextPosition(
        'forward', this.isForward, this.current, this.steps[0]))
    const rightForward: number[] = (
      PieceCalcurator.getNextPosition(
        'rightForward', this.isForward, this.current, this.steps[1]))
    const right: number[] = (
      PieceCalcurator.getNextPosition(
        'right', this.isForward, this.current, this.steps[2]))
    const rightBackward: number[] = (
      PieceCalcurator.getNextPosition(
        'rightBackward', this.isForward, this.current, this.steps[3]))
    const backward: number[] = (
      PieceCalcurator.getNextPosition(
        'backward', this.isForward, this.current, this.steps[4]))
    const leftBackward: number[] = (
      PieceCalcurator.getNextPosition(
        'leftBackward', this.isForward, this.current, this.steps[5]))
    const left: number[] = (
      PieceCalcurator.getNextPosition(
        'left', this.isForward, this.current, this.steps[6]))
    const leftForward: number[] = (
      PieceCalcurator.getNextPosition(
        'leftForward', this.isForward, this.current, this.steps[7]))
    const knightRightForward: number[] = (
      PieceCalcurator.getNextPosition(
        'knightRightForward', this.isForward, this.current, this.steps[8]))
    const knightLeftForward: number[] = (
      PieceCalcurator.getNextPosition(
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
}

export class Pawn extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

export class Gold extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0])
  }
}

export class Silver extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [1, 1, 0, 1, 0, 1, 0, 1, 0, 0])
  }
}

export class Knight extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [0, 0, 0, 0, 0, 0, 0, 0, 1, 1])
  }
}

export class Lance extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [8, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

export class Rook extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [8, 0, 8, 0, 8, 0, 8, 0, 0, 0])
  }
}

export class Bishop extends Piece {
  constructor (name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [0, 8, 0, 8, 0, 8, 0, 8, 0, 0])
  }
}