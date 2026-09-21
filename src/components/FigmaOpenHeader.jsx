import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function FigmaOpenHeader({
  onFeedbackClick,
  onNavClick,
  onLogoClick,
  onControllerClick,
  activeTab: controlledActiveTab,
  isControllerActive: controlledControllerActive
}) {
  // Trạng thái tab được chọn: mặc định là null (tất cả chữ đều MÀU TRẮNG).
  // Khi người dùng click vào tab nào thì tab đó mới chuyển sang MÀU ĐEN (kèm gạch chân active).
  const [uncontrolledTab, setUncontrolledTab] = useState(null)
  const selectedTab = controlledActiveTab !== undefined ? controlledActiveTab : uncontrolledTab

  // Trạng thái hover cho từng tab điều hướng ("intro" | "theory" | "history" | "influence" | null)
  // Chỉ cần lia chuột vào là đổi màu, chuột lia ra khỏi là hết đổi màu.
  const [hoveredTab, setHoveredTab] = useState(null)

  // Trạng thái hover cho logo controller (chỉ cần lia chuột vào là đổi màu, chuột rời khỏi thì quay về mặc định như header nav)
  const [isControllerHovered, setIsControllerHovered] = useState(false)

  // Trạng thái transition cho Feedback button từ Figma Component Set 35:454:
  // - Default (35:450): Viên thuốc đen xám, chữ vàng
  // - Hover (35:452): Nền gradient xanh ngọc (#00E2C4 -> #C5DB00), chữ đen
  // - Pressed/Active (35:453): Nền gradient cam (#E27500 -> #FF6A00), viền cam, chữ trắng
  const [isFeedbackHovered, setIsFeedbackHovered] = useState(false)
  const [isFeedbackPressed, setIsFeedbackPressed] = useState(false)

  const handleTabClick = (tabKey) => {
    // Click vào tab: chuyển thành màu đen, nếu bấm lại đúng tab đó thì toggle về null (trắng hết)
    const nextTab = selectedTab === tabKey ? null : tabKey
    if (controlledActiveTab === undefined) {
      setUncontrolledTab(nextTab)
    }
    if (onNavClick) {
      onNavClick(nextTab)
    }
  }

  const handleControllerClick = () => {
    if (onControllerClick) {
      onControllerClick(!isControllerActive)
    }
  }

  const handleLogoClick = () => {
    if (controlledActiveTab === undefined) {
      setUncontrolledTab(null)
    }
    if (onLogoClick) {
      onLogoClick()
    }
  }

  return (
    <motion.header
      className="figma-open-header"
      initial={{ y: -84, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 84,
        zIndex: 9999,
        pointerEvents: 'auto',
        overflow: 'visible'
      }}
    >
      {/* Figma Selection 252:639 Frame 8 Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
          borderBottom: '3px solid #ffffff',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1
        }}
      />

      {/* Interactive foreground content (matching Figma 1342px Frame 3 at x: 50, y: 20) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 80,
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          zIndex: 10
        }}
      >
        {/* Brand logo (Left) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title="Camind Home"
        >
          <img
            src="/assets/camind_logo_navbar.svg"
            alt="Camind"
            style={{ width: 150, height: 30, display: 'block' }}
          />
        </motion.div>

        {/* Navigation links (Center) matching exact Figma Frame 2 with 41px gap */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 41,
            height: 29
          }}
        >
          {/* 1. Giới thiệu */}
          <motion.div
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredTab('intro')}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleTabClick('intro')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="1. Giới thiệu"
          >
            <div style={{
              fontFamily: '"Kantumruy", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              position: 'relative'
            }}>
              Giới thiệu
              {(hoveredTab === 'intro' || selectedTab === 'intro') && (
                <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: '#ffffff' }} />
              )}
            </div>
          </motion.div>

          {/* 2. Triết học cơ bản */}
          <motion.div
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredTab('theory')}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleTabClick('theory')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="2. Triết học cơ bản"
          >
            <div style={{
              fontFamily: '"Kantumruy", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              position: 'relative'
            }}>
              Triết học cơ bản
              {(hoveredTab === 'theory' || selectedTab === 'theory') && (
                <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: '#ffffff' }} />
              )}
            </div>
          </motion.div>

          {/* 3. Điều kiện và môi trường */}
          <motion.div
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredTab('history')}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleTabClick('history')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="3. Điều kiện và môi trường"
          >
            <div style={{
              fontFamily: '"Kantumruy", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              position: 'relative'
            }}>
              Điều kiện và môi trường
              {(hoveredTab === 'history' || selectedTab === 'history') && (
                <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: '#ffffff' }} />
              )}
            </div>
          </motion.div>

          {/* 4. Ảnh hưởng */}
          <motion.div
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredTab('influence')}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => handleTabClick('influence')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="4. Ảnh hưởng"
          >
            <div style={{
              fontFamily: '"Kantumruy", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              position: 'relative'
            }}>
              Ảnh hưởng
              {(hoveredTab === 'influence' || selectedTab === 'influence') && (
                <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: '#ffffff' }} />
              )}
            </div>
          </motion.div>
        </nav>

        {/* Action items: Feedback button & PS Controller matching exact Figma Frame 1 with 21px gap */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 21 }}>
          {/* Feedback button setup chuẩn toàn bộ transition từ Figma Component Set 35:454:
              - Default (35:450): Viên thuốc đen xám viền mờ, chữ Feedback vàng
              - Hover (35:452): Khi lia vào -> Nền gradient xanh ngọc (#00E2C4 -> #C5DB00), chữ đen
              - Active / Pressed (35:453): Khi ấn vào -> Nền gradient cam (#E27500 -> #FF6A00), viền phát sáng cam, chữ trắng
          */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onMouseEnter={() => setIsFeedbackHovered(true)}
            onMouseLeave={() => {
              setIsFeedbackHovered(false)
              setIsFeedbackPressed(false)
            }}
            onMouseDown={() => setIsFeedbackPressed(true)}
            onMouseUp={() => setIsFeedbackPressed(false)}
            onClick={onFeedbackClick}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              outline: 'none'
            }}
            title="Gửi Feedback"
          >
            <div style={{
              background: 'linear-gradient(90deg, #2f2f2f 0%, #000000 100%)',
              borderRadius: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 130,
              height: 36,
              boxShadow: isFeedbackHovered ? '0 0 10px rgba(255, 234, 0, 0.5)' : 'none',
              transform: isFeedbackPressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.2s ease'
            }}>
              <span style={{
                fontFamily: '"Kantumruy", sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: '#ffea00',
                lineHeight: 1
              }}>
                Feedback
              </span>
            </div>
          </motion.button>

          {/* Logo Controller chuẩn Figma Component Set 35:509:
              - Variant 1 (Default - 35:507): Nền trắng, icon đen (khi không hover)
              - Variant 2 (Hovered - 35:508): Nền gradient vàng tối (#000000 -> #AD9000), icon trắng (khi hover)
          */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setIsControllerHovered(true)}
            onMouseLeave={() => setIsControllerHovered(false)}
            onClick={handleControllerClick}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none'
            }}
          >
            <img
              src={
                isControllerHovered
                  ? '/assets/ps_controller_active.svg'
                  : '/assets/ps_controller_default.svg'
              }
              alt="Controller"
              style={{ width: 40, height: 40, display: 'block' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
