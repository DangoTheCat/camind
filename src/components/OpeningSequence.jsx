import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CamindGifCanvas from './CamindGifCanvas'
import FigmaOpenHeader from './FigmaOpenHeader'
import FigmaLetsGoButton from './FigmaLetsGoButton'

export default function OpeningSequence({
  activeTab,
  isControllerActive,
  onNavClick,
  onControllerClick,
  onLogoClick,
  onEnterWebsite
}) {
  // Phase 1: GIF Canvas plays full 280 frames without any cutoff or interruption.
  //          Chữ camind vẽ nét đổi màu rồi co từ lớn về nhỏ ở các frame cuối.
  // Phase 2: Chuyển cảnh kế cuối (Variant 3) trong 2.5s:
  //          - Nền chuyển từ #ffffff sang #000000.
  //          - Canvas mờ dần, logo vector SVG thuần khiết (camind_logo.svg) hiện lên sắc nét 100%, không bị nhòe vỡ hạt.
  // Phase 3: Khung cảnh cuối cùng (Variant 4):
  //          - Logo vector trắng sắc nét tuyệt đối.
  //          - Slogan "Khám phá yếu tố định hình việc học của bạn" fade in.
  //          - Nút "Let's Go" (nằm ngang 1 dòng chuẩn Figma) trượt từ y:649 lên y:609.
  const [phase, setPhase] = useState(1)
  const [isNavigating, setIsNavigating] = useState(false)
  const [scale, setScale] = useState(1)
  const [replayKey, setReplayKey] = useState(0)

  // Scale 1440x900 stage to fit viewport smoothly
  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const s = Math.min(w / 1440, h / 900)
      setScale(s)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Canvas GIF controller callbacks
  const handleGifComplete = () => {
    // Canvas animation reaches frame 280 (Phase 1 complete) -> Switch to Phase 2
    setPhase(2)
    // Sau 2.5s nền đen và logo vector ổn định -> chuyển sang Phase 3 hiện Slogan & Nút Let's go
    setTimeout(() => {
      setPhase(3)
    }, 2500)
  }


  const handleLetsGoClick = () => {
    setIsNavigating(true)
    setTimeout(() => {
      onEnterWebsite()
    }, 800)
  }

  const isDark = phase >= 2

  return (
    <motion.div
      className="figma-open-viewport"
      animate={{
        backgroundColor: isDark ? '#000000' : '#ffffff',
        opacity: isNavigating ? 0 : 1,
        scale: isNavigating ? 1.03 : 1
      }}
      transition={{
        backgroundColor: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8, ease: 'easeInOut' },
        scale: { duration: 0.8, ease: 'easeOut' }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Torn Paper Header Navbar from Figma (Frame 8) spanning 100vw full width */}
      <FigmaOpenHeader
        key={replayKey}
        activeTab={activeTab}
        isControllerActive={isControllerActive}
        onNavClick={onNavClick}
        onControllerClick={onControllerClick}
        onLogoClick={() => {
          if (onLogoClick) onLogoClick()
          setPhase(1)
          setReplayKey(prev => prev + 1)
        }}
      />

      {/* 1440x900 Stage matching Figma coordinates */}
      <div
        className="figma-fixed-stage"
        style={{
          position: 'relative',
          width: 1440,
          height: 900,
          flexShrink: 0,
          overflow: 'hidden',
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >

        {/* Layer 1: Canvas GIF Player
            Figma bounds: { width: 1553, height: 873, x: -57, y: 13 }
            Chạy toàn bộ 280 frame hoạt họa không bị ngắt.
            Trong Phase 2, mờ dần sang 0 khi màn hình chuyển đen.
        */}
        <motion.div
          className="layer-figma-gif"
          style={{
            position: 'absolute',
            left: -57,
            top: 13,
            width: 1553,
            height: 873,
            pointerEvents: 'none',
            zIndex: 10
          }}
          animate={{
            opacity: phase === 1 ? 1 : 0
          }}
          transition={{
            opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <CamindGifCanvas
            key={replayKey}
            onComplete={handleGifComplete}
            isDark={false}
          />
        </motion.div>

        {/* Layer 1.5: Group 3 (Figma Node 110:954 trong Wireframe 1)
            Bao gồm 2 component gốc chuẩn Figma:
            1. Text "Welcome to Camind" (Node 113:1060): gradient vàng #FFC400 -> #D1D500
            2. Component 9 "Wait a moment....." (Node 115:1176 / 115:1179): chữ font Kantumruy Light 24px
            Hiển thị ở góc dưới bên trái (x: 143, y: 713, width: 487, height: 110) trong Phase 1.
        */}
        <motion.div
          className="layer-figma-welcome-group"
          style={{
            position: 'absolute',
            left: 143,
            top: 713,
            width: 487,
            height: 110,
            pointerEvents: 'none',
            zIndex: 15
          }}
          animate={{
            opacity: phase === 1 ? 1 : 0
          }}
          transition={{
            opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* 1. Welcome to Camind vector gradient */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: 474, height: 37 }}>
            <img
              src="/assets/welcome_to_camind.svg"
              alt="Welcome to Camind"
              style={{ width: 474, height: 37, display: 'block' }}
            />
          </div>

          {/* 2. Component 9 (Wait a moment.....) */}
          <div style={{ position: 'absolute', left: 7, top: 67, width: 193, height: 43 }}>
            <img
              src="/assets/wait_a_moment_dots.svg"
              alt="Wait a moment....."
              style={{ width: 193, height: 43, display: 'block' }}
            />
          </div>
        </motion.div>

        {/* Layer 2: Vector SVG Logo trắng sắc nét tuyệt đối (Variant 3 & 4)
            Figma bounds: { width: 907, height: 177.21, x: 260, y: 355.71 }
            Dùng file vector SVG gốc từ Figma, đường cong mượt mà, KHÔNG BỊ NHÒE / VỠ HẠT.
        */}
        <motion.div
          className="layer-figma-logo-white"
          style={{
            position: 'absolute',
            left: 260,
            top: 355.71,
            width: 907,
            height: 177.21,
            pointerEvents: 'none',
            zIndex: 20
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase >= 2 ? 1 : 0
          }}
          transition={{
            opacity: { duration: 2.5, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <img
            src="/assets/camind_logo.svg"
            alt="camind vector logo"
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </motion.div>

        {/* Layer 3: Slogan "Khám phá yếu tố định hình việc học của bạn" (Variant 4)
            Figma bounds: { width: 440, height: 36, x: 741, y: 573 }
            Fade in mượt mà khi phase === 3
        */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              className="layer-figma-slogan"
              style={{
                position: 'absolute',
                left: 741,
                top: 573,
                width: 440,
                height: 36,
                zIndex: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="slogan-inner-text">
                Khám phá yếu tố định hình việc học của bạn
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 4: Component 6 (Let's Go button) (Variant 4)
            Figma bounds:
            Trượt từ y: 649 lên y: 609, fade in từ 0 lên 1.
            Đảm bảo nằm ngang trên 1 dòng duy nhất.
        */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              className="layer-figma-btn-lets-go"
              style={{
                position: 'absolute',
                left: 1021,
                width: 'auto',
                minWidth: 160,
                height: 58,
                zIndex: 40
              }}
              initial={{ opacity: 0, top: 649 }}
              animate={{ opacity: 1, top: 609 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <FigmaLetsGoButton onClick={handleLetsGoClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
