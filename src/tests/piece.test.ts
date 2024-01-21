import { expect, test } from 'vitest'
import { Piece, Pawn } from "../models/Piece";

test('initialize Pawn', () => {
  const pawn: Piece = new Pawn(1, false, [0, 0])
  expect(pawn instanceof Pawn).toBe(true)
})

test('move Pawn next position', () => {
  const pawn: Piece = new Pawn(1, false, [0, 0])
  pawn.setNextPosition(1, 0)
  expect(pawn.getCurrentPosition()).toEqual([1, 0])
})

test('promote Pawn', () => {
  const pawn: Piece = new Pawn(1, false, [0, 0])
  pawn.promote()
  expect(pawn.isPromoted()).toBe(true)
  expect(pawn.getName()).toBe('と')
  expect(pawn.getSteps()).toEqual([1, 1, 1, 0, 1, 0, 1, 1, 0, 0])
})