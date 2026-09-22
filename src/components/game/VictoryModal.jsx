import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { RotateCcw, Home, Download, MapPin, Lightbulb, Award } from 'lucide-react'

export default function VictoryModal({
  isOpen = true,
  finalPosition = 32,
  correctCount = 0,
  totalQuestionsAnswered = 0,
  onRestart,
  onExitToHome
}) {
  useEffect(() => {
    if (!isOpen) return

    // Trigger celebratory confetti fireworks
    const duration = 3.5 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 }
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 }
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [isOpen])

  if (!isOpen) return null

  const handleSaveResult = () => {
    const text = `🎓 Camind MLN111 - Kết Quả Mini-Game\nChúc mừng bạn đã TỐT NGHIỆP THÀNH CÔNG!\n- Vị trí về đích: Ô ${finalPosition}/32\n- Số câu trả lời đúng: ${correctCount} câu\n"Mỗi lựa chọn là một bước trưởng thành."`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép kết quả tốt nghiệp vào bộ nhớ tạm (Clipboard)!')
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
          background: 'rgba(10, 30, 15, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <motion.div
          className="victory-modal-card"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 760,
            background: '#FDFBF7',
            borderRadius: 32,
            border: '3.5px solid #2F7B4E',
            boxShadow: '0 25px 70px rgba(47, 123, 78, 0.35), 0 10px 30px rgba(0,0,0,0.15)',
            padding: '40px 44px',
            boxSizing: 'border-box',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Top Yellow Ribbon Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)',
                color: '#78350F',
                padding: '6px 28px',
                borderRadius: 24,
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)'
              }}
            >
              🎉 CHÚC MỪNG! 🎉
            </motion.div>
          </div>

          {/* Heading */}
          <h1
            style={{
              margin: '0 0 6px 0',
              fontSize: '2.2rem',
              fontWeight: 900,
              color: '#143621',
              letterSpacing: '-0.02em'
            }}
          >
            Tốt nghiệp thành công!
          </h1>
          <p
            style={{
              margin: '0 0 28px 0',
              fontSize: '1.05rem',
              color: '#4B5563',
              fontWeight: 500
            }}
          >
            Bạn đã hoàn thành xuất sắc hành trình học tập Camind môn MLN111.
          </p>

          {/* Center Content: Chibi character & Stats */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: 28,
              marginBottom: 32,
              flexWrap: 'wrap'
            }}
          >
            {/* Left Chibi Illustration with Graduation Cap & Aura */}
            <div
              style={{
                position: 'relative',
                width: 220,
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Golden Sunburst Aura */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(254, 240, 138, 0.6) 0%, rgba(254, 240, 138, 0) 70%)'
                }}
              />
              <motion.img
                src="/assets/game/character.png"
                alt="Tốt nghiệp"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))'
                }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/game/character.jpg'
                }}
              />
              {/* Graduation Cap Badge overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  background: '#1F2937',
                  color: '#FBBF24',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  border: '2px solid #F59E0B'
                }}
              >
                <Award size={24} />
              </div>
            </div>

            {/* Right Stats Cards */}
            <div
              style={{
                flex: 1,
                minWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                textAlign: 'left'
              }}
            >
              {/* Stat 1: Position */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  padding: '14px 20px',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: '#DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#15803D'
                  }}
                >
                  <MapPin size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>Vị trí kết thúc</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#143621' }}>
                    {finalPosition}/32
                  </div>
                </div>
              </div>

              {/* Stat 2: Correct Questions */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  padding: '14px 20px',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: '#FEF9C3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B45309'
                  }}
                >
                  <Lightbulb size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>Câu trả lời đúng</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#143621' }}>
                    {correctCount} câu
                  </div>
                </div>
              </div>

              {/* Philosophical Motto */}
              <div
                style={{
                  fontStyle: 'italic',
                  fontSize: '0.92rem',
                  color: '#4B5563',
                  padding: '8px 12px',
                  background: '#F3F4F6',
                  borderRadius: 12,
                  textAlign: 'center'
                }}
              >
                🌿 "Mỗi lựa chọn là một bước trưởng thành."
              </div>
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
              <span>Chơi lại</span>
            </motion.button>

            {/* Về Camind */}
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
