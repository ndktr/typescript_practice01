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
  
  public getPossiblePositions(): number[][] {
    const row: number = this.current[0]
    const column: number = this.current[1]
    const possiblePositions = this.calcPossiblePositions(row, column)
    return possiblePositions
  }

  public calcPossiblePositions(row: number, column: number): number[][] {
      const forward: number[] = this.calcPossibleForward(row, column, this.steps[0], this.isForward)
      const rightForward: number[] = this.isForward ? [row+this.steps[1], column-this.steps[1]] : [row-this.steps[1], column+this.steps[1]] 
      const right: number[] = this.isForward ? [row, column-this.steps[2]] : [row, column+this.steps[2]]
      const rightBackward: number[] = this.isForward ? [row-this.steps[3], column-this.steps[3]] : [row+this.steps[3], column+this.steps[3]]
      const backword: number[] = this.isForward ? [row-this.steps[4], column] : [row+this.steps[4], column]
      const leftBackword: number[] = this.isForward ? [row-this.steps[5], column+this.steps[5]] : [row+this.steps[5], column-this.steps[5]]
      const left: number[] = this.isForward ? [row, column+this.steps[6]] : [row, column-this.steps[6]]
      const leftForward: number[] = this.isForward ? [row+this.steps[7], column+this.steps[7]] : [row-this.steps[7], column-this.steps[7]]
      const knightRightForward: number[] = this.isForward ? [row+(this.steps[8]*2), column-this.steps[8]] : [row-(this.steps[8]*2), column+this.steps[8]]
      const knightLeftForward: number[] = this.isForward ? [row+(this.steps[9]*2), column+this.steps[9]] : [row-(this.steps[9]*2), column-this.steps[9]]
      return [forward, rightForward, right, rightBackward, backword, leftBackword, left, leftForward, knightRightForward, knightLeftForward]
  }

  private calcPossibleForward(row: number, column: number, forwardStep: number, isForward: boolean): number[] {
    if (isForward) return (row + forwardStep > 8) ? [8, column] : [row+forwardStep, column]
    return (row - forwardStep < 0) ? [0, column] : [row-forwardStep, column]
  }

  private calcPossibleRightForward(row: number, column: number, forwardStep: number, isForward: boolean): number {
    //
  }
}

export class Pawn extends Piece {
  constructor(name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  }
}

export class Gold extends Piece {
  constructor(name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [1, 1, 1, 0, 1, 0, 1, 1, 0, 0])
  }
}

export class Rook extends Piece {
  constructor(name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [8, 0, 8, 0, 8, 0, 8, 0, 0, 0])
  }
}

export class Bishop extends Piece {
  constructor(name: string, isForward: boolean, current: number[]) {
    super(name, isForward, current, [0, 8, 0, 8, 0, 8, 0, 8, 0, 0])
  }
}