import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  RotateCcw,
  Home,
  HelpCircle,
  Volume2,
  VolumeX,
  Sparkles,
  MapPin,
  Lightbulb,
  X,
  BookOpen,
  ArrowRight
} from 'lucide-react'
import GameBoard from './GameBoard'
import QuestionModal from './QuestionModal'
import VictoryModal from './VictoryModal'
import DefeatModal from './DefeatModal'
import FigmaOpenHeader from '../FigmaOpenHeader'
import FeedbackModal from '../FeedbackModal'
import { BOARD_CELLS, QUESTIONS } from './gameData'

// Helper for facing direction based on cell ID
function getDirectionForCell(cellId) {
  if (cellId <= 8) return 'right'
  if (cellId <= 16) return 'left'
  if (cellId <= 24) return 'right'
  return 'left'
}

export default function CamindGame({
  onExitToHome,
  onNavClick,
  onLogoClick,
  onControllerClick
}) {
  // Game states
  const [currentCellId, setCurrentCellId] = useState(1)
  const [characterPos, setCharacterPos] = useState({
    x: BOARD_CELLS[0].x,
    y: BOARD_CELLS[0].y
  })
  const [facingDirection, setFacingDirection] = useState('right')
  const [isMoving, setIsMoving] = useState(false)
  const [isJumping, setIsJumping] = useState(false)

  // Dice states
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [canRoll, setCanRoll] = useState(true)
  const [dicePrompt, setDicePrompt] = useState('Gieo xúc xắc')

  // Player stats
  const [lives, setLives] = useState(3)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0)

  // Modals & Popups
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false)
  const [isDefeatModalOpen, setIsDefeatModalOpen] = useState(false)
  const [defeatReason, setDefeatReason] = useState('lost_all_lives')
  const [failedQuestionData, setFailedQuestionData] = useState(null)
  const [failedUserAnswer, setFailedUserAnswer] = useState(null)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Sound effects & lifecycle refs
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioCtxRef = useRef(null)
  const isMountedRef = useRef(true)
  const moveSeqRef = useRef(0)
  const rollTimeoutRef = useRef(null)
  const rollIntervalRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Simple Web Audio API sound synthesizer
  const playSound = useCallback((type) => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) audioCtxRef.current = new AudioCtx()
      }
      if (!audioCtxRef.current) return
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      const ctx = audioCtxRef.current
      const now = ctx.currentTime

      if (type === 'roll') {
        // Subtle rolling clicking sounds
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(320, now)
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.08)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'step') {
        // Soft hop blip
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(420, now)
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.12)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.12)
      } else if (type === 'correct') {
        // Bright major triad
        ;[523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(freq, now + i * 0.1)
          gain.gain.setValueAtTime(0.12, now + i * 0.1)
          gain.gain.linearRampToValueAtTime(0.01, now + i * 0.1 + 0.22)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now + i * 0.1)
          osc.stop(now + i * 0.1 + 0.22)
        })
      } else if (type === 'wrong') {
        // Low buzzer
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(160, now)
        osc.frequency.linearRampToValueAtTime(110, now + 0.3)
        gain.gain.setValueAtTime(0.15, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.3)
      } else if (type === 'victory') {
        // Fanfare
        ;[440, 554.37, 659.25, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(freq, now + i * 0.12)
          gain.gain.setValueAtTime(0.18, now + i * 0.12)
          gain.gain.linearRampToValueAtTime(0.01, now + i * 0.12 + 0.4)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now + i * 0.12)
          osc.stop(now + i * 0.12 + 0.4)
        })
      }
    } catch {
      // AudioContext failure gracefully ignored
    }
  }, [soundEnabled])

  // Show a temporary toast message
  const showToast = useCallback((icon, text, duration = 2400) => {
    setToastMessage({ icon, text })
    setTimeout(() => {
      setToastMessage(null)
    }, duration)
  }, [])

  // Animate step-by-step movement
  const moveCharacterPath = useCallback(async (startId, endId) => {
    const moveSeq = ++moveSeqRef.current
    setIsMoving(true)
    const isForward = endId >= startId
    const stepDiff = isForward ? 1 : -1
    let curr = startId

    while (curr !== endId) {
      if (!isMountedRef.current || moveSeq !== moveSeqRef.current) return endId
      curr += stepDiff
      const cellData = BOARD_CELLS[curr - 1]
      if (cellData) {
        // Natural facing direction: if stepping backwards, face opposite of row default
        const normalDir = getDirectionForCell(curr)
        const stepDir = isForward ? normalDir : (normalDir === 'right' ? 'left' : 'right')
        setFacingDirection(stepDir)
        setCharacterPos({ x: cellData.x, y: cellData.y })
        setCurrentCellId(curr)
        playSound('step')

        await new Promise((resolve) => setTimeout(resolve, 360))
        if (!isMountedRef.current || moveSeq !== moveSeqRef.current) return endId
      }
    }

    if (isMountedRef.current && moveSeq === moveSeqRef.current) {
      // Re-orient to cell default facing direction upon stopping
      setFacingDirection(getDirectionForCell(endId))
      setIsMoving(false)
      // Cheerful destination landing hop
      setIsJumping(true)
      await new Promise((resolve) => setTimeout(resolve, 260))
      if (isMountedRef.current && moveSeq === moveSeqRef.current) {
        setIsJumping(false)
      }
    }
    return endId
  }, [playSound])

  // Handle cell landing events
  const handleCellEvent = useCallback(async (cellId) => {
    const cell = BOARD_CELLS[cellId - 1]
    if (!cell) return

    // Finish Cell
    if (cellId >= 32 || cell.type === 'finish') {
      playSound('victory')
      setIsVictoryModalOpen(true)
      return
    }

    // Question Cell or Lecturer Cell
    if (cell.type === 'question' || cell.type === 'lecturer') {
      const q = QUESTIONS[cell.questionId]
      if (q) {
        setCurrentQuestion(q)
        setIsQuestionModalOpen(true)
      } else {
        setCanRoll(true)
      }
      return
    }

    // Rest / Break Cell
    if (cell.type === 'rest') {
      showToast('🌿', `Ô ${cell.id} - ${cell.title}: ${cell.desc}`, 2800)
      setTimeout(() => {
        if (isMountedRef.current) setCanRoll(true)
      }, 2800)
      return
    }

    // Extra Roll Cell
    if (cell.type === 'extra_roll') {
      showToast('🎲', 'Ô Gieo thêm! Bạn được thưởng thêm 1 lượt gieo xúc xắc!', 2500)
      setTimeout(() => {
        if (isMountedRef.current) {
          setCanRoll(true)
          setDicePrompt('Gieo thêm!')
        }
      }, 2500)
      return
    }

    // Step Back Cell
    if (cell.type === 'step_back') {
      showToast('⏪', 'Ô Lùi bước! Đang gieo xúc xắc lùi 1–6 bước...', 2000)
      setIsRolling(true)
      setDicePrompt('Đang gieo lùi...')
      playSound('roll')

      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current)
      rollIntervalRef.current = setInterval(() => {
        playSound('roll')
      }, 120)

      await new Promise((resolve) => setTimeout(resolve, 750))
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current)
        rollIntervalRef.current = null
      }
      if (!isMountedRef.current) return

      const backSteps = Math.floor(Math.random() * 6) + 1
      setDiceValue(backSteps)
      setIsRolling(false)
      setDicePrompt(`Lùi ${backSteps} bước`)

      const targetBack = Math.max(1, cellId - backSteps)
      showToast('⏪', `Kết quả lùi ${backSteps} bước: Lùi về Ô ${targetBack}!`, 2000)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (!isMountedRef.current) return

      await moveCharacterPath(cellId, targetBack)
      if (!isMountedRef.current) return
      setDicePrompt('Gieo xúc xắc')
      setTimeout(() => {
        if (isMountedRef.current) setCanRoll(true)
      }, 800)
      return
    }

    // Restart Cell (Học lại)
    if (cell.type === 'restart') {
      showToast('🔄', 'Ô Học lại! Quay về Ô 1 Xuất phát để củng cố kiến thức (không trừ mạng)!', 2400)
      await new Promise((resolve) => setTimeout(resolve, 2400))

      await moveCharacterPath(cellId, 1)
      setTimeout(() => {
        setCanRoll(true)
      }, 800)
      return
    }

    // Start or default
    setCanRoll(true)
  }, [moveCharacterPath, playSound, showToast])

  // Player rolls the dice
  const handleRollDice = useCallback(() => {
    if (!canRoll || isRolling || isMoving) return

    setCanRoll(false)
    setIsRolling(true)
    setDicePrompt('Đang gieo...')
    playSound('roll')

    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current)
    rollIntervalRef.current = setInterval(() => {
      playSound('roll')
    }, 120)

    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)
    rollTimeoutRef.current = setTimeout(async () => {
      if (rollIntervalRef.current) {
        clearInterval(rollIntervalRef.current)
        rollIntervalRef.current = null
      }
      if (!isMountedRef.current) return

      const roll = Math.floor(Math.random() * 6) + 1
      setDiceValue(roll)
      setIsRolling(false)
      setDicePrompt(`Đã ra số ${roll}!`)

      const targetId = Math.min(32, currentCellId + roll)
      showToast('🎲', `Tiến ${roll} bước tới Ô ${targetId}!`, 1200)
      await new Promise((resolve) => setTimeout(resolve, 600))
      if (!isMountedRef.current) return

      const finalId = await moveCharacterPath(currentCellId, targetId)
      if (!isMountedRef.current) return
      setDicePrompt('Gieo xúc xắc')
      handleCellEvent(finalId)
    }, 750)
  }, [canRoll, isRolling, isMoving, currentCellId, moveCharacterPath, handleCellEvent, playSound, showToast])

  // Handle Question Modal Answer Confirmation
  const handleQuestionAnswered = useCallback(async (isCorrect, selectedKey) => {
    setIsQuestionModalOpen(false)
    setTotalQuestionsAnswered((prev) => prev + 1)

    if (isCorrect) {
      playSound('correct')
      setCorrectCount((prev) => prev + 1)
      showToast('🎉', 'Chính xác! Bạn trả lời đúng và được đi tiếp!', 2200)
      setTimeout(() => {
        if (isMountedRef.current) setCanRoll(true)
      }, 2200)
    } else {
      playSound('wrong')
      // If failed lecturer question -> DEFEAT IMMEDIATELY!
      if (currentQuestion?.type === 'lecturer') {
        setFailedQuestionData(currentQuestion)
        setFailedUserAnswer(selectedKey)
        setDefeatReason('lecturer_failed')
        setIsDefeatModalOpen(true)
        return
      }

      // If normal question failed -> Deduct 1 life
      const remainingLives = lives - 1
      setLives(remainingLives)

      if (remainingLives <= 0) {
        setFailedQuestionData(currentQuestion)
        setFailedUserAnswer(selectedKey)
        setDefeatReason('lost_all_lives')
        setIsDefeatModalOpen(true)
      } else {
        // Still has lives: step back 2 cells (min cell 1)
        const targetBack = Math.max(1, currentCellId - 2)
        showToast('💔', `Chưa chính xác! Mất 1 ❤️ và lùi lại Ô ${targetBack}!`, 2500)
        await new Promise((resolve) => setTimeout(resolve, 1400))
        if (!isMountedRef.current) return

        await moveCharacterPath(currentCellId, targetBack)
        setTimeout(() => {
          if (isMountedRef.current) setCanRoll(true)
        }, 1000)
      }
    }
  }, [currentQuestion, lives, currentCellId, moveCharacterPath, playSound, showToast])

  // Restart game from beginning
  const handleRestartGame = useCallback(() => {
    moveSeqRef.current++
    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)
    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current)
    setCurrentCellId(1)
    setCharacterPos({ x: BOARD_CELLS[0].x, y: BOARD_CELLS[0].y })
    setFacingDirection('right')
    setIsMoving(false)
    setIsJumping(false)
    setDiceValue(1)
    setIsRolling(false)
    setCanRoll(true)
    setDicePrompt('Gieo xúc xắc')
    setLives(3)
    setCorrectCount(0)
    setTotalQuestionsAnswered(0)
    setCurrentQuestion(null)
    setIsQuestionModalOpen(false)
    setIsVictoryModalOpen(false)
    setIsDefeatModalOpen(false)
    setFailedQuestionData(null)
    setFailedUserAnswer(null)
    setToastMessage(null)
    showToast('🚀', 'Ván mới bắt đầu! Chúc bạn tốt nghiệp thành công!', 2000)
  }, [showToast])

  // Current active cell data
  const currentCell = BOARD_CELLS.find((c) => c.id === currentCellId) || BOARD_CELLS[0]

  return (
    <div
      className="camind-game-page"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #F5F7F2 0%, #E8EFE2 50%, #DCE8D4 100%)',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Figma Torn Paper Header */}
      <div style={{ position: 'relative', zIndex: 100, width: '100%' }}>
        <FigmaOpenHeader
          activeTab={null}
          isControllerActive={true}
          onNavClick={onNavClick}
          onControllerClick={onControllerClick}
          onFeedbackClick={() => setIsFeedbackOpen(true)}
          onLogoClick={onLogoClick}
        />
      </div>

      {/* Game Content Container (offset by header 84px) */}
      <div
        style={{
          paddingTop: 88,
          paddingBottom: 40,
          paddingLeft: 20,
          paddingRight: 20,
          width: '100%',
          maxWidth: 1480,
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        {/* Game HUD Bar */}
        <div
          className="game-hud-bar"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: 22,
            border: '2px solid rgba(47, 123, 78, 0.25)',
            boxShadow: '0 8px 24px rgba(0, 40, 20, 0.08)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap'
          }}
        >
          {/* Left HUD: Lives (❤️❤️❤️) & Current Position */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Lives Heart Group */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#FEF2F2',
                border: '1.5px solid #FECACA',
                padding: '6px 14px',
                borderRadius: 16
              }}
              title={`Số mạng còn lại: ${lives}/3`}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991B1B' }}>Mạng:</span>
              <div style={{ display: 'flex', gap: 5 }}>
                {[1, 2, 3].map((heartIndex) => {
                  const isActive = heartIndex <= lives
                  return (
                    <motion.div
                      key={heartIndex}
                      animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 0.9 }}
                      transition={
                        isActive
                          ? { repeat: Infinity, duration: 2.2, delay: heartIndex * 0.25 }
                          : {}
                      }
                    >
                      <Heart
                        size={20}
                        color={isActive ? '#EF4444' : '#D1D5DB'}
                        fill={isActive ? '#EF4444' : '#E5E7EB'}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Current Position Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#F0FDF4',
                border: '1.5px solid #BBF7D0',
                padding: '6px 16px',
                borderRadius: 16
              }}
            >
              <MapPin size={18} color="#15803D" />
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#166534' }}>
                Ô {currentCellId < 10 ? `0${currentCellId}` : currentCellId}/32:
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1F2937' }}>
                {currentCell.name}
              </span>
            </div>

            {/* Score Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#FEF9C3',
                border: '1.5px solid #FDE047',
                padding: '6px 14px',
                borderRadius: 16
              }}
            >
              <Lightbulb size={18} color="#B45309" />
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#92400E' }}>
                Đúng: {correctCount} câu
              </span>
            </div>
          </div>

          {/* Right HUD: Rules, Sound, Reset, Exit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Rules Guide button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRulesModalOpen(true)}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: 14,
                padding: '8px 14px',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="Xem luật chơi"
            >
              <HelpCircle size={16} />
              <span>Luật chơi</span>
            </motion.button>

            {/* Sound Toggle */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled((prev) => !prev)}
              style={{
                background: soundEnabled ? '#F0FDF4' : '#F3F4F6',
                border: soundEnabled ? '1.5px solid #86EFAC' : '1.5px solid #CBD5E1',
                borderRadius: 14,
                padding: '8px 12px',
                color: soundEnabled ? '#15803D' : '#6B7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </motion.button>

            {/* Reset Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestartGame}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: 14,
                padding: '8px 14px',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="Chơi lại từ đầu"
            >
              <RotateCcw size={16} />
              <span>Chơi lại</span>
            </motion.button>

            {/* Exit to Home / Back to Website */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExitToHome}
              style={{
                background: 'linear-gradient(135deg, #2F7B4E 0%, #1B4D30 100%)',
                border: 'none',
                borderRadius: 14,
                padding: '8px 16px',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 4px 10px rgba(47, 123, 78, 0.3)'
              }}
              title="Thoát game và quay lại trang chủ Camind"
            >
              <Home size={16} />
              <span>Về trang web</span>
            </motion.button>
          </div>
        </div>

        {/* Responsive 32-Cell Board */}
        <GameBoard
          currentCellId={currentCellId}
          characterPos={characterPos}
          isMoving={isMoving}
          isJumping={isJumping}
          facingDirection={facingDirection}
          diceValue={diceValue}
          isRolling={isRolling}
          canRoll={canRoll}
          onRollDice={handleRollDice}
          dicePrompt={dicePrompt}
          toastMessage={toastMessage}
          onCellClick={(cell) => {
            showToast('ℹ️', `Ô ${cell.id}: ${cell.title} - ${cell.desc}`, 2000)
          }}
        />
      </div>

      {/* Question Modal */}
      <QuestionModal
        key={currentQuestion?.id || 'question-modal'}
        isOpen={isQuestionModalOpen}
        question={currentQuestion}
        cell={currentCell}
        onAnswer={handleQuestionAnswered}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        finalPosition={32}
        correctCount={correctCount}
        totalQuestionsAnswered={totalQuestionsAnswered}
        onRestart={handleRestartGame}
        onExitToHome={onExitToHome}
      />

      {/* Defeat Modal */}
      <DefeatModal
        isOpen={isDefeatModalOpen}
        currentPosition={currentCellId}
        correctCount={correctCount}
        reason={defeatReason}
        failedQuestion={failedQuestionData}
        userSelectedOption={failedUserAnswer}
        onRestart={handleRestartGame}
        onExitToHome={onExitToHome}
      />

      {/* Rules Modal */}
      <AnimatePresence>
        {isRulesModalOpen && (
          <div
            className="game-modal-backdrop"
            onClick={() => setIsRulesModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(10, 25, 15, 0.65)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 680,
                maxHeight: '88vh',
                overflowY: 'auto',
                background: '#FFFFFF',
                borderRadius: 28,
                border: '3px solid #2F7B4E',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                padding: '32px 36px',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsRulesModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#4B5563'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <BookOpen size={28} color="#2F7B4E" />
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#143621' }}>
                  Luật Chơi: Camind – Hành Trình Sinh Viên
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.95rem', color: '#374151', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  <strong>Mục tiêu:</strong> Gieo xúc xắc, điều khiển nhân vật sinh viên vượt qua 32 ô thử thách zíc zắc trên khuôn viên trường để chạm mốc <strong>Ô 32 (Tốt nghiệp)</strong>!
                </p>

                <div style={{ background: '#F0FDF4', padding: '14px 18px', borderRadius: 16, border: '1.5px solid #BBF7D0' }}>
                  <div style={{ fontWeight: 800, color: '#166534', marginBottom: 6 }}>❤️ Hệ thống 3 mạng sống:</div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li>Bạn khởi đầu với <strong>3 Tim (❤️❤️❤️)</strong>.</li>
                    <li>Trả lời sai một câu hỏi tình huống: <strong>Mất 1 ❤️ và bị lùi lại 2 ô</strong>. Mất cả 3 ❤️ sẽ thua game!</li>
                    <li>
                      <strong style={{ color: '#7C3AED' }}>Ô Giảng viên (Ô 12 & Ô 23):</strong> Là bài kiểm tra khó. Đúng được đi tiếp, <strong>sai sẽ bị Game Over ngay lập tức!</strong>
                    </li>
                  </ul>
                </div>

                <div style={{ background: '#FEF9C3', padding: '14px 18px', borderRadius: 16, border: '1.5px solid #FDE047' }}>
                  <div style={{ fontWeight: 800, color: '#92400E', marginBottom: 6 }}>🗺️ Các loại ô đặc biệt:</div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><strong>Ô Giải lao (9 ô):</strong> Ô an toàn thư giãn (Uống nước, Đi dạo, Nghe nhạc...). Không mất lượt.</li>
                    <li><strong>Ô Gieo thêm (Ô 6 & Ô 20):</strong> Thưởng thêm 1 lần gieo xúc xắc và tiến bước!</li>
                    <li><strong>Ô Lùi bước (Ô 13 & Ô 26):</strong> Tự động gieo xúc xắc lùi từ 1–6 bước.</li>
                    <li><strong>Ô Học lại (Ô 16 & Ô 29):</strong> Đưa bạn quay lại Ô 1 Xuất phát (không trừ mạng).</li>
                  </ul>
                </div>

                <p style={{ margin: 0, fontStyle: 'italic', color: '#6B7280' }}>
                  💡 Mỗi câu hỏi đều kèm theo phần giải thích vận dụng sâu sắc các nguyên lý, quy luật triết học Mác - Lênin (MLN111). Hãy vừa chơi vừa tích lũy kiến thức nhé!
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRulesModalOpen(false)}
                  style={{
                    background: 'linear-gradient(135deg, #2F7B4E 0%, #1B4D30 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 20,
                    padding: '10px 24px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Đã hiểu, bắt đầu chơi!
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  )
}
