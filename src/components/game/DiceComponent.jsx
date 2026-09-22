import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DICE_POSITION } from './gameData'

// Render pips for a standard die face (1-6)
function DieFace({ value }) {
  const dotStyle = {
    width: 'clamp(6px, 0.75vw, 10px)',
    height: 'clamp(6px, 0.75vw, 10px)',
    borderRadius: '50%',
    background: '#1F2937',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
  }

  // 3x3 grid coordinates for dice pips
  // Indices: 0:tl, 1:tc, 2:tr, 3:ml, 4:mc, 5:mr, 6:bl, 7:bc, 8:br
  const facePips = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  }

  const activePips = facePips[value] || [4]

  return (
    <div
      style={{
        width: 'clamp(36px, 4.2vw, 58px)',
        height: 'clamp(36px, 4.2vw, 58px)',
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F3F4F6 60%, #E5E7EB 100%)',
        borderRadius: 'clamp(8px, 1vw, 14px)',
        boxShadow:
          '0 8px 16px rgba(0,0,0,0.18), inset 0 2px 3px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.15)',
        border: '1.5px solid #E2E8F0',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        padding: 'clamp(4px, 0.6vw, 8px)',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyItems: 'center'
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {activePips.includes(idx) && (
            <motion.div
              layout
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={dotStyle}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function DiceComponent({
  currentValue = 1,
  isRolling = false,
  disabled = false,
  onRoll,
  promptText = 'Gieo xúc xắc'
}) {
  const [displayValue, setDisplayValue] = useState(currentValue)

  // Rapidly shuffle numbers while rolling
  useEffect(() => {
    let interval = null
    if (isRolling) {
      interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1)
      }, 75)
    } else {
      setDisplayValue(currentValue)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRolling, currentValue])

  const handleClick = () => {
    if (disabled || isRolling) return
    if (onRoll) {
      onRoll()
    }
  }

  return (
    <div
      className="interactive-dice-wrapper"
      style={{
        position: 'absolute',
        left: `${DICE_POSITION.x}%`,
        top: `${DICE_POSITION.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6
      }}
    >
      {/* 3D Interactive Die */}
      <motion.div
        whileHover={!disabled && !isRolling ? { scale: 1.12, y: -4 } : {}}
        whileTap={!disabled && !isRolling ? { scale: 0.94 } : {}}
        onClick={handleClick}
        animate={
          isRolling
            ? {
                rotate: [0, -90, 180, -270, 360],
                y: [0, -28, 6, -18, 0],
                scale: [1, 1.15, 0.92, 1.08, 1]
              }
            : {
                y: [0, -3, 0]
              }
        }
        transition={
          isRolling
            ? {
                duration: 0.7,
                ease: 'easeInOut'
              }
            : {
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut'
              }
        }
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          filter: disabled
            ? 'grayscale(30%) opacity(0.8)'
            : 'drop-shadow(0 8px 16px rgba(0, 75, 45, 0.28))'
        }}
        title={disabled ? 'Chờ hoàn thành lượt hiện tại' : 'Click để gieo xúc xắc'}
      >
        <DieFace value={displayValue} />
      </motion.div>

      {/* Ribbon/Pill Button matching map-with-dice.jpg "Gieo xúc xắc" */}
      <motion.button
        type="button"
        whileHover={!disabled && !isRolling ? { scale: 1.06 } : {}}
        whileTap={!disabled && !isRolling ? { scale: 0.95 } : {}}
        onClick={handleClick}
        disabled={disabled || isRolling}
        style={{
          background: disabled
            ? 'linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)'
            : 'linear-gradient(180deg, #2E8B57 0%, #1E6B3E 100%)',
          color: '#FFFFFF',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          borderRadius: 20,
          padding: 'clamp(3px, 0.4vw, 5px) clamp(8px, 1.1vw, 16px)',
          fontSize: 'clamp(0.72rem, 0.95vw, 0.85rem)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {isRolling ? 'Đang gieo...' : promptText}
      </motion.button>
    </div>
  )
}
