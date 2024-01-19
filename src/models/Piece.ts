import { Front, Back } from '../types/piece'

import { cloneDeep } from 'lodash'

import PieceDirectionManager from '../services/PieceDirectionManager.ts'


export class Piece {
  private front: Front
  private back: Back|null
  size: number
  private belongTo: number
  private isForward: boolean
  private current: number[]
  private previous: number[]
  private onBoard: boolean
  private promoted: boolean

  constructor(front: Front, back: Back|null, size: number, belongTo: number,
    isForward: boolean, current: number[]) {
    this.front = front
    this.back = back
    this.size = size
    this.belongTo = belongTo
    this.isForward = isForward
    this.current = current 
    this.previous = current 
    this.onBoard = true
    this.promoted = false 
  }
  
  public getAllNextPositions(): number[][][] {
    const steps: number[] = this.getSteps() 

    const forward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'forward', this.isForward, this.current, steps[0]))

    const rightForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'rightForward', this.isForward, this.current, steps[1]))

    const right: number[][] = (
      PieceDirectionManager.getNextPositions(
        'right', this.isForward, this.current, steps[2]))

    const rightBackward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'rightBackward', this.isForward, this.current, steps[3]))

    const backward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'backward', this.isForward, this.current, steps[4]))

    const leftBackward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'leftBackward', this.isForward, this.current, steps[5]))

    const left: number[][] = (
      PieceDirectionManager.getNextPositions(
        'left', this.isForward, this.current, steps[6]))

    const leftForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'leftForward', this.isForward, this.current, steps[7]))

    const knightRightForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'knightRightForward', this.isForward, this.current, steps[8]))

    const knightLeftForward: number[][] = (
      PieceDirectionManager.getNextPositions(
        'knightLeftForward', this.isForward, this.current, steps[9]))

    return [
      forward, rightForward, right, rightBackward, backward, leftBackward,
      left, leftForward, knightRightForward, knightLeftForward]
  }

  public getName(): string {
    if (this.promoted && this.back !== null) return this.back.name 
    return this.front.name
  }
  
  public getSteps(): number[] {
    if (this.promoted && this.back !== null) return this.back.steps 
    return this.front.steps
  }

  public getCurrentPosition(): number[] {
    return this.current
  }

  public getPreviousPosition(): number[] {
    return this.previous
  }

  public getIsForward(): boolean {
    return this.isForward
  }

  public getBelongTo(): number {
    return this.belongTo
  }

  public setNextPosition(row: number, column: number): void {
    this.previous = cloneDeep(this.getCurrentPosition())
    this.current = [row, column] 
  }

  public setOnBoard(): void {
    this.onBoard = true
  }

  public outFromBoard(): void {
    this.belongTo = this.belongTo === 1 ? 2 : 1
    this.isForward = !this.isForward
    this.promoted = false
    this.onBoard = false
    this.current = [-1, -1]
    this.previous = [-1, -1]
  }

  public promote(): void {
    this.promoted = true
  }

  public isOwn(currentTurn: number): boolean {
    if (this.getBelongTo() !== currentTurn) return false
    return true
  }

  public isSameSide(piece: Piece): boolean {
    if (this.getBelongTo() !== piece.getBelongTo()) return false
    return true
  }

  public isOnBoard(): boolean {
    return this.onBoard
  }

  public isPromoted(): boolean {
    return this.promoted
  }
}


export class Pawn extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '歩', steps: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
    const back = {name: 'と', steps: [1, 1, 1, 0, 1, 0, 1, 1, 0, 0]}
    super(front, back, 1, belongTo, isForward, current)
  }
}


export class Lance extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '香', steps: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
    const back = {name: '杏', steps: [1, 1, 1, 0, 1, 0, 1, 1, 0, 0]}
    super(front, back, 2, belongTo, isForward, current)
  }
}


export class Knight extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '桂', steps: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]}
    const back = {name: '圭', steps: [1, 1, 1, 0, 1, 0, 1, 1, 0, 0]}
    super(front, back, 3, belongTo, isForward, current)
  }
}


export class Silver extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '銀', steps: [1, 1, 0, 1, 0, 1, 0, 1, 0, 0]}
    const back = {name: '全', steps: [1, 1, 1, 0, 1, 0, 1, 1, 0, 0]}
    super(front, back, 4, belongTo, isForward, current)
  }
}


export class Gold extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '金', steps: [1, 1, 1, 0, 1, 0, 1, 1, 0, 0]}
    const back = null
    super(front, back, 5, belongTo, isForward, current)
  }
}


export class Bishop extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '角', steps: [0, 8, 0, 8, 0, 8, 0, 8, 0, 0]}
    const back = {name: '馬', steps: [1, 8, 1, 8, 1, 8, 1, 8, 0, 0]}
    super(front, back, 6, belongTo, isForward, current)
  }
}


export class Rook extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const front = {name: '飛', steps: [8, 0, 8, 0, 8, 0, 8, 0, 0, 0]}
    const back = {name: '龍', steps: [8, 1, 8, 1, 8, 1, 8, 1, 0, 0]}
    super(front, back, 7, belongTo, isForward, current)
  }
}


export class King extends Piece {
  constructor (belongTo: number, isForward: boolean, current: number[]) {
    const name: string = belongTo === 1 ? '王' : '玉'
    const front = {name: name, steps: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0]}
    const back = null
    super(front, back, 8, belongTo, isForward, current)
  }
}
