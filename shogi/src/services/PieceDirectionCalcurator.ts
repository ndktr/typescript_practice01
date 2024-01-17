import { cloneDeep } from 'lodash'

export class PieceDirectionCalcurator {
  static registry: Record<string, (currentPosition: number[], isForward: boolean) => number[]> = {
    'forward': PieceDirectionCalcurator.addOneToForward,
    'rightForward': PieceDirectionCalcurator.addOneToRightForward,
    'right': PieceDirectionCalcurator.addOneToRight,
    'rightBackward': PieceDirectionCalcurator.addOneToRightBackward,
    'backward': PieceDirectionCalcurator.addOneToBackward,
    'leftBackward': PieceDirectionCalcurator.addOneToLeftBackward,
    'left': PieceDirectionCalcurator.addOneToLeft,
    'leftForward': PieceDirectionCalcurator.addOneToLeftForward,
    'knightRightForward': PieceDirectionCalcurator.addOneToKnightRightForward,
    'knightLeftForward': PieceDirectionCalcurator.addOneToKnightLeftForward
  }
  
  static getNextPositions(direction: string, isForward: boolean, currentPosition: number[], step: number): number[][] {
    if (step === 0) return [[-1, -1]]

    const nextPositions: number[][] = []

    const addOneToProperDirection = PieceDirectionCalcurator.registry[direction]
    if (!addOneToProperDirection) console.error('registry do not have such a function') 

    const nextPosition: number[] = cloneDeep(currentPosition)
    for (let i = 0; i < step; i++) {
      const [row, column] = addOneToProperDirection(nextPosition, isForward)
      if (!PieceDirectionCalcurator.isWithinBoard(row, column)) break
      nextPosition[0] = row
      nextPosition[1] = column
      nextPositions.push(cloneDeep(nextPosition))
    }

    return (nextPositions.length !== 0) ? nextPositions : [[-1, -1]] 
  }

  static addOneToForward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row+1, column]
    return [row-1, column]
  }

  static addOneToRightForward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row+1, column-1]
    return [row-1, column+1]
  }

  static addOneToRight(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row, column-1]
    return [row, column+1]
  }

  static addOneToRightBackward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row-1, column-1]
    return [row+1, column+1]
  }


  static addOneToBackward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row-1, column]
    return [row+1, column]
  }

  static addOneToLeftBackward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row-1, column+1]
    return [row+1, column-1]
  }

  static addOneToLeft(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row, column+1]
    return [row, column-1]
  }

  static addOneToLeftForward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row+1, column+1]
    return [row-1, column-1]
  }

  static addOneToKnightRightForward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row+2, column-1]
    return [row-2, column+1]
  }

  static addOneToKnightLeftForward(currentPosition: number[], isForward: boolean): number[] {
    const row = currentPosition[0]
    const column = currentPosition[1]
    if (isForward) return [row+2, column+1]
    return [row-2, column-1]
  }

  static isWithinBoard(row: number, column: number) {
    if (row > 8 || row < 0 || column > 8 || column < 0) {
      return false
    }
    return true
  }
}