import test from 'node:test'
import assert from 'node:assert/strict'
import { BOARD_CELLS, QUESTIONS, BOARD_COLS, BOARD_ROWS, DICE_POSITION } from '../src/components/game/gameData.js'

test('BOARD_CELLS contains exactly 32 cells in 1-32 order', () => {
  assert.equal(BOARD_CELLS.length, 32)
  BOARD_CELLS.forEach((cell, index) => {
    assert.equal(cell.id, index + 1)
  })
})

test('Cell distribution matches exact MLN111 specifications', () => {
  const startCells = BOARD_CELLS.filter((c) => c.type === 'start')
  const finishCells = BOARD_CELLS.filter((c) => c.type === 'finish')
  const questionCells = BOARD_CELLS.filter((c) => c.type === 'question')
  const lecturerCells = BOARD_CELLS.filter((c) => c.type === 'lecturer')
  const restartCells = BOARD_CELLS.filter((c) => c.type === 'restart')
  const stepBackCells = BOARD_CELLS.filter((c) => c.type === 'step_back')
  const extraRollCells = BOARD_CELLS.filter((c) => c.type === 'extra_roll')
  const restCells = BOARD_CELLS.filter((c) => c.type === 'rest')

  assert.equal(startCells.length, 1, 'Exactly 1 Start cell (Cell 1)')
  assert.equal(startCells[0].id, 1)

  assert.equal(finishCells.length, 1, 'Exactly 1 Finish/Graduation cell (Cell 32)')
  assert.equal(finishCells[0].id, 32)

  assert.equal(questionCells.length, 13, 'Exactly 13 Situational Question cells')
  assert.deepEqual(
    questionCells.map((c) => c.id),
    [2, 4, 5, 8, 9, 11, 15, 17, 19, 22, 25, 28, 30]
  )

  assert.equal(lecturerCells.length, 2, 'Exactly 2 Lecturer Exam cells')
  assert.deepEqual(
    lecturerCells.map((c) => c.id),
    [12, 23]
  )

  assert.equal(restartCells.length, 2, 'Exactly 2 Restart (Hoc lai) cells')
  assert.deepEqual(
    restartCells.map((c) => c.id),
    [16, 29]
  )

  assert.equal(stepBackCells.length, 2, 'Exactly 2 Step Back (Lui buoc) cells')
  assert.deepEqual(
    stepBackCells.map((c) => c.id),
    [13, 26]
  )

  assert.equal(extraRollCells.length, 2, 'Exactly 2 Extra Roll (Gieo them) cells')
  assert.deepEqual(
    extraRollCells.map((c) => c.id),
    [6, 20]
  )

  assert.equal(restCells.length, 9, 'Exactly 9 Rest (Giai lao) cells')
  assert.deepEqual(
    restCells.map((c) => c.id),
    [3, 7, 10, 14, 18, 21, 24, 27, 31]
  )

  // Total sum
  assert.equal(
    startCells.length +
      finishCells.length +
      questionCells.length +
      lecturerCells.length +
      restartCells.length +
      stepBackCells.length +
      extraRollCells.length +
      restCells.length,
    32
  )
})

test('Zigzag layout trajectory matches 4 rows x 8 cols structure', () => {
  // Row 1: Cells 1-8 (Left to Right)
  for (let i = 1; i <= 8; i++) {
    const cell = BOARD_CELLS[i - 1]
    assert.equal(cell.y, BOARD_ROWS[0])
    assert.equal(cell.x, BOARD_COLS[i - 1])
  }

  // Row 2: Cells 9-16 (Right to Left)
  for (let i = 9; i <= 16; i++) {
    const cell = BOARD_CELLS[i - 1]
    assert.equal(cell.y, BOARD_ROWS[1])
    assert.equal(cell.x, BOARD_COLS[16 - i])
  }

  // Row 3: Cells 17-24 (Left to Right)
  for (let i = 17; i <= 24; i++) {
    const cell = BOARD_CELLS[i - 1]
    assert.equal(cell.y, BOARD_ROWS[2])
    assert.equal(cell.x, BOARD_COLS[i - 17])
  }

  // Row 4: Cells 25-32 (Right to Left)
  for (let i = 25; i <= 32; i++) {
    const cell = BOARD_CELLS[i - 1]
    assert.equal(cell.y, BOARD_ROWS[3])
    assert.equal(cell.x, BOARD_COLS[32 - i])
  }
})

test('All 15 questions are valid and adhere to schema', () => {
  const questionKeys = Object.keys(QUESTIONS)
  assert.equal(questionKeys.length, 15, 'Total 15 questions (13 normal + 2 lecturer)')

  const normalQuestions = questionKeys.filter((k) => QUESTIONS[k].type === 'normal')
  const lecturerQuestions = questionKeys.filter((k) => QUESTIONS[k].type === 'lecturer')
  assert.equal(normalQuestions.length, 13)
  assert.equal(lecturerQuestions.length, 2)

  questionKeys.forEach((k) => {
    const q = QUESTIONS[k]
    assert.ok(q.id, `Question ${k} must have id`)
    assert.ok(q.title && q.title.trim().length > 0, `Question ${k} must have title`)
    assert.ok(q.question && q.question.trim().length > 0, `Question ${k} must have question text`)
    assert.equal(Array.isArray(q.options), true, `Question ${k} options must be array`)
    assert.equal(q.options.length, 4, `Question ${k} must have exactly 4 options`)
    assert.deepEqual(
      q.options.map((o) => o.key),
      ['A', 'B', 'C', 'D'],
      `Question ${k} option keys must be A, B, C, D`
    )
    assert.ok(['A', 'B', 'C', 'D'].includes(q.correctAnswer), `Question ${k} correctAnswer must be A/B/C/D`)
    assert.ok(q.topic && q.topic.length > 0, `Question ${k} must have topic`)
    assert.ok(q.explanation && q.explanation.length > 0, `Question ${k} must have explanation`)
  })
})

test('Every question and lecturer cell in BOARD_CELLS references a valid question', () => {
  const referencedIds = new Set()
  BOARD_CELLS.forEach((cell) => {
    if (cell.type === 'question' || cell.type === 'lecturer') {
      assert.ok(cell.questionId, `Cell ${cell.id} missing questionId`)
      assert.ok(QUESTIONS[cell.questionId], `Cell ${cell.id} references invalid question ${cell.questionId}`)
      referencedIds.add(cell.questionId)
    }
  })
  assert.equal(referencedIds.size, 15, 'All 15 questions are referenced across the board')
})

test('Expected answer keys match MLN111 document verbatim', () => {
  const expectedAnswers = {
    q01: 'B',
    q02: 'D',
    q03: 'A',
    q04: 'C',
    q05: 'A',
    q06: 'D',
    lec01: 'D',
    q07: 'B',
    q08: 'C',
    q09: 'D',
    q10: 'A',
    lec02: 'C',
    q11: 'C',
    q12: 'B',
    q13: 'A'
  }

  for (const [qid, ans] of Object.entries(expectedAnswers)) {
    assert.equal(QUESTIONS[qid].correctAnswer, ans, `Question ${qid} expected answer ${ans}`)
  }
})

test('Dice position is calibrated to map lawn center', () => {
  assert.equal(typeof DICE_POSITION.x, 'number')
  assert.equal(typeof DICE_POSITION.y, 'number')
  assert.ok(DICE_POSITION.x >= 45 && DICE_POSITION.x <= 55, 'Dice X should be centered')
  assert.ok(DICE_POSITION.y >= 48 && DICE_POSITION.y <= 58, 'Dice Y should be centered')
})
