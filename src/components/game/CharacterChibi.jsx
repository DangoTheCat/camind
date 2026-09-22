import React from 'react'
import { motion } from 'framer-motion'

export default function CharacterChibi({
  x = 9.87,
  y = 25.50,
  isMoving = false,
  isJumping = false,
  direction = 'right',
  scale = 0.42
}) {
  const isFacingLeft = direction === 'left'

  return (
    <motion.div
      className={`character-chibi-container ${isMoving ? 'chibi-walking' : 'chibi-idle'}`}
      initial={false}
      animate={{
        left: `${x}%`,
        top: `${y}%`
      }}
      transition={{
        duration: isMoving ? 0.36 : 0.4,
        ease: 'easeInOut'
      }}
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        zIndex: 40,
        pointerEvents: 'none'
      }}
    >
      {/* Landing hop bounce motion wrapper (only animates Y bounce, NEVER scales or translates X) */}
      <motion.div
        animate={isJumping ? { y: [0, -14, 0] } : { y: 0 }}
        transition={isJumping ? { duration: 0.26, ease: 'easeInOut' } : { duration: 0.2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0
        }}
      >
        {/* Anchor point: (50%, 97%) of 140x252 is pinned precisely to the (x, y) target */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(-50%, -97%)'
          }}
        >
          {/* Scaling & Facing Direction: scales and flips cleanly around the feet */}
          <div
            style={{
              transform: `scale(${scale}) scaleX(${isFacingLeft ? -1 : 1})`,
              transformOrigin: '50% 97%',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.28))'
            }}
          >
            {/* Exact Character Wrapper Structure from HTML */}
            <div className={`character-wrapper ${isMoving ? '' : 'paused'}`}>
              {/* Ground shadow beneath character feet */}
              <div className="ground-shadow" />

              {/* CHẾ ĐỘ 1: SPRITE 8 FRAME FIGMA (HD RETINA 3X, 0% DÍNH VIỀN) */}
              <div
                className="sprite-character"
                style={{
                  animationPlayState: isMoving ? 'running' : 'paused',
                  backgroundPosition: isMoving ? undefined : '0px 0px'
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

