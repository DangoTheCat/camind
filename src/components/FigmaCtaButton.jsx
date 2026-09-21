import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Figma Component: cta-button (Component Set 373:1347)
 * Variants:
 * - State=Default (Node 373:1339):
 *   - Background: #ffd900
 *   - Text: #0a0a0a ("View References & Sources", Kantumruy 18px Bold)
 *   - Arrow: #0a0a0a (Vector 10.5x10.5 inside 18x18 container)
 *   - Radius: 26px
 *   - Padding: 14px 32px
 *   - Gap: 12px
 *
 * - State=Hover (Node 373:1343):
 *   - Background: #000000
 *   - Text: #ffffff
 *   - Arrow: #ffffff
 *   - Transition: 0.2s ease-in-out dissolve
 *   - Shadow: 0 6px 20px rgba(0, 0, 0, 0.25)
 */
export default function FigmaCtaButton({
  onClick,
  text = 'View References & Sources',
  className = '',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.96 }}
      animate={{
        backgroundColor: isHovered ? '#000000' : '#ffd900',
        boxShadow: isHovered
          ? '0 6px 20px rgba(0, 0, 0, 0.35)'
          : '0 4px 16px rgba(255, 217, 0, 0.45)'
      }}
      transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
      className={className}
      style={{
        borderRadius: 26,
        padding: '14px 32px',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        outline: 'none',
        textDecoration: 'none',
        userSelect: 'none',
        ...style
      }}
    >
      <motion.span
        animate={{ color: isHovered ? '#ffffff' : '#0a0a0a' }}
        transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
        style={{
          fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap'
        }}
      >
        {text}
      </motion.span>

      {/* Exact Figma Vector Arrow (Node 373:1342 / 373:1346) */}
      <motion.div
        style={{
          width: 18,
          height: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
            stroke={isHovered ? '#ffffff' : '#0a0a0a'}
            strokeWidth="2.05"
            strokeLinecap="round"
            strokeLinejoin="round"
            transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
          />
        </svg>
      </motion.div>
    </motion.button>
  )
}
