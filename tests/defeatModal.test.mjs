import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { BOARD_CELLS, QUESTIONS } from '../src/components/game/gameData.js'

// Test data resolution logic used by DefeatModal
function resolveDefeatModalData({ currentPosition = 1, failedQuestion = null, userSelectedOption = null, reason = 'lost_all_lives' }) {
  const cellData = BOARD_CELLS.find((c) => c.id === currentPosition) || BOARD_CELLS[0]
  const questionData =
    failedQuestion ||
    (cellData.questionId ? QUESTIONS[cellData.questionId] : null) ||
    QUESTIONS.q01

  const selectedKey = userSelectedOption || (questionData.correctAnswer === 'A' ? 'B' : 'A')
  const userOptionObj = questionData?.options?.find((o) => o.key === selectedKey)
  const correctOptionObj = questionData?.options?.find((o) => o.key === questionData.correctAnswer)

  const cellNumber = failedQuestion?.cellNumber || cellData.id || currentPosition
  const cellName = failedQuestion?.cellName || cellData.name || 'Phòng trọ ồn'
  const cellTitle = failedQuestion?.title || cellData.title || questionData.title || cellData.name || 'Phòng trọ ồn ào'

  const subtitle = reason === 'lecturer_failed'
    ? 'Bạn đã trả lời sai câu hỏi của Giảng viên. Cùng rút kinh nghiệm và chơi lại nhé!'
    : 'Bạn đã trả lời sai. Cùng rút kinh nghiệm và chơi lại nhé!'

  return {
    cellData,
    questionData,
    selectedKey,
    userOptionObj,
    correctOptionObj,
    cellNumber,
    cellName,
    cellTitle,
    subtitle,
    formattedPos: (currentPosition < 10 ? '0' + currentPosition : String(currentPosition)) + '/32'
  }
}

test('DefeatModal logic: Cell 2 (Phòng trọ ồn ào) data resolution', () => {
  const res = resolveDefeatModalData({ currentPosition: 2 })
  assert.equal(res.cellNumber, 2)
  assert.equal(res.cellTitle, 'Phòng trọ ồn ào')
  assert.equal(res.formattedPos, '02/32')
  assert.equal(res.questionData.id, 'q01')
  assert.equal(res.questionData.correctAnswer, 'B')
  assert.equal(res.selectedKey, 'A', 'Fallback to incorrect option A')
  assert.equal(res.userOptionObj.key, 'A')
  assert.equal(res.correctOptionObj.key, 'B')
  assert.equal(res.questionData.topic, 'Vật chất và ý thức')
})

test('DefeatModal logic: Custom failed question resolution (e.g. Lecturer question Ô 12)', () => {
  const lecturerQ = QUESTIONS.lec01
  const res = resolveDefeatModalData({
    currentPosition: 12,
    failedQuestion: lecturerQ,
    userSelectedOption: 'C',
    reason: 'lecturer_failed'
  })
  assert.equal(res.cellNumber, 12)
  assert.equal(res.formattedPos, '12/32')
  assert.equal(res.selectedKey, 'C')
  assert.equal(res.userOptionObj.key, 'C')
  assert.equal(res.correctOptionObj.key, lecturerQ.correctAnswer)
  assert.equal(res.questionData.type, 'lecturer')
  assert.match(res.subtitle, /Giảng viên/)
})

test('DefeatModal logic: Boundary positions (Start Cell 1, Last Cell 32)', () => {
  const res1 = resolveDefeatModalData({ currentPosition: 1 })
  assert.equal(res1.formattedPos, '01/32')
  assert.ok(res1.cellData)
  assert.equal(res1.cellTitle, 'Điểm Xuất Phát')

  const res32 = resolveDefeatModalData({ currentPosition: 32 })
  assert.equal(res32.formattedPos, '32/32')
  assert.ok(res32.cellData)
  assert.equal(res32.cellTitle, 'Tốt nghiệp xuất sắc!')
})

test('DefeatModal assets: Verify all required authentic Figma defeat assets exist and are non-empty', () => {
  const requiredAssets = [
    'public/assets/game/defeat_chibi_animated.gif',
    'public/assets/game/defeat_chibi_sprite_strip.png',
    'public/assets/game/defeat_frame_0.png',
    'public/assets/game/defeat_frame_1.png',
    'public/assets/game/defeat_frame_2.png',
    'public/assets/game/defeat_frame_3.png',
    'public/assets/game/defeat_chibi_custom.png',
    'public/assets/game/defeat_chibi_exact.png',
    'public/assets/game/defeat_corner_leaf.png',
    'public/assets/game/defeat_title_leaf.png',
    'public/assets/game/defeat.jpg'
  ]

  for (const relPath of requiredAssets) {
    const fullPath = path.resolve(process.cwd(), relPath)
    assert.ok(fs.existsSync(fullPath), `Asset must exist: ${relPath}`)
    const stat = fs.statSync(fullPath)
    assert.ok(stat.size > 500, `Asset must not be empty (${stat.size} bytes): ${relPath}`)
  }
})
