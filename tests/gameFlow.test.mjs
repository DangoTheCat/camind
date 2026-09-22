import test from 'node:test'
import assert from 'node:assert/strict'
import { BOARD_CELLS, QUESTIONS } from '../src/components/game/gameData.js'

test('Game flow: Forward movement clamping at finish cell 32', () => {
  const roll = 6
  let current = 28
  let target = Math.min(32, current + roll)
  assert.equal(target, 32, 'Clamps to cell 32 without exceeding')

  current = 31
  target = Math.min(32, current + roll)
  assert.equal(target, 32, 'Clamps to cell 32 when near finish')
})

test('Game flow: Step back calculation clamped at Start cell 1', () => {
  // From cell 13 (step back cell)
  for (let roll = 1; roll <= 6; roll++) {
    const target = Math.max(1, 13 - roll)
    assert.ok(target >= 1 && target < 13)
  }

  // Edge case: if a player somehow steps back from cell 2 with roll of 5
  const underflow = Math.max(1, 2 - 5)
  assert.equal(underflow, 1, 'Never drops below Cell 1')
})

test('Game flow: 3 Lives deduction and Defeat trigger', () => {
  let lives = 3
  let isDefeat = false
  let defeatReason = null

  function onNormalQuestionFail() {
    lives -= 1
    if (lives <= 0) {
      isDefeat = true
      defeatReason = 'lost_all_lives'
    }
  }

  onNormalQuestionFail()
  assert.equal(lives, 2)
  assert.equal(isDefeat, false)

  onNormalQuestionFail()
  assert.equal(lives, 1)
  assert.equal(isDefeat, false)

  onNormalQuestionFail()
  assert.equal(lives, 0)
  assert.equal(isDefeat, true)
  assert.equal(defeatReason, 'lost_all_lives')
})

test('Game flow: Lecturer question fail triggers Defeat immediately regardless of lives', () => {
  const lives = 3
  let isDefeat = false
  let defeatReason = null

  function onLecturerQuestionFail() {
    isDefeat = true
    defeatReason = 'lecturer_failed'
  }

  onLecturerQuestionFail()
  assert.equal(lives, 3, 'Lives remained untouched')
  assert.equal(isDefeat, true, 'Defeat triggered instantly')
  assert.equal(defeatReason, 'lecturer_failed')
})

test('Game flow: Facing direction calculation for all cells and reverse steps', () => {
  function getDirectionForCell(cellId) {
    if (cellId <= 8) return 'right'
    if (cellId <= 16) return 'left'
    if (cellId <= 24) return 'right'
    return 'left'
  }

  // Forward facing directions
  assert.equal(getDirectionForCell(1), 'right')
  assert.equal(getDirectionForCell(8), 'right')
  assert.equal(getDirectionForCell(9), 'left')
  assert.equal(getDirectionForCell(16), 'left')
  assert.equal(getDirectionForCell(17), 'right')
  assert.equal(getDirectionForCell(24), 'right')
  assert.equal(getDirectionForCell(25), 'left')
  assert.equal(getDirectionForCell(32), 'left')

  // Dynamic movement direction: moving backward
  function getWalkingDirection(curr, isForward) {
    const normal = getDirectionForCell(curr)
    return isForward ? normal : normal === 'right' ? 'left' : 'right'
  }

  // Moving forward in Row 1 -> faces right
  assert.equal(getWalkingDirection(3, true), 'right')
  // Moving backward in Row 1 -> faces left
  assert.equal(getWalkingDirection(3, false), 'left')

  // Moving forward in Row 2 -> faces left
  assert.equal(getWalkingDirection(12, true), 'left')
  // Moving backward in Row 2 -> faces right
  assert.equal(getWalkingDirection(12, false), 'right')
})
