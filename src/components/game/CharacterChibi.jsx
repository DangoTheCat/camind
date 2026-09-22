import React from 'react'
import { motion } from 'framer-motion'

export default function CharacterChibi({
  x = 9.87,
  y = 25.50,
  isMoving = false,
  isJumping = false,
  direction = 'right'
}) {
  const isFacingLeft = direction === 'left'

  return (
    <motion.div
      className="character-chibi-container"
      initial={false}
      animate={{
        left: `${x}%`,
        top: `${y}%`
      }}
      transition={{
        duration: isMoving ? 0.28 : 0.4,
        ease: 'easeInOut'
      }}
      style={{
        position: 'absolute',
        width: '9.2%',
        maxWidth: 154,
        minWidth: 'clamp(28px, 4vw, 64px)',
        aspectRatio: '1 / 1',
        transform: 'translate(-50%, -78%)',
        zIndex: 40,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      {/* Dynamic Student Character with idle & jumping bounce */}
      <motion.div
        animate={
          isJumping
            ? {
                y: [0, -32, 0],
                scale: [1, 1.08, 0.96, 1]
              }
            : {
                y: [0, -7, 0],
                scale: [1, 1.01, 1]
              }
        }
        transition={
          isJumping
            ? {
                duration: 0.28,
                ease: 'easeInOut'
              }
            : {
                repeat: Infinity,
                duration: 1.6,
                ease: 'easeInOut'
              }
        }
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)',
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))'
        }}
      >
        <img
          src="/assets/game/character.png"
          alt="Sinh viên Camind"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            userSelect: 'none',
            WebkitUserDrag: 'none'
          }}
          onError={(e) => {
            // Fallback to jpg if png fails
            e.currentTarget.src = '/assets/game/character.jpg'
          }}
        />
      </motion.div>

      {/* Realistic Shadow beneath character feet */}
      <motion.div
        animate={
          isJumping
            ? {
                scale: [1, 0.55, 1],
                opacity: [0.5, 0.2, 0.5]
              }
            : {
                scale: [1, 0.9, 1],
                opacity: [0.5, 0.38, 0.5]
              }
        }
        transition={
          isJumping
            ? { duration: 0.28, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
        }
        style={{
          width: '55%',
          height: '10%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          marginTop: -6
        }}
      />
    </motion.div>
  )
}
