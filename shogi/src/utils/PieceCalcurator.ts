export class PieceCalcurator {
  static registry: Record<string, (currentPosition: number[], isForward: boolean) => number[]> = {
    'forward': PieceCalcurator.addOneToForward,
    'rightForward': PieceCalcurator.addOneToRightForward,
    'right': PieceCalcurator.addOneToRight,
    'rightBackward': PieceCalcurator.addOneToRightBackward,
    'backward': PieceCalcurator.addOneToBackward,
    'leftBackward': PieceCalcurator.addOneToLeftBackward,
    'left': PieceCalcurator.addOneToLeft,
    'leftForward': PieceCalcurator.addOneToLeftForward,
    'knightRightForward': PieceCalcurator.addOneToKnightRightForward,
    'knightLeftForward': PieceCalcurator.addOneToKnightLeftForward
  }
  
  static getNextPosition(direction: string, isForward: boolean, currentPosition: number[], step: number) {
    const nextPosition: number[] = [...currentPosition]
    const addOneToProperDirection = PieceCalcurator.registry[direction]

    if (!addOneToProperDirection) console.error('registry do not have function') 

    for (let i = 0; i < step; i++) {
      const [row, column] = addOneToProperDirection(nextPosition, isForward)
      if (!PieceCalcurator.isWithinBoard(row, column)) break
      nextPosition[0] = row
      nextPosition[1] = column
    }

    return nextPosition
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