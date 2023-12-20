import { expect, test } from 'vitest'

import { Piece, Pawn } from '../models/Piece'

test('get proper name', () => {
  const pawn: Piece = new Pawn('歩', true, [6, 0])
  expect(pawn.getName()).toBe('歩')
})