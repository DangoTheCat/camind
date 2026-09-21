import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FigmaOpenHeader from './FigmaOpenHeader'
import FeedbackModal from './FeedbackModal'

/**
 * Wireframe2Destination
 * 100% Authentic Figma implementation using exported component images:
 * - Stage 0: Initial Quote Centered
 * - Stage 1: Quote shifts Left, 01/02/03 titles appear (Figma Component 11, Frame 9, Component 12)
 * - Stage 2: Scrollbar moves down, explanation cards expand (Component 13, Frame 9 pills)
 * - Stage 3: In-depth insight cards (Component 11/Variant4, Frame 9/Variant2, Component 12/Variant3)
 * - Stage 4: Centered Question Prompt + Navigation Buttons (btn-back, btn-next)
 */
export default function Wireframe2Destination({
  activeTab = 'intro',
  isControllerActive = false,
  onNavClick,
  onControllerClick,
  onLogoClick,
  onReplayOpen
}) {
  const [currentStage, setCurrentStage] = useState(0)
  const [scale, setScale] = useState(1)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const isScrollingRef = useRef(false)

  // Scale 1440x900 stage to fit viewport responsively
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

  // If activeTab changes to 'intro', reset stage to 0
  useEffect(() => {
    if (activeTab === 'intro') {
      setCurrentStage(0)
    }
  }, [activeTab])

  // Wheel scroll listener: advance or rewind stages smoothly
  useEffect(() => {
    const handleWheel = (e) => {
      if (isFeedbackOpen) return
      e.preventDefault()
      if (isScrollingRef.current) return

      const threshold = 20
      if (Math.abs(e.deltaY) < threshold) return

      if (e.deltaY > 0) {
        // Scroll down -> next stage
        setCurrentStage((prev) => {
          if (prev < 4) {
            isScrollingRef.current = true
            setTimeout(() => {
              isScrollingRef.current = false
            }, 600)
            return prev + 1
          }
          return prev
        })
      } else if (e.deltaY < 0) {
        // Scroll up -> prev stage
        setCurrentStage((prev) => {
          if (prev > 0) {
            isScrollingRef.current = true
            setTimeout(() => {
              isScrollingRef.current = false
            }, 600)
            return prev - 1
          }
          return prev
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isFeedbackOpen])

  // Keyboard navigation listener (Arrow keys, Space, PageUp/PageDown)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFeedbackOpen) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        setCurrentStage((prev) => Math.min(4, prev + 1))
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        setCurrentStage((prev) => Math.max(0, prev - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFeedbackOpen])

  // Touch swipe listener for mobile / trackpads
  useEffect(() => {
    let startY = 0
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (!isFeedbackOpen) e.preventDefault()
    }
    const handleTouchEnd = (e) => {
      if (isScrollingRef.current || isFeedbackOpen) return
      const endY = e.changedTouches[0].clientY
      const deltaY = startY - endY
      if (Math.abs(deltaY) > 35) {
        if (deltaY > 0) {
          setCurrentStage((prev) => {
            if (prev < 4) {
              isScrollingRef.current = true
              setTimeout(() => {
                isScrollingRef.current = false
              }, 600)
              return prev + 1
            }
            return prev
          })
        } else {
          setCurrentStage((prev) => {
            if (prev > 0) {
              isScrollingRef.current = true
              setTimeout(() => {
                isScrollingRef.current = false
              }, 600)
              return prev - 1
            }
            return prev
          })
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isFeedbackOpen])

  // Spring transition configs
  const springTransition = { duration: 0.75, ease: [0.16, 1, 0.3, 1] }

  // Scrollbar thumb Y mapping
  const scrollbarTop =
    currentStage === 0
      ? -49
      : currentStage === 1
      ? 255
      : 625

  return (
    <motion.div
      className="wf2-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f1e7',
        overflow: 'hidden',
        zIndex: 50,
        userSelect: 'none'
      }}
    >
      {/* Full viewport background container */}
      <div
        className="wf2-viewport-bg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        {/* Layer 1: Background photo cover (fades in Stage 4) */}
        <motion.div
          animate={{ opacity: currentStage === 4 ? 0 : 1 }}
          transition={springTransition}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/bg_intro.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Layer 2: bg-wash (opacity 0.72, fill #fff8f0, fades in Stage 4) */}
        <motion.div
          animate={{ opacity: currentStage === 4 ? 0 : 0.72 }}
          transition={springTransition}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff8f0',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Layer 3: left-overlay (linear gradient #fff8f0e6 -> #fff8f000) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '50vw',
            minWidth: 700,
            background:
              'linear-gradient(90deg, rgba(255, 248, 240, 0.9) 0%, rgba(255, 248, 240, 0) 100%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Layer 4: vignette (radial gradient) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 246, 237, 0.8) 100%)',
            pointerEvents: 'none',
            zIndex: 4
          }}
        />
      </div>

      {/* Golden Navbar pinned at top across full viewport */}
      <FigmaOpenHeader
        activeTab={activeTab}
        isControllerActive={isControllerActive}
        onNavClick={onNavClick}
        onControllerClick={onControllerClick}
        onLogoClick={onLogoClick || onReplayOpen}
        onFeedbackClick={() => setIsFeedbackOpen(true)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 1440x900 Centered Responsive Stage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div
          className="wf2-fixed-stage"
          style={{
            position: 'relative',
            width: 1440,
            height: 900,
            flexShrink: 0,
            pointerEvents: 'auto',
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* ====================================================
              CORNERS (Top-Left and Bottom-Left brackets)
              ==================================================== */}
          <motion.div
            className="wf2-corner-tl"
            animate={{ opacity: currentStage === 4 ? 0 : 0.7 }}
            transition={springTransition}
            style={{
              position: 'absolute',
              left: 60,
              top: 60,
              width: 40,
              height: 40,
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 40,
                height: 2,
                backgroundColor: 'rgba(215, 180, 156, 0.7)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 2,
                height: 40,
                backgroundColor: 'rgba(215, 180, 156, 0.7)'
              }}
            />
          </motion.div>

          <motion.div
            className="wf2-corner-bl"
            animate={{ opacity: currentStage === 4 ? 0 : 0.7 }}
            transition={springTransition}
            style={{
              position: 'absolute',
              left: 60,
              top: 800,
              width: 40,
              height: 40,
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 2,
                height: 40,
                backgroundColor: 'rgba(215, 180, 156, 0.7)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 38,
                width: 40,
                height: 2,
                backgroundColor: 'rgba(215, 180, 156, 0.7)'
              }}
            />
          </motion.div>

          {/* ====================================================
              SCROLLBAR WIDGET (Node 240:797)
              Moves Y smoothly between stages: -49 -> 255 -> 625 -> fades at stage 4
              ==================================================== */}
          <motion.div
            className="wf2-scrollbar-widget"
            animate={{
              top: scrollbarTop,
              opacity: currentStage === 4 ? 0 : 1
            }}
            transition={springTransition}
            style={{
              position: 'absolute',
              left: 40,
              width: 20,
              height: 324,
              cursor: 'pointer',
              zIndex: 20
            }}
            onClick={() => {
              setCurrentStage((prev) => (prev < 4 ? prev + 1 : 0))
            }}
            title="Cuộn để chuyển trang"
          >
            {/* Track: x: 8.5, y: 0, w: 3, h: 560 */}
            <div
              style={{
                position: 'absolute',
                left: 8.5,
                top: 0,
                width: 3,
                height: 560,
                borderRadius: 2,
                backgroundColor: 'rgba(215, 180, 156, 0.2)'
              }}
            />

            {/* Arrow-up: y: 80 */}
            <div
              style={{
                position: 'absolute',
                left: 5,
                top: 80,
                width: 10,
                height: 8
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 5,
                  width: 6,
                  height: 1.5,
                  borderRadius: 1,
                  transform: 'rotate(45deg)',
                  backgroundColor: 'rgba(142, 111, 93, 0.5)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 5,
                  width: 6,
                  height: 1.5,
                  borderRadius: 1,
                  transform: 'rotate(-45deg)',
                  backgroundColor: 'rgba(142, 111, 93, 0.5)'
                }}
              />
            </div>

            {/* Thumb: x: 5, y: 100, w: 10, h: 120, radius: 5 */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              style={{
                position: 'absolute',
                left: 5,
                top: 100,
                width: 10,
                height: 120,
                borderRadius: 5,
                backgroundColor: 'rgba(142, 111, 93, 0.85)',
                boxShadow: '0 2px 6px rgba(59, 46, 38, 0.25)'
              }}
            >
              {/* Grip lines */}
              <div
                style={{
                  position: 'absolute',
                  left: 2,
                  top: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 1.5,
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 1.5,
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 1.5,
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }}
                />
              </div>
            </motion.div>

            {/* Chevrons >> indicator */}
            <div
              style={{
                position: 'absolute',
                left: -30,
                top: 200,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: 'rgba(115, 89, 64, 0.75)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: -2
              }}
            >
              <span>&gt;&gt;</span>
            </div>

            {/* Arrow-down: y: 232 */}
            <div
              style={{
                position: 'absolute',
                left: 5,
                top: 232,
                width: 10,
                height: 8
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  width: 6,
                  height: 1.5,
                  borderRadius: 1,
                  transform: 'rotate(-45deg)',
                  backgroundColor: 'rgba(142, 111, 93, 0.5)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 2,
                  width: 6,
                  height: 1.5,
                  borderRadius: 1,
                  transform: 'rotate(45deg)',
                  backgroundColor: 'rgba(142, 111, 93, 0.5)'
                }}
              />
            </div>
          </motion.div>

          {/* ====================================================
              DRAG-UP INDICATOR (Stage 2 & 3: x: 60, y: 781)
              ==================================================== */}
          <motion.div
            animate={{
              opacity: currentStage === 2 || currentStage === 3 ? 1 : 0,
              y: currentStage === 2 || currentStage === 3 ? 0 : 15,
              pointerEvents: currentStage === 2 || currentStage === 3 ? 'auto' : 'none'
            }}
            transition={springTransition}
            onClick={() => setCurrentStage((prev) => Math.min(4, prev + 1))}
            style={{
              position: 'absolute',
              left: 60,
              top: 781,
              width: 78,
              height: 64,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 25
            }}
            title="Cuộn tiếp để xem chi tiết"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path
                  d="M1 7L8 1L15 7"
                  stroke="#735940"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ marginTop: 2 }}>
                <path
                  d="M1 7L8 1L15 7"
                  stroke="#735940"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <span
              style={{
                marginTop: 4,
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 11,
                color: '#735940',
                letterSpacing: 1.5,
                textTransform: 'uppercase'
              }}
            >
              Kéo lên
            </span>
          </motion.div>

          {/* ====================================================
              LEFT QUOTE (Exact Figma typography images)
              Shifts smoothly from center (Stage 0) to left (Stages 1-3)
              Fades out at Stage 4
              ==================================================== */}
          <motion.div
            animate={{
              left: currentStage === 0 ? 385 : 80,
              top: currentStage === 0 ? 363 : 360,
              opacity: currentStage === 4 ? 0 : 1
            }}
            transition={springTransition}
            style={{
              position: 'absolute',
              zIndex: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: currentStage === 0 ? 'center' : 'flex-start'
            }}
          >
            {/* 1. kq-label image: KẾT QUẢ HỌC TẬP */}
            <img
              src="/assets/quote_kq_label.png"
              alt="KẾT QUẢ HỌC TẬP"
              style={{
                height: 20,
                width: 'auto',
                display: 'block',
                marginBottom: 8
              }}
            />

            {/* 2. divider rule */}
            <div
              style={{
                width: 48,
                height: 1,
                backgroundColor: 'rgba(215, 180, 156, 0.6)',
                marginBottom: 14
              }}
            />

            {/* 3. paragraph image: Kết quả học tập của sinh viên chịu sự tác động... */}
            <img
              src="/assets/quote_paragraph.png"
              alt="Kết quả học tập của sinh viên chịu sự tác động đan xen giữa điều kiện vật chất thực tế và tính chủ động của mỗi cá nhân"
              style={{
                maxWidth: currentStage === 0 ? 715 : 660,
                height: 'auto',
                display: 'block'
              }}
            />
          </motion.div>

          {/* ====================================================
              RIGHT PANEL (Visible in Stages 1, 2, 3)
              Using EXACT 100% Figma component images
              ==================================================== */}
          <motion.div
            animate={{
              opacity: currentStage >= 1 && currentStage <= 3 ? 1 : 0,
              x: currentStage >= 1 && currentStage <= 3 ? 0 : 50,
              pointerEvents: currentStage >= 1 && currentStage <= 3 ? 'auto' : 'none'
            }}
            transition={springTransition}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: 620,
              height: 900,
              zIndex: 12
            }}
          >
            {/* Right panel warm card background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#fff9f2e6',
                backdropFilter: 'blur(10px)',
                boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.03)'
              }}
            />

            {/* Accent divider line at x: 0 (left edge of right panel = x: 820) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 80,
                width: 2,
                height: 740,
                background:
                  'linear-gradient(180deg, rgba(215, 180, 156, 0) 0%, rgba(215, 180, 156, 0.8) 50%, rgba(215, 180, 156, 0) 100%)'
              }}
            />

            {/* Artwork background image (image 6) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/assets/image_6_I252_1867_240_780.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.12,
                pointerEvents: 'none'
              }}
            />

            {/* ================================================
                ITEM 01: Điều kiện vật chất
                ================================================ */}
            <div style={{ position: 'absolute', left: 48, top: 168, width: 520, height: 160 }}>
              {/* Number 01 (Exported image from Figma Node 144:1277) */}
              <img
                src="/assets/num_01.png"
                alt="01"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 88,
                  height: 60,
                  display: 'block'
                }}
              />

              {/* Cards for Item 01 */}
              <div style={{ position: 'absolute', left: 138, top: 0, width: 359, height: 150 }}>
                {/* Stage 1 & 2 Title: card_dkvc_title_stage1.png */}
                <motion.div
                  animate={{
                    y: currentStage === 2 ? -73 : 3,
                    opacity: currentStage === 1 || currentStage === 2 ? 1 : 0
                  }}
                  transition={springTransition}
                  style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                >
                  <img
                    src="/assets/card_dkvc_title_stage1.png"
                    alt="Điều kiện vật chất"
                    style={{ width: 359, height: 70, display: 'block' }}
                  />
                </motion.div>

                {/* Stage 2 Detail: card_dkvc_detail_stage2.png */}
                <AnimatePresence>
                  {currentStage === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                    >
                      <img
                        src="/assets/card_dkvc_detail_stage2.png"
                        alt="Là tiền sinh hoạt, chỗ ở, laptop, Wifi, sách vở, phòng học, thư viện"
                        style={{ width: 359, height: 70, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stage 3 Insight: card_dkvc_insight_stage3.png */}
                <AnimatePresence>
                  {currentStage === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 3, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                    >
                      <img
                        src="/assets/card_dkvc_insight_stage3.png"
                        alt="Các yếu tố này không trực tiếp quyết định năng lực nhưng tạo ra sự thuận lợi hoặc rào cản thực tế cho việc học"
                        style={{ width: 359, height: 70, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider 1 */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 152,
                  width: 520,
                  height: 1,
                  backgroundColor: 'rgba(215, 180, 156, 0.35)'
                }}
              />
            </div>

            {/* ================================================
                ITEM 02: Môi trường học tập
                ================================================ */}
            <div style={{ position: 'absolute', left: 48, top: 405, width: 520, height: 200 }}>
              {/* Number 02 (Exported image from Figma Node 144:1394) */}
              <img
                src="/assets/num_02.png"
                alt="02"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 88,
                  height: 60,
                  display: 'block'
                }}
              />

              {/* Cards for Item 02 */}
              <div style={{ position: 'absolute', left: 138, top: 0, width: 359, height: 180 }}>
                {/* Stage 1: card_mtht_title_stage1.png */}
                <AnimatePresence>
                  {currentStage === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -40 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 175 }}
                    >
                      <img
                        src="/assets/card_mtht_title_stage1.png"
                        alt="Môi trường học tập"
                        style={{ width: 359, height: 175, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stage 2: card_mtht_pills_stage2.png */}
                <AnimatePresence>
                  {currentStage === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: -36, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 195 }}
                    >
                      <img
                        src="/assets/card_mtht_pills_stage2.png"
                        alt="Gia đình, Công nghệ, Nhà trường, Xã hội"
                        style={{ width: 359, height: 195, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stage 3: card_mtht_detail_stage3.png */}
                <AnimatePresence>
                  {currentStage === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 175 }}
                    >
                      <img
                        src="/assets/card_mtht_detail_stage3.png"
                        alt="Chi tiết các yếu tố môi trường học tập"
                        style={{ width: 359, height: 175, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider 2 */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 174,
                  width: 520,
                  height: 1,
                  backgroundColor: 'rgba(215, 180, 156, 0.35)'
                }}
              />
            </div>

            {/* ================================================
                ITEM 03: Ý thức và thái độ học tập
                ================================================ */}
            <div style={{ position: 'absolute', left: 48, top: 658, width: 520, height: 160 }}>
              {/* Number 03 (Exported image from Figma Node 144:1395) */}
              <img
                src="/assets/num_03.png"
                alt="03"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 88,
                  height: 60,
                  display: 'block'
                }}
              />

              {/* Cards for Item 03 */}
              <div style={{ position: 'absolute', left: 138, top: 0, width: 359, height: 150 }}>
                {/* Stage 1 & 2 Title: card_yctd_title_stage1.png */}
                <motion.div
                  animate={{
                    y: currentStage === 2 ? -70 : 0,
                    opacity: currentStage === 1 || currentStage === 2 ? 1 : 0
                  }}
                  transition={springTransition}
                  style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                >
                  <img
                    src="/assets/card_yctd_title_stage1.png"
                    alt="Ý thức và thái độ học tập"
                    style={{ width: 359, height: 70, display: 'block' }}
                  />
                </motion.div>

                {/* Stage 2 Detail: card_yctd_detail_stage2.png */}
                <AnimatePresence>
                  {currentStage === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                    >
                      <img
                        src="/assets/card_yctd_detail_stage2.png"
                        alt="Hiểu rõ mục đích học tập để tích lũy năng lực thực tế cho tương lai"
                        style={{ width: 359, height: 70, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stage 3 Insight: card_yctd_insight_stage3.png */}
                <AnimatePresence>
                  {currentStage === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={springTransition}
                      style={{ position: 'absolute', left: 0, top: 0, width: 359, height: 70 }}
                    >
                      <img
                        src="/assets/card_yctd_insight_stage3.png"
                        alt="Nhận thức đúng đắn sẽ dẫn đến thái độ chủ động, kiên trì thay vì học đối phó hay phụ thuộc"
                        style={{ width: 359, height: 70, display: 'block' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ====================================================
              STAGE 4 (Node 252:1804): Final Chapter Prompt & Nav Buttons
              Using exact exported Figma assets
              ==================================================== */}
          <AnimatePresence>
            {currentStage === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={springTransition}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 30
                }}
              >
                {/* Top subtitle: Hãy cùng tìm hiểu (Exported image) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    top: 357,
                    left: 564,
                    width: 312,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src="/assets/stage4_subtitle.png"
                    alt="Hãy cùng tìm hiểu"
                    style={{ height: 23, width: 'auto', display: 'block' }}
                  />
                </motion.div>

                {/* Big centered question (Exported image) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 397,
                    left: 373,
                    width: 693,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src="/assets/stage4_question.png"
                    alt="Điều kiện vật chất và môi trường tác động như thế nào đến nhận thức, thái độ và hành vi học tập của sinh viên?"
                    style={{ maxWidth: 693, height: 'auto', display: 'block' }}
                  />
                </motion.div>

                {/* Bottom Navigation Buttons matching Figma Frame 298:3426 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 744,
                    left: 0,
                    width: 1440,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 80px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* btn-back (Quay lại từ đầu - Exported image) */}
                  <motion.div
                    whileHover={{ scale: 1.06, x: -3 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentStage(0)}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                    title="Quay lại từ đầu"
                  >
                    <img
                      src="/assets/btn_back_intro.png"
                      alt="Quay lại từ đầu"
                      style={{ width: 186, height: 56, display: 'block' }}
                    />
                  </motion.div>

                  {/* btn-next (Triết học cơ bản - Exported image) */}
                  <motion.div
                    whileHover={{ scale: 1.06, x: 3, filter: 'brightness(1.08)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (onNavClick) onNavClick('theory')
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                    title="Chuyển sang Triết học cơ bản"
                  >
                    <img
                      src="/assets/btn_next_theory.png"
                      alt="Triết học cơ bản"
                      style={{ width: 186, height: 53, display: 'block' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Stage Indicator dots (bottom center helper for testing & direct navigation) */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 40,
              pointerEvents: 'auto'
            }}
          >
            {[0, 1, 2, 3, 4].map((idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.3 }}
                onClick={() => setCurrentStage(idx)}
                style={{
                  width: currentStage === idx ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  backgroundColor: currentStage === idx ? '#8e6f5d' : 'rgba(142, 111, 93, 0.25)',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                title={`Trang ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
