import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DICE_POSITION } from './gameData'

/* ==========================================================================
   MATTE 3D DICE - CHAOTIC ROLL & FIXED LANDING
   - Soft matte white finish, exact image match
   - Stays centered (no X/Y drift)
   - Wild, aggressive, chaotic tumbling during the roll phase
   - Crisp button styling
   ========================================================================== */

class DiceSoundSynth {
  constructor() {
    this.ctx = null
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
  }
  playRattle() {
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(300 + Math.random() * 200, now) // More chaotic pitch
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.05)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.05)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.05)
    } catch {}
  }
  playLand() {
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2)
      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
      
      const snap = this.ctx.createOscillator()
      const snapGain = this.ctx.createGain()
      snap.type = 'square'
      snap.frequency.setValueAtTime(400, now)
      snap.frequency.exponentialRampToValueAtTime(100, now + 0.08)
      snapGain.gain.setValueAtTime(0.1, now)
      snapGain.gain.exponentialRampToValueAtTime(0.005, now + 0.08)
      snap.connect(snapGain)
      snapGain.connect(this.ctx.destination)
      snap.start(now)
      snap.stop(now + 0.08)
    } catch {}
  }
}
const soundSynth = new DiceSoundSynth()

/* ==========================================================================
   TRUE 3D MATH & CONFIGURATIONS
   ========================================================================== */

const DICE_SIZE = 64 
const HALF_SIZE = DICE_SIZE / 2

const FACES = [
  { id: 1, rot: `rotateY(0deg) translateZ(${HALF_SIZE}px)`, value: 1 },    
  { id: 6, rot: `rotateY(180deg) translateZ(${HALF_SIZE}px)`, value: 6 },  
  { id: 3, rot: `rotateY(90deg) translateZ(${HALF_SIZE}px)`, value: 3 },   
  { id: 4, rot: `rotateY(-90deg) translateZ(${HALF_SIZE}px)`, value: 4 },  
  { id: 2, rot: `rotateX(90deg) translateZ(${HALF_SIZE}px)`, value: 2 },   
  { id: 5, rot: `rotateX(-90deg) translateZ(${HALF_SIZE}px)`, value: 5 }   
]

const getRestingRotation = (val) => {
  switch (val) {
    case 1: return { x: 90,  y: 0, z: 0 }
    case 2: return { x: 0,   y: 0, z: 0 }
    case 3: return { x: 0,   y: 0, z: -90 }
    case 4: return { x: 0,   y: 0, z: 90 }
    case 5: return { x: 180, y: 0, z: 0 }
    case 6: return { x: -90, y: 0, z: 0 }
    default: return { x: 0, y: 0, z: 0 }
  }
}

function snapTo(current, targetVal) {
  const remainder = ((current % 360) + 360) % 360
  const diff = targetVal - remainder
  return current + diff + 720 // dramatic landing spin
}

/* ==========================================================================
   MATTE PIP & FACE RENDERING
   ========================================================================== */

const Pip = () => (
  <div style={{
    width: '13px', height: '13px',
    borderRadius: '50%',
    background: '#044c4b', 
    boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.8)',
  }} />
)

const FaceContent = ({ value }) => {
  const gridStyle = {
    display: 'grid',
    width: '100%', height: '100%',
    padding: '10px', boxSizing: 'border-box'
  }

  if (value === 1) return <div style={{ ...gridStyle, placeItems: 'center' }}><Pip /></div>
  if (value === 2) return (
    <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
      <div style={{ alignSelf: 'start', justifySelf: 'start' }}><Pip /></div>
      <div style={{ alignSelf: 'end', justifySelf: 'end' }}><Pip /></div>
    </div>
  )
  if (value === 3) return (
    <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
      <div style={{ alignSelf: 'start', justifySelf: 'start' }}><Pip /></div>
      <div style={{ gridColumn: 2, gridRow: 2, alignSelf: 'center', justifySelf: 'center' }}><Pip /></div>
      <div style={{ gridColumn: 3, gridRow: 3, alignSelf: 'end', justifySelf: 'end' }}><Pip /></div>
    </div>
  )
  if (value === 4) return (
    <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', justifyContent: 'space-between', alignContent: 'space-between' }}>
      <div><Pip /></div><div style={{ justifySelf: 'end' }}><Pip /></div>
      <div style={{ alignSelf: 'end' }}><Pip /></div><div style={{ alignSelf: 'end', justifySelf: 'end' }}><Pip /></div>
    </div>
  )
  if (value === 5) return (
    <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr' }}>
      <div><Pip /></div>
      <div style={{ gridColumn: 3, justifySelf: 'end' }}><Pip /></div>
      <div style={{ gridColumn: 2, gridRow: 2, alignSelf: 'center', justifySelf: 'center' }}><Pip /></div>
      <div style={{ gridRow: 3, alignSelf: 'end' }}><Pip /></div>
      <div style={{ gridColumn: 3, gridRow: 3, alignSelf: 'end', justifySelf: 'end' }}><Pip /></div>
    </div>
  )
  if (value === 6) return (
    <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', justifyItems: 'center', alignItems: 'center' }}>
      <Pip /><Pip />
      <Pip /><Pip />
      <Pip /><Pip />
    </div>
  )
  return null
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function DiceComponent({
  currentValue = 1,
  value,
  isRolling = false,
  disabled = false,
  onRoll,
  promptText = 'Gieo xúc xắc',
  soundEnabled = true
}) {
  const actualValue = value !== undefined ? value : currentValue
  const safeValue = Math.min(Math.max(Math.round(actualValue) || 1, 1), 6)

  const [isLanding, setIsLanding] = useState(false)
  const [animState, setAnimState] = useState({ x: 0, y: 0, z: 0 })
  
  const rotRef = useRef({ x: 0, y: 0, z: 0 })
  const prevRollingRef = useRef(isRolling)
  const soundIntervalRef = useRef(null)
  const chaosIntervalRef = useRef(null)

  useEffect(() => {
    let landingTimer = null

    if (isRolling) {
      setIsLanding(false)
      
      // Kickoff wild spin
      rotRef.current = {
        x: rotRef.current.x + 720 + Math.random() * 720,
        y: rotRef.current.y + 720 + Math.random() * 720,
        z: rotRef.current.z + 720 + Math.random() * 720
      }
      setAnimState({ ...rotRef.current })

      // Generate extreme chaotic swings every 250ms
      chaosIntervalRef.current = setInterval(() => {
        // Randomly swing forwards or backwards in huge degrees
        rotRef.current = {
          x: rotRef.current.x + (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720),
          y: rotRef.current.y + (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720),
          z: rotRef.current.z + (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720)
        }
        setAnimState({ ...rotRef.current })
      }, 250)

      if (soundEnabled) {
        soundSynth.playRattle()
        soundIntervalRef.current = setInterval(() => soundSynth.playRattle(), 90)
      }
    } else if (prevRollingRef.current && !isRolling) {
      if (chaosIntervalRef.current) {
        clearInterval(chaosIntervalRef.current)
        chaosIntervalRef.current = null
      }

      const target = getRestingRotation(safeValue)
      rotRef.current = {
        x: snapTo(rotRef.current.x, target.x),
        y: snapTo(rotRef.current.y, target.y),
        z: snapTo(rotRef.current.z, target.z)
      }
      setAnimState({ ...rotRef.current })
      setIsLanding(true)

      if (soundEnabled) soundSynth.playLand()
      landingTimer = setTimeout(() => setIsLanding(false), 700)
      if (soundIntervalRef.current) {
        clearInterval(soundIntervalRef.current)
        soundIntervalRef.current = null
      }
    }

    prevRollingRef.current = isRolling

    return () => {
      if (landingTimer) clearTimeout(landingTimer)
      if (soundIntervalRef.current) clearInterval(soundIntervalRef.current)
      if (chaosIntervalRef.current) clearInterval(chaosIntervalRef.current)
    }
  }, [isRolling, safeValue, soundEnabled])

  const handleClick = () => {
    if (disabled || isRolling) return
    if (onRoll) onRoll()
  }

  return (
    <>
      {/* 3D Dice at Lawn Center */}
      <div
        className="interactive-dice-wrapper"
        style={{
          position: 'absolute',
          left: `${DICE_POSITION.x}%`,
          top: `${DICE_POSITION.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 35,
          userSelect: 'none'
        }}
      >
        <div 
          style={{
            perspective: '1000px',
            width: 110, height: 110,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%', height: '100%',
              transformStyle: 'preserve-3d',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
            animate={{
              rotateX: -35.26, 
              rotateY: 45,     
              // Scaled bounce height
              y: isRolling ? -90 : isLanding ? [0, -45, 8, -3, 0] : [0, -3, 0]
            }}
            transition={{
              y: isRolling ? { duration: 0.35, repeat: Infinity, repeatType: 'reverse', ease: 'easeOut' }
                 : isLanding ? { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } 
                 : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            {/* Ground Shadow */}
            <motion.div
              style={{
                position: 'absolute',
                width: 90, height: 90,
                background: 'radial-gradient(circle, rgba(100, 116, 139, 0.35) 0%, rgba(100, 116, 139, 0.1) 40%, transparent 70%)',
                transform: 'rotateX(90deg) translateZ(-40px)',
                borderRadius: '50%'
              }}
              animate={{
                scale: isRolling ? 0.4 : isLanding ? [1, 0.5, 1.1, 1] : [1, 0.95, 1],
                opacity: isRolling ? 0.2 : isLanding ? [1, 0.3, 0.9, 1] : [1, 0.8, 1]
              }}
              transition={{
                scale: isRolling ? { duration: 0.35, repeat: Infinity, repeatType: 'reverse' } : isLanding ? { duration: 0.65 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                opacity: isRolling ? { duration: 0.35, repeat: Infinity, repeatType: 'reverse' } : isLanding ? { duration: 0.65 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            <motion.div
              style={{
                width: DICE_SIZE, height: DICE_SIZE,
                position: 'relative',
                transformStyle: 'preserve-3d',
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
              onClick={handleClick}
              whileHover={!disabled && !isRolling ? { scale: 1.08 } : {}}
              whileTap={!disabled && !isRolling ? { scale: 0.9 } : {}}
              animate={{
                rotateX: animState.x,
                rotateY: animState.y,
                rotateZ: animState.z,
              }}
              transition={{
                duration: isRolling ? 0.28 : 1.2,
                ease: isRolling ? 'linear' : [0.2, 0.9, 0.3, 1]
              }}
            >
              <div style={{
                position: 'absolute', width: DICE_SIZE - 4, height: DICE_SIZE - 4,
                top: 2, left: 2,
                transformStyle: 'preserve-3d'
              }}>
                {FACES.map(f => (
                  <div key={`core-${f.id}`} style={{
                    position: 'absolute', width: '100%', height: '100%',
                    background: '#e2e8f0', 
                    borderRadius: '10px',
                    transform: f.rot.replace(`${HALF_SIZE}px`, `${HALF_SIZE - 2}px`)
                  }} />
                ))}
              </div>

              {FACES.map(f => (
                <div key={f.id} style={{
                  position: 'absolute',
                  width: DICE_SIZE, height: DICE_SIZE,
                  background: '#f8fafc',
                  borderRadius: '16px', 
                  boxShadow: 'inset 0 0 16px rgba(148, 163, 184, 0.15), inset 2px 2px 6px rgba(255,255,255,1), inset -3px -3px 10px rgba(148, 163, 184, 0.3)',
                  transform: f.rot,
                  backfaceVisibility: 'hidden'
                }}>
                  <FaceContent value={f.value} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating Result Badge */}
          <AnimatePresence>
            {!isRolling && isLanding && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0, y: 10 }}
                animate={{ scale: 1.05, opacity: 1, y: -42 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: 'absolute',
                  background: '#ffffff',
                  color: '#044c4b',
                  border: '2.5px solid #044c4b',
                  borderRadius: 20,
                  padding: '4px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 6px 14px rgba(4, 76, 75, 0.2)',
                  pointerEvents: 'none',
                  zIndex: 45,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                <span style={{ fontSize: '1.1em' }}>✨</span>
                <span>{safeValue} BƯỚC</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Repositioned Roll Button on the right-side pathway */}
      <div
        className="interactive-dice-button-wrapper"
        style={{
          position: 'absolute',
          left: '65.5%',
          top: '54.5%',
          transform: 'translate(-50%, -50%)',
          zIndex: 36,
          userSelect: 'none'
        }}
      >
        <motion.button
          type="button"
          whileHover={!disabled && !isRolling ? { scale: 1.05, y: -2 } : {}}
          whileTap={!disabled && !isRolling ? { scale: 0.95 } : {}}
          onClick={handleClick}
          disabled={disabled || isRolling}
          style={{
            background: disabled ? '#E5E7EB' : '#ffffff',
            color: disabled ? '#9CA3AF' : '#044c4b',
            border: '3px solid',
            borderColor: disabled ? '#D1D5DB' : '#044c4b',
            borderRadius: 9999,
            padding: 'clamp(6px, 0.7vw, 9px) clamp(18px, 2vw, 26px)',
            fontFamily: '"Nunito", "Quicksand", "Montserrat", "Segoe UI", sans-serif',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontWeight: 900,
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : '0 4px 12px rgba(4, 76, 75, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ fontSize: '1.25em' }}>{isRolling ? '🌀' : '🎲'}</span>
          <span style={{ paddingTop: '2px', letterSpacing: '0.02em' }}>{isRolling ? 'Đang gieo...' : promptText}</span>
        </motion.button>
      </div>
    </>
  )
}
