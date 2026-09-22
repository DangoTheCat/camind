import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CharacterChibi from './CharacterChibi'
import DiceComponent from './DiceComponent'
import { BOARD_CELLS } from './gameData'

export default function GameBoard({
  currentCellId = 1,
  characterPos = { x: 9.87, y: 25.50 },
  isMoving = false,
  isJumping = false,
  facingDirection = 'right',
  diceValue = 1,
  isRolling = false,
  canRoll = true,
  onRollDice,
  dicePrompt = 'Gieo xúc xắc',
  toastMessage = null,
  onCellClick
}) {
  const currentCell = BOARD_CELLS.find((c) => c.id === currentCellId) || BOARD_CELLS[0]

  return (
    <div
      className="game-board-outer"
      style={{
        width: '100%',
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* 1672x941 Responsive Board Container */}
      <div
        className="game-board-responsive-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1672 / 941',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 40, 20, 0.22), 0 4px 12px rgba(0,0,0,0.1)',
          border: '4px solid #FFFFFF',
          background: '#CDE5BC'
        }}
      >
        {/* Background Map (1672 x 941) */}
        <img
          src="/assets/game/map.jpg"
          alt="Bản đồ trò chơi Camind"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            display: 'block',
            userSelect: 'none',
            WebkitUserDrag: 'none'
          }}
        />

        {/* 32 Interactive Cell Targets & Tooltips */}
        {BOARD_CELLS.map((cell) => {
          const isCurrent = cell.id === currentCellId
          return (
            <div
              key={cell.id}
              onClick={() => onCellClick && onCellClick(cell)}
              title={`Ô ${cell.id}: ${cell.title}`}
              style={{
                position: 'absolute',
                left: `${cell.x}%`,
                top: `${cell.y}%`,
                width: '7.5%',
                height: '12%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 20,
                borderRadius: 16
              }}
            >
              {/* Glowing Pulse Halo on Active Cell */}
              {isCurrent && (
                <motion.div
                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.75, 0.2, 0.75]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: 24,
                    border: '3px solid #F59E0B',
                    boxShadow: '0 0 16px rgba(245, 158, 11, 0.7), inset 0 0 10px rgba(245, 158, 11, 0.4)',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Dynamic Chibi Character */}
        <CharacterChibi
          x={characterPos.x}
          y={characterPos.y}
          isMoving={isMoving}
          isJumping={isJumping}
          direction={facingDirection}
        />

        {/* Center Interactive Dice */}
        <DiceComponent
          currentValue={diceValue}
          isRolling={isRolling}
          disabled={!canRoll}
          onRoll={onRollDice}
          promptText={dicePrompt}
        />

        {/* Floating Game Toast Notification Banner */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 60,
                background: 'rgba(23, 42, 28, 0.92)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                padding: '10px 24px',
                borderRadius: 30,
                border: '2px solid rgba(134, 239, 172, 0.6)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                pointerEvents: 'none',
                maxWidth: '85%',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{toastMessage.icon || '✨'}</span>
              <span>{toastMessage.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
