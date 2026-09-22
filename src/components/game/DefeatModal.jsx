import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Home, Download, MapPin, Lightbulb, XCircle, CheckCircle2, BookOpen } from 'lucide-react'

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

  const handleSaveResult = () => {
    const text = `💔 Camind MLN111 - Kết Quả Mini-Game\n- Trạng thái: DỪNG BƯỚC\n- Vị trí: Ô ${currentPosition}/32\n- Số câu đúng: ${correctCount} câu\n"Thất bại là mẹ của thành công. Tiếp tục rèn luyện nhé!"`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép kết quả vào bộ nhớ tạm (Clipboard)!')
      })
    } else {
      alert(text)
    }
  }

  const userOptionObj = failedQuestion?.options?.find((o) => o.key === userSelectedOption)
  const correctOptionObj = failedQuestion?.options?.find((o) => o.key === failedQuestion.correctAnswer)

  return (
    <AnimatePresence>
      <div
        className="game-modal-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(35, 10, 15, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <motion.div
          className="defeat-modal-card"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 780,
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#FFFBFB',
            borderRadius: 32,
            border: '3.5px solid #EF4444',
            boxShadow: '0 25px 70px rgba(239, 68, 68, 0.35), 0 10px 30px rgba(0,0,0,0.15)',
            padding: '36px 40px',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Coral Ribbon Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)',
                color: '#FFFFFF',
                padding: '6px 28px',
                borderRadius: 24,
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)'
              }}
            >
              THUA GAME
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{
              margin: '0 0 6px 0',
              fontSize: '2.1rem',
              fontWeight: 900,
              color: '#991B1B',
              letterSpacing: '-0.02em',
              textAlign: 'center'
            }}
          >
            Bạn đã thua!
          </h1>
          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: '1rem',
              color: '#6B7280',
              fontWeight: 500,
              textAlign: 'center'
            }}
          >
            {reason === 'lecturer_failed'
              ? 'Bạn đã trả lời sai câu hỏi kiểm tra của Giảng viên. Đừng nản lòng, hãy ôn lại kiến thức và thử lại!'
              : 'Bạn đã sử dụng hết 3 mạng (❤️❤️❤️). Cùng rút kinh nghiệm và chơi lại nhé!'}
          </p>

          {/* Main Grid: Left (Character + Stats) & Right (Review Insight) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              gap: 24,
              marginBottom: 28,
              alignItems: 'start'
            }}
          >
            {/* Left Column: Character + Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16
              }}
            >
              <div
                style={{
                  width: 170,
                  height: 170,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src="/assets/game/character.png"
                  alt="Thua game"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'grayscale(25%) drop-shadow(0 6px 12px rgba(0,0,0,0.15))'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/game/character.jpg'
                  }}
                />
              </div>

              {/* Mini Stats */}
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                {/* Dừng lại */}
                <div
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    borderRadius: 14,
                    padding: '8px 10px',
                    border: '1.5px solid #E2E8F0',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>Vị trí dừng</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1F2937' }}>
                    {currentPosition < 10 ? `0${currentPosition}` : currentPosition}/32
                  </div>
                </div>

                {/* Đúng */}
                <div
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    borderRadius: 14,
                    padding: '8px 10px',
                    border: '1.5px solid #E2E8F0',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>Trả lời đúng</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1F2937' }}>
                    {correctCount} câu
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Review Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {failedQuestion ? (
                <>
                  {/* Question header badge */}
                  <div
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#991B1B',
                      padding: '6px 14px',
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <span>Ô {failedQuestion.cellNumber < 10 ? `0${failedQuestion.cellNumber}` : failedQuestion.cellNumber}</span>
                    <span>•</span>
                    <span>{failedQuestion.title}</span>
                  </div>

                  {/* Red Box: User's incorrect answer */}
                  <div
                    style={{
                      background: '#FEF2F2',
                      border: '1.5px solid #FCA5A5',
                      borderRadius: 14,
                      padding: '12px 16px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#DC2626',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: 4
                      }}
                    >
                      <XCircle size={18} />
                      <span>Bạn chọn {userSelectedOption} • Chưa chính xác</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.4 }}>
                      {userOptionObj?.text || 'Lựa chọn chưa tối ưu'}
                    </div>
                  </div>

                  {/* Green Box: Correct answer */}
                  <div
                    style={{
                      background: '#F0FDF4',
                      border: '1.5px solid #86EFAC',
                      borderRadius: 14,
                      padding: '12px 16px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#16A34A',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: 4
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>Đáp án đúng: {failedQuestion.correctAnswer}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.4 }}>
                      {correctOptionObj?.text}
                    </div>
                  </div>

                  {/* Yellow Box: Philosophical Insight */}
                  <div
                    style={{
                      background: '#FEF9C3',
                      border: '1.5px solid #FDE047',
                      borderRadius: 14,
                      padding: '12px 16px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#B45309',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: 4
                      }}
                    >
                      <Lightbulb size={18} />
                      <span>{failedQuestion.topic}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.45 }}>
                      {failedQuestion.explanation}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    background: '#FEF9C3',
                    border: '1.5px solid #FDE047',
                    borderRadius: 14,
                    padding: '20px',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#B45309',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: 8
                    }}
                  >
                    <BookOpen size={20} />
                    <span>Bài học kinh nghiệm</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.6 }}>
                    Trong triết học Mác - Lênin, thực tiễn là quá trình không ngừng thử nghiệm, vấp váp và tự điều chỉnh. Hãy bắt đầu lại lượt chơi mới để củng cố các nguyên lý và kiến thức!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Chơi lại, Về Camind, Lưu kết quả */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap'
            }}
          >
            {/* Chơi lại */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onRestart}
              style={{
                background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 24,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 6px 16px rgba(22, 163, 74, 0.35)'
              }}
            >
              <RotateCcw size={18} />
              <span>Thử lại từ đầu</span>
            </motion.button>

            {/* Về trang chủ Camind */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExitToHome}
              style={{
                background: '#FFFFFF',
                color: '#1F2937',
                border: '2px solid #CBD5E1',
                borderRadius: 24,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
              }}
            >
              <Home size={18} />
              <span>Về trang chủ Camind</span>
            </motion.button>

            {/* Lưu kết quả */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSaveResult}
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 24,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 6px 16px rgba(245, 158, 11, 0.35)'
              }}
            >
              <Download size={18} />
              <span>Lưu kết quả</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
