import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdKnfvtqPkgH8OJxFuHoVQWWwklF2cTxqjmUhn1cTIFAHAm0Q/viewform'

// Cache số lượng người khảo sát ở cấp độ module (RAM) và localStorage để không bao giờ bị giật về 0 khi chuyển giữa các page
let cachedSurveyCount = null
try {
  const saved = localStorage.getItem('survey_count_cache')
  if (saved !== null) {
    cachedSurveyCount = parseInt(saved, 10)
  }
} catch (e) {
  // Bỏ qua nếu môi trường chặn localStorage
}

export default function FigmaOpenHeader({
  onFeedbackClick,
  onNavClick,
  onLogoClick,
  onControllerClick,
  activeTab: controlledActiveTab,
  isControllerActive: controlledControllerActive
}) {
  const handleFeedbackClick = (e) => {
    if (onFeedbackClick) {
      onFeedbackClick(e)
    } else {
      window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer')
    }
  }
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

  // Trạng thái lưu số lượng người đã điền khảo sát từ Google Sheets
  const [surveyCount, setSurveyCount] = useState(() => {
    if (cachedSurveyCount !== null && !isNaN(cachedSurveyCount)) {
      return cachedSurveyCount
    }
    return 0
  })

  useEffect(() => {
    let isMounted = true

    const fetchCount = () => {
      // Thêm Date.now() để chống bộ nhớ đệm (cache) của trình duyệt
      fetch(`https://script.google.com/macros/s/AKfycbxsxjf6bKqwE0Hc-6H7C4UaEYotK50eBbz54AbX2oNcXduU15n8osf3JF6fl_eRTgYFgA/exec?t=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
          if (isMounted && typeof data.count === 'number') {
            cachedSurveyCount = data.count
            try {
              localStorage.setItem('survey_count_cache', String(data.count))
            } catch (e) {}
            setSurveyCount(data.count)
          }
        })
        .catch(err => console.error('Error fetching survey count:', err))
    }

    // Gọi ngay lần đầu tiên khi load web
    fetchCount()

    // Lặp lại việc gọi API mỗi 5 giây để cập nhật realtime
    const intervalId = setInterval(fetchCount, 5000)

    // Dọn dẹp interval khi người dùng rời khỏi component
    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [])

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
      onControllerClick(!controlledControllerActive)
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
      {/* 100% Authentic Figma Torn Paper Header Background exported from Node 94:495 / Frame 8 */}
      <img
        src="/assets/figma_header_bg_clean.png"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 84,
          objectFit: 'fill',
          display: 'block',
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
            <img
              src={
                hoveredTab === 'intro' || selectedTab === 'intro'
                  ? '/assets/nav_btn_intro_active.svg'
                  : '/assets/nav_btn_intro_normal.svg'
              }
              alt="Giới thiệu"
              style={{ height: 29, width: 'auto', display: 'block' }}
            />
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
            <img
              src={
                hoveredTab === 'theory' || selectedTab === 'theory'
                  ? '/assets/nav_btn_theory_active.svg'
                  : '/assets/nav_btn_theory_normal.svg'
              }
              alt="Triết học cơ bản"
              style={{ height: 29, width: 'auto', display: 'block' }}
            />
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
            <img
              src={
                hoveredTab === 'history' || selectedTab === 'history' || selectedTab === 'environment'
                  ? '/assets/nav_btn_history_active.svg'
                  : '/assets/nav_btn_history_normal.svg'
              }
              alt="Điều kiện và môi trường"
              style={{ height: 29, width: 'auto', display: 'block' }}
            />
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
            <img
              src={
                hoveredTab === 'influence' || selectedTab === 'influence'
                  ? '/assets/nav_btn_compare_active.svg'
                  : '/assets/nav_btn_compare_normal.svg'
              }
              alt="Ảnh hưởng"
              style={{ height: 29, width: 'auto', display: 'block' }}
            />
          </motion.div>
        </nav>

        {/* Action items: Feedback button & PS Controller matching exact Figma Frame 1 with 21px gap */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 21 }}>
          {/* Feedback button setup chuẩn toàn bộ transition từ Figma Component Set 35:454:
              - Default (35:450): Viên thuốc đen xám viền mờ, chữ Feedback vàng
              - Hover (35:452): Khi lia vào -> Nền gradient xanh ngọc (#00E2C4 -> #C5DB00), chữ đen
              - Active / Pressed (35:453): Khi ấn vào -> Nền gradient cam (#E27500 -> #FF6A00), viền phát sáng cam, chữ trắng
          */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              onClick={handleFeedbackClick}
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
              <img
                src={
                  isFeedbackPressed
                    ? '/assets/feedback_active.svg'
                    : isFeedbackHovered
                    ? '/assets/feedback_hover.svg'
                    : '/assets/feedback_default.svg'
                }
                alt="Feedback"
                style={{
                  width: isFeedbackPressed ? 138 : 130,
                  height: isFeedbackPressed ? 43 : 36,
                  display: 'block',
                  transition: 'all 0.15s ease'
                }}
              />
            </motion.button>

            {/* Ô hiển thị số người đã điền (cao bằng nút Feedback) */}
            <div
              style={{
                background: 'linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 100%)',
                color: '#ffea00',
                height: 36,
                padding: '0 18px',
                borderRadius: 18,
                fontFamily: '"Inter", "Segoe UI", sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.8px',
                border: '1px solid rgba(255, 234, 0, 0.25)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              SỐ LƯỢNG NGƯỜI ĐIỀN KHẢO SÁT: {surveyCount}
            </div>
          </div>

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
                isControllerHovered || controlledControllerActive
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
