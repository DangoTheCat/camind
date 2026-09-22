import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Lightbulb, Info, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react'

export default function QuestionModal({
  question,
  cell,
  isOpen = true,
  onAnswer
}) {
  const [selectedKey, setSelectedKey] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset internal state when a new question is loaded or modal state toggles
  useEffect(() => {
    setSelectedKey(null)
    setIsSubmitted(false)
  }, [question?.id, isOpen])

  if (!isOpen || !question) return null

  const isLecturer = question.type === 'lecturer'
  const isCorrect = isSubmitted && selectedKey === question.correctAnswer

  const handleSelectOption = (key) => {
    if (isSubmitted) return
    setSelectedKey(key)
  }

  const handleSubmit = () => {
    if (!selectedKey || isSubmitted) return
    setIsSubmitted(true)
  }

  const handleProceed = () => {
    if (onAnswer) {
      onAnswer(isCorrect, selectedKey)
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
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <motion.div
          className="question-modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 780,
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#FBFDF9',
            borderRadius: 28,
            border: isLecturer ? '3px solid #8B5CF6' : '3px solid #2F7B4E',
            boxShadow: isLecturer
              ? '0 25px 60px rgba(139, 92, 246, 0.25), 0 10px 20px rgba(0,0,0,0.1)'
              : '0 25px 60px rgba(47, 123, 78, 0.25), 0 10px 20px rgba(0,0,0,0.1)',
            padding: '32px 36px',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 16
            }}
          >
            {/* Cell Number Badge */}
            <div
              style={{
                background: isLecturer ? '#EDE9FE' : '#FEF3C7',
                color: isLecturer ? '#6D28D9' : '#92400E',
                border: isLecturer ? '1.5px solid #C4B5FD' : '1.5px solid #FCD34D',
                borderRadius: 20,
                padding: '4px 16px',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>Ô {cell?.id < 10 ? `0${cell.id}` : cell?.id}</span>
            </div>

            {/* Modal Category Label */}
            <div
              style={{
                textTransform: 'uppercase',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                color: isLecturer ? '#7C3AED' : '#2D6A4F',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              {isLecturer ? (
                <>
                  <AlertTriangle size={16} />
                  <span>CÂU HỎI KIỂM TRA CỦA GIẢNG VIÊN</span>
                </>
              ) : (
                <>
                  <BookOpen size={16} />
                  <span>CÂU HỎI TÌNH HUỐNG HỌC TẬP</span>
                </>
              )}
            </div>
          </div>

          {/* Question Title */}
          <h2
            style={{
              margin: '0 0 12px 0',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#132A13',
              lineHeight: 1.3
            }}
          >
            {question.title}
          </h2>

          {/* Question Situation Body */}
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#2D3748',
              margin: '0 0 8px 0',
              whiteSpace: 'pre-line'
            }}
          >
            {question.question}
          </p>

          <p
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#6B7280',
              margin: '0 0 20px 0'
            }}
          >
            Chọn một cách giải quyết phù hợp nhất:
          </p>

          {/* 4 Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {question.options.map((opt) => {
              const isSelected = selectedKey === opt.key
              const isTargetCorrect = opt.key === question.correctAnswer

              // Style states
              let borderCol = '#E2E8F0'
              let bgCol = '#FFFFFF'
              let textCol = '#2D3748'
              let badgeBg = '#F3F4F6'
              let badgeText = '#4B5563'

              if (!isSubmitted) {
                if (isSelected) {
                  borderCol = isLecturer ? '#8B5CF6' : '#2F7B4E'
                  bgCol = isLecturer ? '#F5F3FF' : '#F0FDF4'
                  badgeBg = isLecturer ? '#8B5CF6' : '#2F7B4E'
                  badgeText = '#FFFFFF'
                }
              } else {
                if (isTargetCorrect) {
                  borderCol = '#22C55E'
                  bgCol = '#F0FDF4'
                  badgeBg = '#22C55E'
                  badgeText = '#FFFFFF'
                } else if (isSelected && !isTargetCorrect) {
                  borderCol = '#EF4444'
                  bgCol = '#FEF2F2'
                  badgeBg = '#EF4444'
                  badgeText = '#FFFFFF'
                }
              }

              return (
                <motion.div
                  key={opt.key}
                  whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectOption(opt.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 18px',
                    borderRadius: 16,
                    border: `2px solid ${borderCol}`,
                    background: bgCol,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {/* Option Badge (A, B, C, D) */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: badgeBg,
                      color: badgeText,
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.18s ease'
                    }}
                  >
                    {opt.key}
                  </div>

                  {/* Option Text */}
                  <div
                    style={{
                      flex: 1,
                      fontSize: '0.95rem',
                      lineHeight: 1.45,
                      color: textCol,
                      fontWeight: isSelected ? 600 : 400
                    }}
                  >
                    {opt.text}
                  </div>

                  {/* Status Indicator / Radio Circle */}
                  <div style={{ flexShrink: 0 }}>
                    {isSubmitted ? (
                      isTargetCorrect ? (
                        <CheckCircle2 size={22} color="#16A34A" />
                      ) : isSelected ? (
                        <XCircle size={22} color="#DC2626" />
                      ) : null
                    ) : (
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          border: isSelected
                            ? isLecturer
                              ? '6px solid #8B5CF6'
                              : '6px solid #2F7B4E'
                            : '2px solid #CBD5E1',
                          boxSizing: 'border-box',
                          background: '#FFFFFF',
                          transition: 'all 0.15s ease'
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Philosophical Explanation Box (Shown after submission) */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: isCorrect ? '#F0FDF4' : '#FEF3C7',
                  border: isCorrect ? '2px solid #86EFAC' : '2px solid #FCD34D',
                  borderRadius: 18,
                  padding: '16px 20px',
                  marginBottom: 20
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: isCorrect ? '#166534' : '#92400E',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    marginBottom: 6
                  }}
                >
                  <Lightbulb size={20} />
                  <span>Vận dụng – Triết học Mác - Lênin ({question.topic})</span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.92rem',
                    lineHeight: 1.55,
                    color: '#374151'
                  }}
                >
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Footer Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              paddingTop: 12,
              borderTop: '1px solid #E5E7EB'
            }}
          >
            {/* Left rule hint */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.85rem',
                color: '#64748B',
                fontWeight: 500
              }}
            >
              <Info size={16} />
              {isLecturer ? (
                <span>Đúng: tiếp tục • Sai: kết thúc ván chơi ngay</span>
              ) : (
                <span>Đúng: tiếp tục • Sai: mất 1 mạng (❤️) & lùi bước</span>
              )}
            </div>

            {/* Right Action Button */}
            <div>
              {!isSubmitted ? (
                <motion.button
                  type="button"
                  whileHover={selectedKey ? { scale: 1.04 } : {}}
                  whileTap={selectedKey ? { scale: 0.96 } : {}}
                  disabled={!selectedKey}
                  onClick={handleSubmit}
                  style={{
                    background: selectedKey
                      ? isLecturer
                        ? 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
                        : 'linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)'
                      : '#D1D5DB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 24,
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: selectedKey ? 'pointer' : 'not-allowed',
                    boxShadow: selectedKey ? '0 4px 14px rgba(0, 0, 0, 0.18)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span>Xác nhận đáp án</span>
                  <ArrowRight size={18} />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleProceed}
                  style={{
                    background: isCorrect
                      ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)'
                      : 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 24,
                    padding: '10px 26px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span>Tiếp tục</span>
                  <ArrowRight size={18} />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
