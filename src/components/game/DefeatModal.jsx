import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Home, Download, MapPin, Lightbulb } from 'lucide-react'
import { BOARD_CELLS, QUESTIONS } from './gameData'

/* ==========================================================================
   DECORATIVE ASSETS & SVGS (Pixel-perfect matches to Figma defeat.jpg)
   ========================================================================== */

// 1. Two-tone Green Leaves for Card Corners
function CornerLeaves({ position = 'top-left' }) {
  const isTop = position.includes('top')
  const isLeft = position.includes('left')

  return (
    <img
      src="/assets/game/defeat_corner_leaf.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: isTop ? 10 : 'auto',
        bottom: !isTop ? 10 : 'auto',
        left: isLeft ? 10 : 'auto',
        right: !isLeft ? 10 : 'auto',
        width: 44,
        height: 'auto',
        transform: `scale(${isLeft ? 1 : -1}, ${isTop ? -1 : 1})`,
        pointerEvents: 'none',
        zIndex: 10,
        userSelect: 'none'
      }}
    />
  )
}

// 2. Small Green Leaf Accent for Review Cards
function CardAccentLeaf({ style = {} }) {
  return (
    <img
      src="/assets/game/defeat_title_leaf.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 8,
        right: 10,
        width: 18,
        height: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style
      }}
    />
  )
}

// 3. Green Leaf flanking Title "Bạn đã thua!"
function TitleLeaf({ flipped = false }) {
  return (
    <img
      src="/assets/game/defeat_title_leaf.png"
      alt=""
      aria-hidden="true"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        width: 26,
        height: 'auto',
        transform: flipped ? 'scaleX(-1) rotate(15deg)' : 'rotate(-15deg)',
        flexShrink: 0,
        userSelect: 'none'
      }}
    />
  )
}

// 4. Curved Coral Doodle Arcs flanking "THUA GAME"
function CoralArcs({ side = 'left' }) {
  const isRight = side === 'right'
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      style={{
        transform: isRight ? 'scaleX(-1)' : 'none',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0
      }}
    >
      <path
        d="M17 2C12 5 12 13 17 16"
        stroke="#F87171"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9 4C5 6.5 5 11.5 9 14"
        stroke="#F87171"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 5. Small Floating Leaf Accent for card borders
function FloatingLeaf({ style }) {
  return (
    <img
      src="/assets/game/defeat_title_leaf.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 22,
        height: 'auto',
        pointerEvents: 'none',
        zIndex: 5,
        userSelect: 'none',
        ...style
      }}
    />
  )
}

export default function DefeatModal({
  isOpen = true,
  currentPosition = 1,
  correctCount = 0,
  reason = 'lost_all_lives', // 'lost_all_lives' | 'lecturer_failed'
  failedQuestion = null,
  userSelectedOption = null,
  onRestart,
  onExitToHome
}) {
  if (!isOpen) return null

  // Fallback data resolution
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

  const handleSaveResult = () => {
    const text = `💔 Camind MLN111 - Kết Quả Mini-Game\n- Trạng thái: THUA GAME (Bạn đã thua!)\n- Vị trí dừng: Ô ${currentPosition < 10 ? '0' + currentPosition : currentPosition}/32 (${cellName})\n- Số câu đúng: ${correctCount} câu\n"Cùng rút kinh nghiệm và chơi lại nhé!"`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép kết quả vào bộ nhớ tạm (Clipboard)!')
      })
    } else {
      alert(text)
    }
  }

  return (
    <AnimatePresence>
      <div
        className="game-modal-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(10, 25, 15, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 12px',
          overflowY: 'auto'
        }}
      >
        <motion.div
          className="defeat-modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 820,
            maxHeight: '94vh',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            border: '3.5px solid #1E5E3A',
            boxShadow:
              '0 24px 60px rgba(15, 60, 30, 0.28), 0 8px 24px rgba(0, 0, 0, 0.12)',
            padding: '24px 32px 18px 32px',
            boxSizing: 'border-box',
            fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
          }}
        >
          {/* Corner Leaves matching Figma defeat.jpg nestled cleanly inside */}
          <CornerLeaves position="top-left" />
          <CornerLeaves position="top-right" />
          <CornerLeaves position="bottom-left" />
          <CornerLeaves position="bottom-right" />

          {/* Side Floating Leaves from Figma */}
          <FloatingLeaf style={{ top: '42%', left: 8, transform: 'rotate(-20deg)' }} />
          <FloatingLeaf style={{ top: '46%', right: 8, transform: 'rotate(45deg)' }} />
          <FloatingLeaf style={{ bottom: 24, right: 28, transform: 'rotate(-30deg)' }} />

          {/* ================================================================
              TOP HEADER: THUA GAME / Bạn đã thua! / Subtitle
              ================================================================ */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            {/* THUA GAME Coral Badge with Arcs */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6
              }}
            >
              <CoralArcs side="left" />
              <div
                style={{
                  background: '#FCA5A5',
                  color: '#7F1D1D',
                  padding: '4px 24px',
                  borderRadius: 9999,
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 6px rgba(248, 113, 113, 0.2)'
                }}
              >
                THUA GAME
              </div>
              <CoralArcs side="right" />
            </div>

            {/* Main Title: 🍃 Bạn đã thua! 🍃 */}
            <h1
              style={{
                margin: '2px 0 4px 0',
                fontSize: '2.1rem',
                fontWeight: 900,
                color: '#13361E',
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10
              }}
            >
              <TitleLeaf />
              <span>Bạn đã thua!</span>
              <TitleLeaf flipped />
            </h1>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '0.94rem',
                color: '#334155',
                fontWeight: 600,
                marginTop: 2
              }}
            >
              {reason === 'lecturer_failed'
                ? 'Bạn đã trả lời sai câu hỏi của Giảng viên. Cùng rút kinh nghiệm và chơi lại nhé!'
                : 'Bạn đã trả lời sai. Cùng rút kinh nghiệm và chơi lại nhé!'}
            </div>
          </div>

          {/* ================================================================
              MAIN 2-COLUMN SECTION: CHARACTER + STATS & REVIEW CARDS
              ================================================================ */}
          <div
            className="defeat-modal-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
              alignItems: 'start',
              marginBottom: 16
            }}
          >
            {/* LEFT COLUMN: Standing Defeat Illustration & Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: '100%'
              }}
            >
              {/* Animated Defeat Chibi with crying, pulling hair and waving failed test */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 250,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 215
                }}
              >
                <img
                  src="/assets/game/defeat_chibi_animated.gif"
                  alt="Nhân vật vò đầu bứt tóc khóc vì thua cuộc"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.12))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/game/defeat_chibi_custom.png'
                  }}
                />
              </div>

              {/* Mini Stats (Side-by-side) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  width: '100%'
                }}
              >
                {/* Vị trí dừng */}
                <div
                  style={{
                    background: '#EDF7ED',
                    border: '1.5px solid #B8E2BE',
                    borderRadius: 14,
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#C8E6C9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={18} color="#1B5E20" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#2E5A36', fontWeight: 600 }}>Vị trí dừng</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1B5E20', lineHeight: 1.1 }}>
                      {cellNumber < 10 ? `0${cellNumber}` : cellNumber}/32
                    </div>
                  </div>
                </div>

                {/* Trả lời đúng */}
                <div
                  style={{
                    background: '#FFFDF0',
                    border: '1.5px solid #FDE68A',
                    borderRadius: 14,
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#FEF08A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Lightbulb size={18} color="#854D0E" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#854D0E', fontWeight: 600 }}>Trả lời đúng</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#713F12', lineHeight: 1.1 }}>
                      {correctCount} câu
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {/* Cell Badge: "Ô 02 • Phòng trọ ồn ào" matching Figma */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#FEF08A',
                    border: '1px solid #FCD34D',
                    color: '#1E293B',
                    padding: '3px 14px',
                    borderRadius: 9999,
                    fontWeight: 900,
                    fontSize: '0.92rem'
                  }}
                >
                  Ô {cellNumber < 10 ? `0${cellNumber}` : cellNumber}
                </span>
                <span style={{ color: '#64748B', fontWeight: 800 }}>•</span>
                <span style={{ color: '#1E293B', fontWeight: 800, fontSize: '0.96rem' }}>
                  {cellTitle}
                </span>
              </div>

              {/* Red Box: Incorrect choice */}
              <div
                style={{
                  position: 'relative',
                  background: '#FFF0F0',
                  border: '1.5px solid #FCA5A5',
                  borderRadius: 16,
                  padding: '11px 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <CardAccentLeaf />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#DC2626',
                    fontWeight: 800,
                    fontSize: '0.93rem',
                    marginBottom: 4
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#DC2626',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      flexShrink: 0
                    }}
                  >
                    ✕
                  </div>
                  <span>Bạn chọn {selectedKey} • Chưa chính xác</span>
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#374151',
                    lineHeight: 1.42,
                    paddingLeft: 34
                  }}
                >
                  {userOptionObj?.text || 'Giữ nguyên chỗ học, chỉ tăng thời gian ngồi vào bàn.'}
                </div>
              </div>

              {/* Green Box: Correct answer */}
              <div
                style={{
                  position: 'relative',
                  background: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                  borderRadius: 16,
                  padding: '11px 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <CardAccentLeaf style={{ bottom: 8, top: 'auto', right: 10, transform: 'rotate(90deg)' }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#16A34A',
                    fontWeight: 800,
                    fontSize: '0.93rem',
                    marginBottom: 4
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#16A34A',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      flexShrink: 0
                    }}
                  >
                    ✓
                  </div>
                  <span>Đáp án đúng: {questionData.correctAnswer}</span>
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#374151',
                    lineHeight: 1.42,
                    paddingLeft: 34
                  }}
                >
                  {correctOptionObj?.text || 'Chuyển giờ tự học sang thư viện và sắp xếp lịch phù hợp.'}
                </div>
              </div>

              {/* Yellow Box: Philosophical Insight */}
              <div
                style={{
                  position: 'relative',
                  background: '#FFFDF0',
                  border: '1.5px solid #FDE047',
                  borderRadius: 16,
                  padding: '11px 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                <CardAccentLeaf />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#854D0E',
                    fontWeight: 800,
                    fontSize: '0.93rem',
                    marginBottom: 4
                  }}
                >
                  <Lightbulb size={20} color="#CA8A04" style={{ flexShrink: 0 }} />
                  <span>{questionData.topic || 'Vật chất và ý thức'}</span>
                </div>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#374151',
                    lineHeight: 1.42,
                    paddingLeft: 30
                  }}
                >
                  {questionData.explanation ||
                    'Không gian học ảnh hưởng đến sự tập trung. Chủ động học ở thư viện là hành động cải thiện điều kiện học tập.'}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              BOTTOM ACTION BUTTONS: [↺ Chơi lại]  [⌂ Về Camind]  [⤓ Lưu kết quả]
              ================================================================ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
              marginBottom: 12
            }}
          >
            {/* Chơi lại (Forest Green Button) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onRestart}
              style={{
                background: '#166534',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 9999,
                padding: '9px 26px',
                fontWeight: 800,
                fontSize: '0.94rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(22, 101, 52, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              <RotateCcw size={18} strokeWidth={2.5} />
              <span>Chơi lại</span>
            </motion.button>

            {/* Về Camind (White with Green Border Button) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExitToHome}
              style={{
                background: '#FFFFFF',
                border: '2px solid #166534',
                color: '#166534',
                borderRadius: 9999,
                padding: '7px 24px',
                fontWeight: 800,
                fontSize: '0.94rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.15s ease'
              }}
            >
              <Home size={18} strokeWidth={2.5} />
              <span>Về Camind</span>
            </motion.button>

            {/* Lưu kết quả (Golden Amber Button) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSaveResult}
              style={{
                background: '#FBBF24',
                border: '2px solid #D97706',
                color: '#1F2937',
                borderRadius: 9999,
                padding: '7px 24px',
                fontWeight: 800,
                fontSize: '0.94rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.28)',
                transition: 'all 0.15s ease'
              }}
            >
              <Download size={18} strokeWidth={2.5} />
              <span>Lưu kết quả</span>
            </motion.button>
          </div>

          {/* Bottom Footer Motto Ribbon */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                background: '#EDF7ED',
                border: '1.5px solid #A7D7B0',
                borderRadius: 9999,
                padding: '3px 20px',
                fontSize: '0.78rem',
                color: '#2E5A36',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>🌿</span>
              <span>Mỗi bước • Mỗi khám phá • Một phiên bản tốt hơn ♡</span>
              <span>🌿</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
