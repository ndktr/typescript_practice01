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
  const forward = [[5, 0]]
  const rightForward = [[0, 0]]
  const right = [[0, 0]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[0, 0]]
  const leftForward = [[0, 0]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(pawn.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for lance', () => {
  const lance: Piece = new Lance('L', true, [0, 8])
  const forward = [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8]]
  const rightForward = [[0, 0]]
  const right = [[0, 0]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[0, 0]]
  const leftForward = [[0, 0]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(lance.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for knight', () => {
  const knight: Piece = new Knight('KN', false, [8, 7])
  const forward = [[0, 0]]
  const rightForward = [[0, 0]]
  const right = [[0, 0]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[0, 0]]
  const leftForward = [[0, 0]]
  const knightRightForward = [[6, 8]]
  const knightLeftForward = [[6, 6]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(knight.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for silver', () => {
  const silver: Piece = new Silver('S', true, [0, 2])
  const forward = [[1, 2]]
  const rightForward = [[1, 1]]
  const right = [[0, 0]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[0, 0]]
  const leftForward = [[1, 3]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(silver.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for gold', () => {
  const gold: Piece = new Gold('G', false, [8, 3])
  const forward = [[7, 3]]
  const rightForward = [[7, 4]]
  const right = [[8, 4]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[8, 2]]
  const leftForward = [[7, 2]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(gold.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for Bishop', () => {
  const gold: Piece = new Bishop('B', false, [7, 1])
  const forward = [[0, 0]]
  const rightForward = [[6, 2], [5, 3], [4, 4], [3, 5], [2, 6], [1, 7], [0, 8]]
  const right = [[0, 0]]
  const rightBackward = [[8, 2]]
  const backward = [[0, 0]]
  const leftBackward = [[8, 0]]
  const left = [[0, 0]]
  const leftForward = [[6, 0]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(gold.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for Rook', () => {
  const gold: Piece = new Rook('R', true, [1, 1])
  const forward = [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1]]
  const rightForward = [[0, 0]]
  const right = [[1, 0]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 1]]
  const leftBackward = [[0, 0]]
  const left = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]]
  const leftForward = [[0, 0]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(gold.getAllNextPositions()).toStrictEqual(expectNextSteps)
})

test('get next steps for King', () => {
  const king: Piece = new King('K', false, [8, 4])
  const forward = [[7, 4]]
  const rightForward = [[7, 5]]
  const right = [[8, 5]]
  const rightBackward = [[0, 0]]
  const backward = [[0, 0]]
  const leftBackward = [[0, 0]]
  const left = [[8, 3]]
  const leftForward = [[7, 3]]
  const knightRightForward = [[0, 0]]
  const knightLeftForward = [[0, 0]]
  const expectNextSteps = ([forward, rightForward, right, rightBackward, backward, leftBackward,
    left, leftForward, knightRightForward, knightLeftForward])
  expect(king.getAllNextPositions()).toStrictEqual(expectNextSteps)
})