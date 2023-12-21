import { expect, test } from 'vitest'

import {
  Piece, Pawn, Lance, Knight, Silver, Gold, Bishop, Rook, King
} from '../models/Piece'

test('get piece name', () => {
  const pawn: Piece = new Pawn('w', false, [6, 0])
  expect(pawn.getName()).toBe('w')
})

test('get current position', () => {
  const pawn: Piece = new Pawn('w', false, [6, 0])
  expect(pawn.getCurrentPosition()).toStrictEqual([6, 0])
})

test('get next steps for pawn', () => {
  const pawn: Piece = new Pawn('P', false, [6, 0])
  const expectNextSteps = ([[5, 0], [6, 0], [6, 0], [6, 0], [6, 0], [6, 0],
    [6, 0], [6, 0], [6, 0], [6, 0]])
  expect(pawn.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for lance', () => {
  const lance: Piece = new Lance('L', true, [0, 8])
  const expectNextSteps = ([[8, 8], [0, 8], [0, 8], [0, 8], [0, 8], [0, 8],
    [0, 8], [0, 8], [0, 8], [0, 8]])
  expect(lance.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for knight', () => {
  const knight: Piece = new Knight('KN', false, [8, 7])
  const expectNextSteps = ([[8, 7], [8, 7], [8, 7], [8, 7], [8, 7], [8, 7],
    [8, 7], [8, 7], [6, 8], [6, 6]])
  expect(knight.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for silver', () => {
  const silver: Piece = new Silver('S', true, [0, 2])
  const expectNextSteps = ([[1, 2], [1, 1], [0, 2], [0, 2], [0, 2], [0, 2],
    [0, 2], [1, 3], [0, 2], [0, 2]])
  expect(silver.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for gold', () => {
  const gold: Piece = new Gold('G', false, [8, 3])
  const expectNextSteps = ([[7, 3], [7, 4], [8, 4], [8, 3], [8, 3], [8, 3],
    [8, 2], [7, 2], [8, 3], [8, 3]])
  expect(gold.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for Bishop', () => {
  const gold: Piece = new Bishop('B', false, [7, 1])
  const expectNextSteps = ([[7, 1], [0, 8], [7, 1], [8, 2], [7, 1], [8, 0],
    [7, 1], [6, 0], [7, 1], [7, 1]])
  expect(gold.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for Rook', () => {
  const gold: Piece = new Rook('R', true, [1, 1])
  const expectNextSteps = ([[8, 1], [1, 1], [1, 0], [1, 1], [0, 1], [1, 1],
    [1, 8], [1, 1], [1, 1], [1, 1]])
  expect(gold.getNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for King', () => {
  const king: Piece = new King('K', false, [8, 4])
  const expectNextSteps = ([[7, 4], [7, 5], [8, 5], [8, 4], [8, 4], [8, 4],
    [8, 3], [7, 3], [8, 4], [8, 4]])
  expect(king.getNextPositions()).toStrictEqual(expectNextSteps)
})