import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FigmaOpenHeader from './FigmaOpenHeader'
import FeedbackModal from './FeedbackModal'
import ReferencesModal from './ReferencesModal'
import FigmaCtaButton from './FigmaCtaButton'

/**
 * BasicPhilosophyPage (2. Triết học cơ bản)
 * 100% Exact Match to Figma Wireframe - 3 (Node 252:638) & Component 14 (Node 252:838):
 *
 * Exact Typography & Layout Specs for content-left:
 * - Font Family: 'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif throughout
 * - Header Row:
 *     - "HISTORICAL THEORY" (fontSize: 12px, bold, color: #111827)
 *     - Line (width: 24px, color: #cccccc)
 *     - "MÁC - ĂNGGHEN - LÊNIN" (fontSize: 12px, regular, color: #6b7280)
 *     - SECTION Pill: "SECTION 01" / "SECTION 02" / "SECTION 03" (fontSize: 11px, bold, color: #6b7280, border: 1px solid #d1d5db)
 * - Hero Meta:
 *     - Watermark Number: "01" / "02" / "03" (fontSize: 96px, bold, color: #111827, opacity: 0.1)
 *     - Thinker Name: "KARL MARX" / "FRIEDRICH ENGELS" / "V.I. LENIN" (fontSize: 56px, bold, color: #111827, lineHeight: 1.05)
 *     - Thinker Years: "1818 - 1883" / "1820 - 1895" / "1870 - 1924" (fontSize: 16px, regular, color: #6b7280)
 *     - Bio: fontSize: 15px, regular, color: #374151, lineHeight: 1.55
 * - Quote Box:
 *     - fontSize: 22px, regular, color: #111827, lineHeight: 1.45 (paddingLeft: 24px, borderLeft: 3px solid #c28c33)
 * - Details Block (Strict Top-Alignment):
 *     - Left: Mốc lịch sử quan trọng (width: 324px)
 *         - Title: "Mốc lịch sử quan trọng" (fontSize: 11px, bold, color: #6b7280)
 *         - 5 Milestones: height: 44px, borderBottom: 1px solid #cccccc, year bold #111827 / #c28c33, desc #374151
 *     - Right: Đóng góp lý luận (width: 260px, height: 167px, top-aligned at y: 0)
 *         - Background: #f8fafc, padding: 20px, borderRadius: 12px, border: 1px solid rgba(0,0,0,0.06)
 *         - Title: "Đóng góp lý luận" (fontSize: 11px, bold, color: #b7791f)
 *         - Text: fontSize: 12px, regular, color: #4b5563, lineHeight: 1.55
 * - Footer Decor:
 *     - Tabs: Karl Marx (101x41), Friedrich Engels (143x43), V.I. Lenin (94x43)
 *         - Active: #c28c33, text #ffffff, fontSize: 15px, bold (Framer Motion layoutId="activeThinkerPill")
 *         - Inactive: background #f2ede0, border #d9d1c2, text #404040, fontSize: 15px, regular
 *     - Dot & "CINEMATIC THEORY VIEW" (fontSize: 11px, #6b7280, dot: #ffb200)
 */

// Data structured strictly according to Figma nodes
const FIGMA_THINKERS_DATA = {
  marx: {
    id: 'marx',
    number: '01',
    section: 'SECTION 01',
    name: 'KARL MARX',
    years: '1818 - 1883',
    bio: 'Nhà triết học, nhà kinh tế chính trị và nhà tư tưởng người Đức, là một trong những người sáng lập chủ nghĩa Marx.',
    quote: '"Không phải ý thức của con người quyết định sự tồn tại của họ, mà ngược lại, sự tồn tại xã hội của họ quyết định ý thức của họ."',
    milestones: [
      { year: '1818', desc: 'Sinh tại Trier, Phổ' },
      { year: '1844', desc: 'Bắt đầu hợp tác sâu sắc với Engels' },
      { year: '1848', desc: 'Công bố Tuyên ngôn của Đảng Cộng sản' },
      { year: '1867', desc: 'Xuất bản tập I của tác phẩm Tư bản' },
      { year: '1883', desc: 'Qua đời tại London, Anh' }
    ],
    contribution: 'Xây dựng quan điểm duy vật và cách tiếp cận biện chứng đối với đời sống xã hội. Nhấn mạnh vai trò của điều kiện thực tế, đời sống vật chất và hoạt động thực tiễn.',
    image: '/assets/marx.png',
    archiveLabel: 'Hồ sơ tư tưởng nền tảng triết học biện chứng'
  },
  engels: {
    id: 'engels',
    number: '02',
    section: 'SECTION 02',
    name: 'FRIEDRICH ENGELS',
    years: '1820 - 1895',
    bio: 'Nhà triết học, nhà lý luận và nhà hoạt động xã hội người Đức, đồng thời là cộng sự quan trọng nhất của Karl Marx.',
    quote: null, // Node 252:835 in Figma has no quote-box
    milestones: [
      { year: '1820', desc: 'Sinh tại Barmen, Phổ' },
      { year: '1844', desc: 'Bắt đầu hợp tác chặt chẽ với Marx tại Paris' },
      { year: '1848', desc: 'Cùng viết và hoàn thiện Tuyên ngôn của Đảng Cộng sản' },
      { year: '1883', desc: 'Bảo vệ và hệ thống hóa tư tưởng sau khi Marx qua đời' },
      { year: '1895', desc: 'Qua đời tại London, Anh' }
    ],
    contribution: 'Phát triển, hệ thống hóa chủ nghĩa duy vật biện chứng, góp phần làm rõ các quy luật vận động phát triển của tự nhiên, xã hội và tư duy con người.',
    image: '/assets/engels.png',
    archiveLabel: 'Hồ sơ hệ thống hóa phép biện chứng duy vật'
  },
  lenin: {
    id: 'lenin',
    number: '03',
    section: 'SECTION 03',
    name: 'V.I. LENIN',
    years: '1870 - 1924',
    bio: 'Nhà cách mạng, nhà lý luận chính trị kiệt xuất Marxist người Nga, lãnh tụ phong trào vô sản thế giới.',
    quote: '"Vật chất là cái có trước; ý thức, tư duy và cảm giác là sản phẩm của vật chất."',
    milestones: [
      { year: '1870', desc: 'Sinh tại Simbirsk, Nga' },
      { year: '1902', desc: 'Xuất bản tác phẩm lý luận Làm gì?' },
      { year: '1905', desc: 'Lãnh đạo phong trào đấu tranh cách mạng Nga' },
      { year: '1917', desc: 'Lãnh đạo Bolshevik thắng lợi trong Cách mạng Tháng Mười' },
      { year: '1924', desc: 'Qua đời tại Gorki, Liên Xô' }
    ],
    contribution: 'Phát triển chủ nghĩa Marx sang giai đoạn mới. Bảo vệ quan điểm biện chứng trong tác phẩm nổi tiếng Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán.',
    image: '/assets/lenin.png',
    archiveLabel: 'Hồ sơ bảo vệ & phát triển định nghĩa vật chất'
  }
}

export default function BasicPhilosophyPage({
  activeTab = 'theory',
  isControllerActive = false,
  onNavClick,
  onControllerClick,
  onLogoClick
}) {
  // Active thinker variant: 'marx' | 'engels' | 'lenin'
  const [activeThinker, setActiveThinker] = useState('marx')
  const thinker = FIGMA_THINKERS_DATA[activeThinker]

  // Order of tabs in footer-decor: active thinker always moves to the front ("chuyển lên đầu")
  const [tabOrder, setTabOrder] = useState(['marx', 'engels', 'lenin'])

  useEffect(() => {
    setTabOrder((prevOrder) => {
      if (prevOrder[0] === activeThinker) return prevOrder
      return [activeThinker, ...prevOrder.filter((id) => id !== activeThinker)]
    })
  }, [activeThinker])

  const handleSelectThinker = (id) => {
    setActiveThinker(id)
  }
  const [activeLienHeSlide, setActiveLienHeSlide] = useState(0)

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isReferencesOpen, setIsReferencesOpen] = useState(false)

  // Hover states for Component 14
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isHudHovered, setIsHudHovered] = useState(false)

  // Hover states for Section 2 (Cơ sở lý luận) & Section 3 (Timeline)
  const [hoveredTheoryCard, setHoveredTheoryCard] = useState(null)
  const [hoveredMilestone, setHoveredMilestone] = useState(null)
  // Ensure body scroll and background color are enabled for Page 2
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const lienHeSlides = [
    '/assets/page2_lienhe_1.png',
    '/assets/page2_lienhe_2.png',
    '/assets/page2_lienhe_3.png'
  ]

  const thinkerTabs = [
    { id: 'marx', label: 'Karl Marx', width: 101 },
    { id: 'engels', label: 'Friedrich Engels', width: 143 },
    { id: 'lenin', label: 'V.I. Lenin', width: 94 }
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FAF9F5',
        overflowX: 'hidden',
        userSelect: 'none',
        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
      }}
    >
      {/* ===================================================================
          1. HEADER (Top 84px, Authentic Torn-paper background)
         =================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 84,
          zIndex: 100
        }}
      >
        <FigmaOpenHeader
          activeTab={activeTab}
          isControllerActive={isControllerActive}
          onNavClick={onNavClick}
          onControllerClick={onControllerClick}
          onFeedbackClick={() => setIsFeedbackOpen(true)}
          onLogoClick={onLogoClick}
        />
      </div>


      {/* Main Page Body (Centered 1440px Column) */}
      <div
        style={{
          paddingTop: 84,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* ===================================================================
            SECTION 1: COMPONENT 14 (Node 252:838)
            Hero Thinkers Component (1440x900)
            Left: 760px, Right: 680px
           =================================================================== */}
        {/* Full-width Section 1 background wrapper to extend pure white across entire screen */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <section
            id="section-thinkers"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 1440,
              height: 900,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Clean white backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#ffffff',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

          {/* -------------------------------------------------------------
              LEFT COLUMN: CONTENT-LEFT (Figma Node 149:244 / 149:300 / 149:354)
              Width: 760px, Height: 900px, Padding: 64px 64px 64px 80px
              AutoLayout Flex: Vertical, Space-Between
              Full Smart Animate dynamic auto-expansion and shrink on text length
             ------------------------------------------------------------- */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 760,
              height: 900,
              padding: '64px 64px 64px 80px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              zIndex: 10
            }}
          >
            {/* Header Row (Node 149:245): width: 616, height: 28 */}
            <div
              style={{
                width: 616,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
              }}
            >
              {/* Brand breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '3px'
                  }}
                >
                  HISTORICAL THEORY
                </span>
                <span style={{ width: 16, height: 1, backgroundColor: '#d1d5db', display: 'inline-block' }} />
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#6b7280',
                    letterSpacing: '0.02em'
                  }}
                >
                  MÁC - ĂNGGHEN - LÊNIN
                </span>
              </div>

              {/* Section Pill */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={thinker.number}
                  initial={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                  transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                  style={{
                    height: 28,
                    padding: '4px 12px',
                    borderRadius: 999,
                    border: '1px solid #e5e7eb',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#6b7280',
                      letterSpacing: '0.05em'
                    }}
                  >
                    SECTION {thinker.number}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hero Meta (Node 149:252 / 149:308 / 149:362): Auto-layout vertical with dynamic text height */}
            <motion.div
              layout="position"
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              style={{
                width: 616,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                flexShrink: 0
              }}
            >
              {/* Watermark/Section Number: "01" / "02" / "03" (Node 149:253) */}
              <div style={{ position: 'relative', width: 112, height: 96, flexShrink: 0 }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={thinker.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 96,
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1,
                      userSelect: 'none'
                    }}
                  >
                    {thinker.number}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thinker Name & Years (Node 149:254) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ position: 'relative', minHeight: 62 }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.h1
                      key={thinker.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 56,
                        fontWeight: 700,
                        color: '#111827',
                        letterSpacing: '-1px',
                        lineHeight: 1.05,
                        margin: 0
                      }}
                    >
                      {thinker.name}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Thinker Years (Node 149:256) */}
                <div style={{ position: 'relative', minHeight: 24 }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={thinker.years}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 16,
                        fontWeight: 400,
                        color: '#6b7280',
                        letterSpacing: '1px'
                      }}
                    >
                      {thinker.years}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bio Text (Node 149:257) - dynamically adapts to text length */}
              <motion.div
                layout="position"
                transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                style={{ position: 'relative', maxWidth: 616 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={thinker.bio}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 15,
                      fontWeight: 400,
                      color: '#374151',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {thinker.bio}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Classical Quote Box (Node 149:258 / 149:368): Smoothly expands or collapses to 0 height */}
            <AnimatePresence initial={false}>
              {thinker.quote && (
                <motion.div
                  key="quote-box-wrapper"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                  style={{
                    width: 616,
                    paddingLeft: 24,
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={thinker.quote}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 22,
                        fontWeight: 400,
                        color: '#111827',
                        lineHeight: 1.4,
                        margin: 0
                      }}
                    >
                      {thinker.quote}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Details Block (Node 149:260 / 149:314 / 149:370) */}
            <motion.div
              layout="position"
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              style={{
                width: 616,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 32,
                flexShrink: 0
              }}
            >
              {/* Left: Timeline Container (Node 149:261, width: 324px) */}
              <div style={{ width: 324, flexShrink: 0 }}>
                {/* Timeline Title (Node 149:262) */}
                <div
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: 9,
                    paddingLeft: 8,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  MỐC LỊCH SỬ QUAN TRỌNG
                </div>

                {/* Timeline List (Node 149:263) */}
                <div style={{ position: 'relative', width: 324 }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={thinker.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      {thinker.milestones.map((m, idx) => {
                        const isHovered = hoveredMilestone === idx
                        return (
                          <motion.div
                            key={m.year}
                            layout="position"
                            transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
                            onMouseEnter={() => setHoveredMilestone(idx)}
                            onMouseLeave={() => setHoveredMilestone(null)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              minHeight: 44,
                              padding: '10px 12px',
                              boxSizing: 'border-box',
                              borderRadius: 8,
                              backgroundColor: isHovered ? '#b7791f' : 'transparent',
                              border: isHovered ? '1px solid #8c590d' : '1px solid transparent',
                              borderBottom: isHovered
                                ? '1px solid #8c590d'
                                : idx < thinker.milestones.length - 1
                                ? '1px solid #cccccc'
                                : '1px solid transparent',
                              boxShadow: isHovered ? '0 3px 10px rgba(183, 121, 31, 0.28)' : 'none',
                              cursor: 'pointer',
                              transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
                              margin: '2px 0'
                            }}
                          >
                            {/* Year: White when hovered, #b7791f when normal */}
                            <span
                              style={{
                                width: 44,
                                flexShrink: 0,
                                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                color: isHovered ? '#ffffff' : '#b7791f',
                                transition: 'color 0.15s ease'
                              }}
                            >
                              {m.year}
                            </span>
                            {/* Description: White when hovered, #374151 when normal */}
                            <span
                              style={{
                                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                                fontSize: 13,
                                fontWeight: 400,
                                color: isHovered ? '#ffffff' : '#374151',
                                lineHeight: 1.35,
                                marginLeft: 16,
                                wordBreak: 'break-word',
                                transition: 'color 0.15s ease'
                              }}
                            >
                              {m.desc}
                            </span>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Contribution Card (width: 260px) */}
              {/* Dynamically expands/shrinks based on text length */}
              <motion.div
                layout
                transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                style={{
                  width: 260,
                  flexShrink: 0,
                  backgroundColor: '#f8fafc',
                  borderRadius: 8,
                  padding: '20px',
                  boxSizing: 'border-box',
                  border: isCardHovered
                    ? '1px solid rgba(183, 121, 31, 0.3)'
                    : '1px solid rgba(0, 0, 0, 0.04)',
                  boxShadow: isCardHovered
                    ? '0 6px 20px rgba(183, 121, 31, 0.1)'
                    : 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                {/* Contrib Title */}
                <div
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#b7791f',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: 12,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  ĐÓNG GÓP LÝ LUẬN
                </div>

                {/* Contrib Text - dynamic height */}
                <div style={{ position: 'relative' }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={thinker.contribution}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 12,
                        fontWeight: 400,
                        color: '#4b5563',
                        lineHeight: 1.6,
                        margin: 0
                      }}
                    >
                      {thinker.contribution}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer Decor (Node 149:282 / 149:336 / 149:392) */}
            <motion.div
              layout="position"
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              style={{
                width: 616,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 30,
                paddingTop: 16,
                flexShrink: 0
              }}
            >
              {/* Pagination Tabs with Framer Motion layout reorder animation */}
              <motion.div
                layout
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                {tabOrder.map((tabId) => {
                  const tab = thinkerTabs.find((t) => t.id === tabId)
                  if (!tab) return null
                  const isActive = activeThinker === tab.id
                  return (
                    <motion.button
                      layout
                      key={tab.id}
                      onClick={() => handleSelectThinker(tab.id)}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30
                      }}
                      style={{
                        position: 'relative',
                        border: isActive ? 'none' : '1px solid #d9d1c2',
                        backgroundColor: isActive ? 'transparent' : '#f2ede0',
                        boxShadow: isActive ? 'none' : '0 2px 6px rgba(0,0,0,0.08)',
                        padding: '7px 18px',
                        borderRadius: 20,
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 15,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? '#ffffff' : '#404040',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'color 0.3s ease, border-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 43
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeThinkerPill"
                          transition={{
                            type: 'spring',
                            stiffness: 450,
                            damping: 32,
                            mass: 0.7
                          }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 20,
                            backgroundColor: '#c28c33',
                            zIndex: -1,
                            boxShadow: '0 4px 14px rgba(194, 140, 51, 0.4)'
                          }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>
                        {tab.label}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>

              {/* Play Decor: Dot & CINEMATIC THEORY VIEW (Node 149:289) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ffb200',
                    display: 'inline-block'
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 11,
                    fontWeight: 400,
                    color: '#6b7280',
                    letterSpacing: '0.04em'
                  }}
                >
                  CINEMATIC THEORY VIEW
                </span>
              </div>
            </motion.div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: WATERCOLOR PORTRAIT & HUD OVERLAY
              (Width: 680px, Height: 900px, Left: 760px)
             ------------------------------------------------------------- */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 680,
              height: 900,
              overflow: 'hidden',
              zIndex: 5,
              backgroundColor: '#ffffff'
            }}
          >
            {/* Smooth simultaneous crossfade watercolor portraits (Zero flashing, continuous blend) */}
            {Object.values(FIGMA_THINKERS_DATA).map((t) => {
              const isCurrent = activeThinker === t.id
              return (
                <motion.img
                  key={t.id}
                  src={t.image}
                  alt={t.name}
                  initial={false}
                  animate={{
                    opacity: isCurrent ? 1 : 0,
                    scale: isCurrent ? 1 : 1.025
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none'
                  }}
                />
              )
            })}

            {/* Soft left gradient fade into pure white */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 140,
                background: 'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Documentary Archive HUD Card (Node 280:726) */}
            <motion.div
              onMouseEnter={() => setIsHudHovered(true)}
              onMouseLeave={() => setIsHudHovered(false)}
              animate={{
                scale: isHudHovered ? 1.02 : 1,
                boxShadow: isHudHovered
                  ? '0 12px 36px rgba(0, 0, 0, 0.12)'
                  : '0 6px 20px rgba(0, 0, 0, 0.06)'
              }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                right: 48,
                bottom: 48,
                width: 321,
                padding: '20px 24px',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(16px)',
                borderRadius: 16,
                border: isHudHovered
                  ? '1px solid rgba(194, 140, 51, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.6)',
                zIndex: 20,
                cursor: 'pointer'
              }}
              title="Hồ sơ tư tưởng nền tảng triết học biện chứng"
            >
              <div
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#b7791f',
                  textTransform: 'uppercase',
                  marginBottom: 6
                }}
              >
                DOCUMENTARY ARCHIVE
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThinker}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#111827',
                    lineHeight: 1.4
                  }}
                >
                  {thinker.archiveLabel}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Scroll Down Indicator (Figma Node 367:10788 / drag-up-indicator) */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('section-co-so')}
            style={{
              position: 'absolute',
              left: 696,
              bottom: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 25,
              padding: '8px 12px',
              userSelect: 'none'
            }}
            title="Cuộn xuống xem tiếp nội dung (ROLL TO)"
          >
            {/* Text on top */}
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 11,
                fontWeight: 400,
                color: 'rgba(115, 89, 64, 0.6)',
                letterSpacing: '1.5px',
                marginBottom: 6,
                lineHeight: '20px',
                textTransform: 'uppercase'
              }}
            >
              ROLL TO
            </span>

            {/* Chevron Down 1 */}
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path
                d="M1 1L8 7L15 1"
                stroke="#735940"
                strokeOpacity="0.7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Chevron Down 2 */}
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ marginTop: 2 }}>
              <path
                d="M1 1L8 7L15 1"
                stroke="#735940"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </section>
        </div>

        {/* ===================================================================
            SECTION 2: CƠ SỞ LÝ LUẬN (Figma Node 252:1038)
            1440x500 - 4 Interactive Cards with Hover Reaction
           =================================================================== */}
        <section
          id="section-co-so"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1440,
            boxSizing: 'border-box',
            backgroundColor: '#FAF9F5',
            padding: '48px 40px 60px 40px',
            overflow: 'hidden'
          }}
        >
          {/* Header Row */}
          <div style={{ maxWidth: 1360, margin: '0 auto', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)'
                }}
              />
              <span
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#606662',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase'
                }}
              >
                CHỦ NGHĨA DUY VẬT BIỆN CHỨNG
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: '#1c1f1d',
                margin: 0,
                lineHeight: 1.25
              }}
            >
              Cơ sở lý luận: Mối quan hệ giữa Hoàn cảnh & Suy nghĩ
            </h2>

            <div
              style={{
                height: 2,
                width: '100%',
                background: 'linear-gradient(90deg, #b3b600 0%, #ffb200 100%)',
                opacity: 0.4,
                marginTop: 16
              }}
            />
          </div>

          {/* 4 Theory Cards Grid */}
          <div
            style={{
              maxWidth: 1360,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 20
            }}
          >
            {[
              {
                id: 1,
                tag: 'THẾ GIỚI QUAN',
                num: '01',
                tagColor: '#3b6e8c',
                bg: '#eff5f7',
                borderColor: 'rgba(59, 110, 140, 0.18)',
                title: 'Hoàn cảnh quyết định suy nghĩ',
                subtitle: '(Vật chất quyết định Ý thức)',
                desc: 'Thiết bị tốt, Wifi mạnh giúp tiếp cận tri thức nhanh chóng; ngược lại, áp lực tài chính và thiếu hụt thiết bị dễ gieo rắc tâm lý chán nản, kiệt sức.'
              },
              {
                id: 2,
                tag: 'TÍNH ĐỘC LẬP',
                num: '02',
                tagColor: '#4b7a57',
                bg: '#f0f5ee',
                borderColor: 'rgba(75, 122, 87, 0.18)',
                title: 'Suy nghĩ có tính chủ động riêng',
                subtitle: '(Tính độc lập tương đối)',
                desc: 'Môi trường tác động nhưng không ấn định máy móc suy nghĩ của con người. Cùng một hoàn cảnh hay công cụ, mỗi sinh viên sẽ có cách phản ứng hoàn toàn khác nhau.'
              },
              {
                id: 3,
                tag: 'BIỆN CHỨNG',
                num: '03',
                tagColor: '#9c6a43',
                bg: '#f8f1eb',
                borderColor: 'rgba(156, 106, 67, 0.18)',
                title: 'Dùng hành động thay đổi hoàn cảnh',
                subtitle: '(Hoạt động thực tiễn cải tạo)',
                desc: 'Khi nhận ra điểm hạn chế của môi trường (như chỗ ở ồn ào), sinh viên có thể chủ động chuyển sang thư viện học để tối ưu hóa điều kiện sống.'
              },
              {
                id: 4,
                tag: 'PHƯƠNG PHÁP LUẬN',
                num: '04',
                tagColor: '#7a5e9c',
                bg: '#f3eff7',
                borderColor: 'rgba(122, 94, 156, 0.18)',
                title: 'Bài học nguyên tắc thực tiễn',
                subtitle: '(Tôn trọng khách quan, phát huy chủ quan)',
                desc: 'Cần tôn trọng điều kiện thực tế nhưng phải luôn phát huy tính năng động chủ quan, tránh tâm lý đổ lỗi cho hoàn cảnh hoặc ảo tưởng duy ý chí.'
              }
            ].map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, boxShadow: '0 14px 28px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  backgroundColor: card.bg,
                  borderRadius: 12,
                  padding: '24px 22px',
                  border: `1px solid ${card.borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 297,
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: card.tagColor,
                        letterSpacing: '0.6px'
                      }}
                    >
                      {card.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: card.tagColor,
                        opacity: 0.35
                      }}
                    >
                      {card.num}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1c1f1d',
                      margin: 0,
                      lineHeight: 1.35
                    }}
                  >
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <div
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: card.tagColor,
                        marginTop: 6
                      }}
                    >
                      {card.subtitle}
                    </div>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#606662',
                    margin: 0,
                    marginTop: 18
                  }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: DÒNG THỜI GIAN PHÁT TRIỂN (Figma Node 252:1081 / timeline-milestones)
            1440x900 Exact Match to Component Set 252:1031 (Property 1=Default / 171:245)
           =================================================================== */}
        <section
          id="section-timeline"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1440,
            margin: '0 auto',
            boxSizing: 'border-box',
            backgroundColor: '#FAF9F5',
            padding: '64px 34px 72px 34px',
            overflowX: 'auto'
          }}
        >
          {/* Header Section (Node 171:242, bounds: 1280x55, x: 80, y: 64) */}
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: '#2f231d',
                letterSpacing: '0.02em',
                margin: 0,
                textAlign: 'center'
              }}
            >
              LỊCH SỬ – ĐIỀU KIỆN VẬT CHẤT THAY ĐỔI, CON NGƯỜI THAY ĐỔI
            </h2>
            {/* Header Line (Node 252:974, width: 1280, height: 2) */}
            <div
              style={{
                height: 2,
                width: '100%',
                maxWidth: 1280,
                background: 'linear-gradient(90deg, transparent 0%, #ffb200 20%, #b3b600 80%, transparent 100%)',
                opacity: 0.35,
                margin: '16px auto 0 auto',
                borderRadius: 2
              }}
            />
          </div>

          {/* Timeline Infographic Container (Node 171:245, bounds: 1372x620) */}
          <div
            style={{
              width: '100%',
              maxWidth: 1372,
              margin: '0 auto',
              position: 'relative',
              overflowX: 'visible'
            }}
          >
            <div
              style={{
                width: 1372,
                minWidth: 1372,
                height: 620,
                position: 'relative',
                margin: '0 auto'
              }}
            >
              {/* SVG Decorative Layer: Central Baseline, Curved Flow Arcs, Connector Pins & Axis Nodes */}
              <svg
                width="1372"
                height="620"
                viewBox="0 0 1372 620"
                fill="none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              >
                <defs>
                  {/* Linear Gradients from Figma (paint0, paint1, paint3, paint4, paint6, paint7, paint9, paint10, paint12, paint13) */}
                  <linearGradient id="paint0_linear_171_245" x1="140.288" y1="354.771" x2="138.537" y2="354.777" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_171_245" x1="139.979" y1="302.125" x2="145.858" y2="317.366" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_171_245" x1="420.288" y1="336.771" x2="418.537" y2="336.777" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_171_245" x1="419.979" y1="302.125" x2="425.858" y2="317.366" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint6_linear_171_245" x1="700.288" y1="354.771" x2="698.537" y2="354.777" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint7_linear_171_245" x1="699.979" y1="302.125" x2="705.858" y2="317.366" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint9_linear_171_245" x1="980.288" y1="372.771" x2="978.537" y2="372.777" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint10_linear_171_245" x1="979.979" y1="302.125" x2="985.858" y2="317.366" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint12_linear_171_245" x1="1260.29" y1="354.771" x2="1258.54" y2="354.777" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                  <linearGradient id="paint13_linear_171_245" x1="1259.98" y1="302.125" x2="1265.86" y2="317.366" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB300" />
                    <stop offset="1" stopColor="#B3B600" />
                  </linearGradient>
                </defs>

                {/* 3 Curved Flows (Nodes 171:246, 171:247, 171:248) */}
                <g opacity="0.5">
                  <mask id="path-1-inside-1_171_245" fill="white">
                    <path d="M536.962 282.216C542.033 305.225 540.744 328.843 533.185 351.411C525.626 373.979 511.981 394.948 493.209 412.846C474.436 430.744 450.992 445.135 424.524 455.009C398.055 464.883 369.205 470 340 470C310.795 470 281.945 464.883 255.476 455.009C229.008 445.135 205.564 430.744 186.791 412.846C168.019 394.948 154.374 373.979 146.815 351.411C139.256 328.843 137.967 305.225 143.038 282.216L145.008 282.494C139.987 305.273 141.264 328.655 148.747 350.997C156.23 373.339 169.738 394.099 188.323 411.818C206.908 429.536 230.118 443.784 256.322 453.559C282.525 463.334 311.087 468.4 340 468.4C368.913 468.4 397.475 463.334 423.678 453.559C449.882 443.784 473.092 429.536 491.677 411.818C510.262 394.099 523.77 373.339 531.253 350.997C538.736 328.655 540.013 305.273 534.992 282.494L536.962 282.216Z"/>
                  </mask>
                  <path d="M536.962 282.216C542.033 305.225 540.744 328.843 533.185 351.411C525.626 373.979 511.981 394.948 493.209 412.846C474.436 430.744 450.992 445.135 424.524 455.009C398.055 464.883 369.205 470 340 470C310.795 470 281.945 464.883 255.476 455.009C229.008 445.135 205.564 430.744 186.791 412.846C168.019 394.948 154.374 373.979 146.815 351.411C139.256 328.843 137.967 305.225 143.038 282.216L145.008 282.494C139.987 305.273 141.264 328.655 148.747 350.997C156.23 373.339 169.738 394.099 188.323 411.818C206.908 429.536 230.118 443.784 256.322 453.559C282.525 463.334 311.087 468.4 340 468.4C368.913 468.4 397.475 463.334 423.678 453.559C449.882 443.784 473.092 429.536 491.677 411.818C510.262 394.099 523.77 373.339 531.253 350.997C538.736 328.655 540.013 305.273 534.992 282.494L536.962 282.216Z" stroke="#D39F8A" strokeWidth="3" strokeDasharray="4 6" mask="url(#path-1-inside-1_171_245)"/>
                </g>
                <g opacity="0.5">
                  <mask id="path-2-inside-2_171_245" fill="white">
                    <path d="M423.038 307.784C417.967 284.775 419.256 261.157 426.815 238.589C434.374 216.021 448.019 195.052 466.791 177.154C485.564 159.256 509.008 144.865 535.476 134.991C561.945 125.117 590.795 120 620 120C649.205 120 678.055 125.117 704.524 134.991C730.992 144.865 754.436 159.256 773.209 177.154C791.981 195.052 805.626 216.021 813.185 238.589C820.744 261.157 822.033 284.775 816.962 307.784L814.992 307.506C820.013 284.727 818.736 261.345 811.253 239.003C803.77 216.661 790.262 195.901 771.677 178.182C753.092 160.464 729.882 146.216 703.678 136.441C677.475 126.666 648.913 121.6 620 121.6C591.087 121.6 562.525 126.666 536.322 136.441C510.118 146.216 486.908 160.464 468.323 178.182C449.738 195.901 436.23 216.661 428.747 239.003C421.264 261.345 419.987 284.727 425.008 307.506L423.038 307.784Z"/>
                  </mask>
                  <path d="M423.038 307.784C417.967 284.775 419.256 261.157 426.815 238.589C434.374 216.021 448.019 195.052 466.791 177.154C485.564 159.256 509.008 144.865 535.476 134.991C561.945 125.117 590.795 120 620 120C649.205 120 678.055 125.117 704.524 134.991C730.992 144.865 754.436 159.256 773.209 177.154C791.981 195.052 805.626 216.021 813.185 238.589C820.744 261.157 822.033 284.775 816.962 307.784L814.992 307.506C820.013 284.727 818.736 261.345 811.253 239.003C803.77 216.661 790.262 195.901 771.677 178.182C753.092 160.464 729.882 146.216 703.678 136.441C677.475 126.666 648.913 121.6 620 121.6C591.087 121.6 562.525 126.666 536.322 136.441C510.118 146.216 486.908 160.464 468.323 178.182C449.738 195.901 436.23 216.661 428.747 239.003C421.264 261.345 419.987 284.727 425.008 307.506L423.038 307.784Z" stroke="#D39F8A" strokeWidth="3" strokeDasharray="4 6" mask="url(#path-2-inside-2_171_245)"/>
                </g>
                <g opacity="0.5">
                  <mask id="path-3-inside-3_171_245" fill="white">
                    <path d="M1096.96 282.216C1102.03 305.225 1100.74 328.843 1093.19 351.411C1085.63 373.979 1071.98 394.948 1053.21 412.846C1034.44 430.744 1010.99 445.135 984.524 455.009C958.055 464.883 929.205 470 900 470C870.795 470 841.945 464.883 815.476 455.009C789.008 445.135 765.564 430.744 746.791 412.846C728.019 394.948 714.374 373.979 706.815 351.411C699.256 328.843 697.967 305.225 703.038 282.216L705.008 282.494C699.987 305.273 701.264 328.655 708.747 350.997C716.23 373.339 729.738 394.099 748.323 411.818C766.908 429.536 790.118 443.784 816.322 453.559C842.525 463.334 871.087 468.4 900 468.4C928.913 468.4 957.475 463.334 983.678 453.559C1009.88 443.784 1033.09 429.536 1051.68 411.818C1070.26 394.099 1083.77 373.339 1091.25 350.997C1098.74 328.655 1100.01 305.273 1094.99 282.494L1096.96 282.216Z"/>
                  </mask>
                  <path d="M1096.96 282.216C1102.03 305.225 1100.74 328.843 1093.19 351.411C1085.63 373.979 1071.98 394.948 1053.21 412.846C1034.44 430.744 1010.99 445.135 984.524 455.009C958.055 464.883 929.205 470 900 470C870.795 470 841.945 464.883 815.476 455.009C789.008 445.135 765.564 430.744 746.791 412.846C728.019 394.948 714.374 373.979 706.815 351.411C699.256 328.843 697.967 305.225 703.038 282.216L705.008 282.494C699.987 305.273 701.264 328.655 708.747 350.997C716.23 373.339 729.738 394.099 748.323 411.818C766.908 429.536 790.118 443.784 816.322 453.559C842.525 463.334 871.087 468.4 900 468.4C928.913 468.4 957.475 463.334 983.678 453.559C1009.88 443.784 1033.09 429.536 1051.68 411.818C1070.26 394.099 1083.77 373.339 1091.25 350.997C1098.74 328.655 1100.01 305.273 1094.99 282.494L1096.96 282.216Z" stroke="#D39F8A" strokeWidth="3" strokeDasharray="4 6" mask="url(#path-3-inside-3_171_245)"/>
                </g>

                {/* Central Baseline (Node 171:249, x: 140 to 1260, y: 309) */}
                <line
                  opacity="0.6"
                  x1="140"
                  y1="309"
                  x2="1260"
                  y2="309"
                  stroke="#D39F8A"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />

                {/* 5 Connector Pins (Nodes 171:251, 171:261, 171:271, 171:281, 171:291) */}
                <line opacity="0.4" x1="140.75" y1="300" x2="140.75" y2="410" stroke="url(#paint0_linear_171_245)" strokeWidth="1.5" />
                <line opacity="0.4" x1="420.75" y1="282" x2="420.75" y2="392" stroke="url(#paint3_linear_171_245)" strokeWidth="1.5" />
                <line opacity="0.4" x1="700.75" y1="300" x2="700.75" y2="410" stroke="url(#paint6_linear_171_245)" strokeWidth="1.5" />
                <line opacity="0.4" x1="980.75" y1="318" x2="980.75" y2="428" stroke="url(#paint9_linear_171_245)" strokeWidth="1.5" />
                <line opacity="0.4" x1="1260.75" y1="300" x2="1260.75" y2="410" stroke="url(#paint12_linear_171_245)" strokeWidth="1.5" />

                {/* 5 Axis Nodes (Nodes 171:252, 171:262, 171:272, 171:282, 171:292) */}
                <circle cx="140" cy="310" r="5" fill="url(#paint1_linear_171_245)" />
                <circle cx="420" cy="310" r="5" fill="url(#paint4_linear_171_245)" />
                <circle cx="700" cy="310" r="5" fill="url(#paint7_linear_171_245)" />
                <circle cx="980" cy="310" r="5" fill="url(#paint10_linear_171_245)" />
                <circle cx="1260" cy="310" r="5" fill="url(#paint13_linear_171_245)" />
              </svg>

              {/* 5 Milestone Info-Blocks (Exact Figma Coordinates & Typography) */}
              {[
                {
                  id: 0,
                  era: 'Thế kỷ XIX',
                  title: 'Cách mạng công nghiệp',
                  material: (
                    <>
                      Biến đổi: Máy hơi nước, nhà máy, đô
                      <br />
                      thị hóa
                    </>
                  ),
                  learning: (
                    <>
                      Chuyển từ học nghề cá thể sang hệ thống
                      <br />
                      trường học đại chúng
                    </>
                  ),
                  left: 30,
                  top: 100,
                  isTop: true
                },
                {
                  id: 1,
                  era: 'Năm 1917',
                  title: 'Cách mạng Tháng Mười',
                  material: (
                    <>
                      Biến đổi: Xóa bỏ chế độ áp bức, thay
                      <br />
                      đổi quan hệ sản xuất
                    </>
                  ),
                  learning: (
                    <>
                      Quần chúng công nông được tiếp cận
                      <br />
                      giáo dục bình đẳng
                    </>
                  ),
                  left: 310,
                  top: 451,
                  isTop: false
                },
                {
                  id: 2,
                  era: 'Cuối Thế kỷ XX',
                  title: 'Máy tính & Internet',
                  material: (
                    <>
                      Biến đổi: Máy tính cá nhân, mạng toàn
                      <br />
                      cầu, smartphone
                    </>
                  ),
                  learning: (
                    <>
                      Tri thức mở rộng; người học chuyển từ thụ
                      <br />
                      động sang tự tra cứu
                    </>
                  ),
                  left: 590,
                  top: 100,
                  isTop: true
                },
                {
                  id: 3,
                  era: 'Năm 2020',
                  title: 'Đại dịch COVID-19',
                  material: (
                    <>
                      Biến đổi: Giãn cách xã hội, bắt buộc
                      <br />
                      học trực tuyến
                    </>
                  ),
                  learning: (
                    <>
                      Đòi hỏi cao về tính tự giác, kỷ luật và năng
                      <br />
                      lực công nghệ
                    </>
                  ),
                  left: 870,
                  top: 451,
                  isTop: false
                },
                {
                  id: 4,
                  era: 'Kỷ nguyên AI',
                  title: 'Kỷ nguyên AI',
                  material: (
                    <>
                      Biến đổi: Trợ lý AI (ChatGPT, Gemini) tự
                      <br />
                      động hóa tri thức
                    </>
                  ),
                  learning: (
                    <>
                      Học thuộc lòng mất giá trị; tư duy phản
                      <br />
                      biện trở thành cốt lõi
                    </>
                  ),
                  left: 1150,
                  top: 100,
                  isTop: true
                }
              ].map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ y: m.isTop ? -4 : 4, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: m.left,
                    top: m.top,
                    width: 220,
                    height: 144,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    cursor: 'default',
                    userSelect: 'none'
                  }}
                >
                  {/* era-label (Node 171:255, Bold 14px, gradient gold) */}
                  <div
                    style={{
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '25px',
                      letterSpacing: '0.02em',
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {m.era}
                  </div>

                  {/* milestone-title (Node 171:256, Bold 16px, color: #2f231d) */}
                  <div
                    style={{
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#2f231d',
                      lineHeight: '29px',
                      marginTop: 2,
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {m.title}
                  </div>

                  {/* text-divider (Node 171:257, width: 24, height: 2, color: #d39f8a, opacity: 0.5) */}
                  <div
                    style={{
                      width: 24,
                      height: 2,
                      backgroundColor: '#d39f8a',
                      opacity: 0.5,
                      margin: '6px auto',
                      borderRadius: 1
                    }}
                  />

                  {/* material-change (Node 171:258, Regular 12px, color: #6e5b54) */}
                  <div
                    style={{
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#6e5b54',
                      lineHeight: 1.4,
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {m.material}
                  </div>

                  {/* learning-change (Node 171:259, Regular 11px, color: #9c8a82) */}
                  <div
                    style={{
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: 11,
                      fontWeight: 400,
                      color: '#9c8a82',
                      lineHeight: 1.4,
                      marginTop: 4,
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    {m.learning}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Caption (Node 171:300 / 252:1025, bounds: 1280x22, x: 80, y: 814) */}
          <div
            style={{
              maxWidth: 1280,
              margin: '36px auto 0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(211, 159, 138, 0.25)',
              paddingTop: 16
            }}
          >
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: '#9c8a82'
              }}
            >
              Triết học duy vật lịch sử - Mối quan hệ biện chứng giữa tồn tại xã hội và ý thức xã hội
            </span>
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Học thuyết Mác - Lênin
            </span>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: LIÊN HỆ THỰC TIỄN (Figma Node 298:2995 / Component 15)
            1440x900 - 3 Slides with "TIẾP THEO →" Navigation & Pagination
           =================================================================== */}
        <section
          id="section-lien-he"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1440,
            boxSizing: 'border-box',
            backgroundColor: '#FAF9F5',
            padding: '56px 80px 48px 80px',
            minHeight: 820,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
        >
          <div>
            {/* Header Row */}
            <div
              style={{
                maxWidth: 1120,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 32
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#111827',
                    letterSpacing: '3px'
                  }}
                >
                  HISTORICAL THEORY
                </span>
                <div style={{ width: 16, height: 1, backgroundColor: '#d1d5db' }} />
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#6b7280'
                  }}
                >
                  MÁC - ĂNGGHEN - LÊNIN
                </span>
              </div>

              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 100,
                  padding: '4px 14px',
                  backgroundColor: '#ffffff'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#6b7280'
                  }}
                >
                  SECTION 04
                </span>
              </div>
            </div>

            {/* Hero Meta */}
            <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center', marginBottom: 36 }}>
              <div
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 72,
                  fontWeight: 700,
                  color: '#111827',
                  opacity: 0.12,
                  lineHeight: 0.8,
                  marginBottom: 8
                }}
              >
                ◇
              </div>
              <h2
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 38,
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.5px',
                  margin: 0
                }}
              >
                LIÊN HỆ LÝ LUẬN VỚI SINH VIÊN
              </h2>
              <div
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#6b7280',
                  letterSpacing: '1px',
                  marginTop: 8
                }}
              >
                VẬN DỤNG THỰC TIỄN & NĂNG ĐỘNG CHỦ QUAN
              </div>
            </div>

            {/* Slide Content with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeLienHeSlide === 0 && (
                <motion.div
                  key="slide-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  style={{ maxWidth: 960, margin: '0 auto' }}
                >
                  <div
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#6b7280',
                      letterSpacing: '2px',
                      textAlign: 'center',
                      marginBottom: 24,
                      textTransform: 'uppercase'
                    }}
                  >
                    4.1. Vai trò của điều kiện vật chất đối với việc học
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: 20
                    }}
                  >
                    {[
                      {
                        title: 'Thiết bị & Công nghệ',
                        desc: 'Laptop tốt và Wi-Fi mạnh giúp học tập hiệu quả; thiết bị yếu dễ gây ức chế, nản lòng.'
                      },
                      {
                        title: 'Kinh tế & Thời gian',
                        desc: 'Áp lực tài chính buộc sinh viên làm thêm quá sức, dẫn đến kiệt quệ và giảm tư duy sáng tạo.'
                      },
                      {
                        title: 'Không gian học tập',
                        desc: 'Môi trường sống ồn ào tăng phân tâm; góc học yên tĩnh thúc đẩy sự tập trung sâu sắc.'
                      }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, borderColor: '#c28c33' }}
                        style={{
                          backgroundColor: '#f5f5f5',
                          borderRadius: 10,
                          padding: '24px 20px',
                          border: '1px solid #e5e7eb',
                          textAlign: 'center',
                          boxSizing: 'border-box'
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#111827',
                            margin: '0 0 10px 0'
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                            fontSize: 12,
                            fontWeight: 400,
                            color: '#4b5563',
                            lineHeight: 1.6,
                            margin: 0
                          }}
                        >
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeLienHeSlide === 1 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  style={{ maxWidth: 960, margin: '0 auto' }}
                >
                  <div
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#6b7280',
                      letterSpacing: '2px',
                      textAlign: 'center',
                      marginBottom: 24,
                      textTransform: 'uppercase'
                    }}
                  >
                    4.2. Tính độc lập tương đối: Cùng hoàn cảnh, phản ứng khác nhau
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: 20
                    }}
                  >
                    {[
                      {
                        context: 'Công cụ AI (ChatGPT, Gemini)',
                        proactive: 'Dùng AI gợi ý dàn ý, phản biện để tự viết và kiểm chứng.',
                        passive: 'Đưa đề cho AI làm hộ, copy-paste nguyên văn, không hiểu bài.'
                      },
                      {
                        context: 'Phòng trọ / KTX ồn ào',
                        proactive: 'Chủ động lên thư viện trường hoặc quán cà phê yên tĩnh để học.',
                        passive: 'Đổ lỗi hoàn cảnh, nằm lướt mạng xã hội né tránh học tập.'
                      },
                      {
                        context: 'Khó khăn tài chính',
                        proactive: 'Sắp xếp thời gian săn học bổng, làm thêm đúng ngành học.',
                        passive: 'Bi quan, bỏ tiết học, học đối phó chỉ mong qua môn.'
                      }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        style={{
                          backgroundColor: '#f5f5f5',
                          borderRadius: 10,
                          padding: '20px 18px',
                          border: '1px solid #e5e7eb',
                          boxSizing: 'border-box'
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#111827',
                            margin: '0 0 14px 0',
                            textAlign: 'center',
                            borderBottom: '1px solid #e5e7eb',
                            paddingBottom: 8
                          }}
                        >
                          {item.context}
                        </h4>
                        <div style={{ marginBottom: 10 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#15803d' }}>
                            ✓ Sinh viên Chủ động:
                          </span>
                          <p style={{ fontSize: 12, color: '#374151', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                            {item.proactive}
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c' }}>
                            ✗ Sinh viên Thụ động:
                          </span>
                          <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                            {item.passive}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeLienHeSlide === 2 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  style={{ maxWidth: 960, margin: '0 auto' }}
                >
                  <div
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#6b7280',
                      letterSpacing: '2px',
                      textAlign: 'center',
                      marginBottom: 24,
                      textTransform: 'uppercase'
                    }}
                  >
                    4.3. Mô hình tác động biện chứng 2 chiều & Bài học thực tiễn
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 16
                    }}
                  >
                    {[
                      {
                        title: '1. Thừa nhận thực tế',
                        desc: 'Đánh giá đúng nguồn lực bản thân (thiết bị, tài chính, thời gian) để đặt mục tiêu phù hợp.'
                      },
                      {
                        title: '2. Tối ưu nguồn lực',
                        desc: 'Tận dụng tối đa thư viện trường, phần mềm miễn phí và sự trợ giúp từ thầy cô, bạn bè.'
                      },
                      {
                        title: '3. Làm chủ công nghệ',
                        desc: 'Sử dụng AI như đòn bẩy hỗ trợ, tuyệt đối không để AI tư duy thay bản thân.'
                      },
                      {
                        title: '4. Phát huy bản lĩnh',
                        desc: 'Dùng kỷ luật cá nhân và sự chủ động để biến nghịch cảnh thành động lực rèn luyện.'
                      }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, borderColor: '#c28c33' }}
                        style={{
                          backgroundColor: '#f5f5f5',
                          borderRadius: 10,
                          padding: '18px 16px',
                          border: '1px solid #e5e7eb',
                          boxSizing: 'border-box'
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#c28c33',
                            margin: '0 0 8px 0'
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                            fontSize: 12,
                            fontWeight: 400,
                            color: '#4b5563',
                            lineHeight: 1.5,
                            margin: 0
                          }}
                        >
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* "TIẾP THEO →" Interactive Button */}
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveLienHeSlide((prev) => (prev + 1) % 3)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 24,
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#66594d',
                  letterSpacing: '1px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                TIẾP THEO →
              </motion.button>
            </div>
          </div>

          {/* Footer Decor of Section 4 */}
          <div
            style={{
              maxWidth: 1120,
              margin: '40px auto 0 auto',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e5e7eb',
              paddingTop: 20
            }}
          >
            {/* Breadcrumb Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                onClick={() => {
                  setActiveThinker('marx')
                  scrollToTop()
                }}
                style={{ fontSize: 13, color: '#6b7280', cursor: 'pointer' }}
              >
                Karl Marx
              </span>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>→</span>
              <span
                onClick={() => {
                  setActiveThinker('engels')
                  scrollToTop()
                }}
                style={{ fontSize: 13, color: '#6b7280', cursor: 'pointer' }}
              >
                Friedrich Engels
              </span>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>→</span>
              <span
                onClick={() => {
                  setActiveThinker('lenin')
                  scrollToTop()
                }}
                style={{ fontSize: 13, color: '#6b7280', cursor: 'pointer' }}
              >
                V.I. Lenin
              </span>
              <span style={{ fontSize: 13, color: '#9ca3af' }}>→</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#b7791f' }}>
                Liên hệ thực tiễn ({activeLienHeSlide + 1}/3)
              </span>
            </div>

            {/* Slide Indicator Dots */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLienHeSlide(idx)}
                  style={{
                    width: idx === activeLienHeSlide ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor:
                      idx === activeLienHeSlide ? '#b7791f' : 'rgba(183, 121, 31, 0.25)',
                    transition: 'all 0.25s ease'
                  }}
                  title={`Trang ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#ffb200'
                }}
              />
              <span
                style={{
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontSize: 11,
                  color: '#6b7280',
                  letterSpacing: '1px'
                }}
              >
                CINEMATIC THEORY VIEW
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: BỐI CẢNH TRIẾT HỌC (Figma Node 348:3519 / slide-triet-hoc-boi-canh)
            1440x920 - 2x2 Editorial Spread
           =================================================================== */}
        <section
          id="section-boi-canh"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1440,
            boxSizing: 'border-box',
            backgroundColor: '#FAF9F5',
            padding: '48px 72px 48px 72px',
            minHeight: 920,
            overflow: 'hidden'
          }}
        >
          {/* Header Block */}
          <div style={{ maxWidth: 1296, margin: '0 auto', textAlign: 'center', marginBottom: 36 }}>
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#b3954c',
                letterSpacing: '2.5px',
                textTransform: 'uppercase'
              }}
            >
              TRACTATUS ACADEMICA
            </span>
            <h2
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 44,
                fontWeight: 700,
                color: '#241c16',
                letterSpacing: '-1px',
                lineHeight: 1.15,
                margin: '12px 0 10px 0'
              }}
            >
              Những Bước Chuyển Bối Cảnh Thực Tế Của Sinh Viên
            </h2>
            <p
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 16,
                fontStyle: 'italic',
                color: '#4a372c',
                opacity: 0.78,
                margin: 0
              }}
            >
              "Đối chiếu hành vi và nhận thức dưới lăng kính của triết học cổ điển"
            </p>
          </div>

          {/* 2x2 Editorial Spread Grid */}
          <div
            style={{
              maxWidth: 1296,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 24
            }}
          >
            {[
              {
                id: 'socrates',
                philosopher: 'Socrates - Triết học Hy Lạp Cổ đại',
                title: 'THPT đến Đại học',
                environment: 'Học tín chỉ, sống xa nhà.',
                cognition: 'Tự chịu trách nhiệm bản thân.',
                behavior: 'Lên thời khóa biểu, tự ra thư viện.'
              },
              {
                id: 'aristotle',
                philosopher: 'Aristotle - Triết học Duy vật & Khoa học',
                title: 'Bùng nổ AI',
                environment: 'Trợ lý giải đáp tức thì.',
                cognition: 'Học thuộc không còn tác dụng.',
                behavior: 'Đặt câu hỏi, phản biện, kiểm chứng.'
              },
              {
                id: 'confucius',
                philosopher: 'Confucius - Triết học Đông Á Cổ đại',
                title: 'Nông thôn đến Đô thị',
                environment: 'Nhịp sống nhanh, cạnh tranh cao.',
                cognition: 'Thấy rõ áp lực kinh tế.',
                behavior: 'Tiết kiệm, học thêm kỹ năng mềm.'
              },
              {
                id: 'descartes',
                philosopher: 'René Descartes - Triết học Baroque Pháp',
                title: 'Trực tiếp đến Trực tuyến',
                environment: 'Học qua màn hình tại nhà.',
                cognition: 'Kỷ luật tự giác quyết định 90%.',
                behavior: 'Tắt ứng dụng giải trí, chủ động hỏi bài.'
              }
            ].map((scene) => (
              <motion.div
                key={scene.id}
                whileHover={{
                  y: -4,
                  borderColor: '#c28c33',
                  boxShadow: '0 12px 28px rgba(194, 140, 51, 0.12)'
                }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: '#fffcf7',
                  borderRadius: 20,
                  border: '1.5px solid #e7d3b8',
                  padding: '24px 28px',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#b3954c',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {scene.philosopher}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#241c16',
                      letterSpacing: '-0.5px',
                      margin: '6px 0 18px 0'
                    }}
                  >
                    {scene.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#241c16',
                        opacity: 0.72,
                        minWidth: 90
                      }}
                    >
                      Môi trường:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 15,
                        color: '#241c16',
                        opacity: 0.9
                      }}
                    >
                      {scene.environment}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#241c16',
                        opacity: 0.72,
                        minWidth: 90
                      }}
                    >
                      Nhận thức:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 15,
                        color: '#241c16',
                        opacity: 0.9
                      }}
                    >
                      {scene.cognition}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#241c16',
                        opacity: 0.72,
                        minWidth: 90
                      }}
                    >
                      Hành vi:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                        fontSize: 15,
                        color: '#241c16',
                        opacity: 0.9
                      }}
                    >
                      {scene.behavior}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Slide Footer */}
          <div
            style={{
              maxWidth: 1296,
              margin: '36px auto 0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(231, 211, 184, 0.5)',
              paddingTop: 16
            }}
          >
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 12,
                color: '#6e5b54'
              }}
            >
              Biện chứng duy vật lịch sử • Đời sống hiện thực quyết định đời sống tinh thần
            </span>
            <span
              style={{
                fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#b3954c'
              }}
            >
              Scaffold Cohort V
            </span>
          </div>
        </section>

        {/* Smooth Transition Gradient into Footer (Node 377:1310) */}
        <div
          style={{
            width: '100%',
            height: 248,
            background: 'linear-gradient(180deg, #FAF9F5 0%, #ffecc4 100%)',
            display: 'block'
          }}
        />

        {/* ===================================================================
            SECTION 6: CHÂN TRANG (Figma Node 298:3078 / Frame 10)
            Footer with References Modal & "Scroll to top"
           =================================================================== */}
        <footer
          id="section-footer"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 300,
            backgroundColor: '#ffecc3',
            padding: '40px 60px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Watermark Logo Camind in Background (Node 298:3111) */}
          <div
            style={{
              position: 'absolute',
              right: -20,
              bottom: -30,
              width: 755,
              height: 148,
              opacity: 0.22,
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <img
              src="/assets/camind_logo_footer.svg"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Top Roll-to indicator (Node 367:10810) */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: 1280,
              margin: '0 auto',
              marginBottom: 24
            }}
          >
            <motion.div
              onClick={scrollToTop}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.94 }}
              style={{
                cursor: 'pointer',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: 12,
                userSelect: 'none'
              }}
              title="Cuộn lên đầu trang (roll to top)"
              aria-label="Cuộn lên đầu trang"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                  <path d="M1 7L8 1L15 7" stroke="#735940" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" style={{ marginTop: 2 }}>
                  <path d="M1 7L8 1L15 7" stroke="#735940" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <span
                style={{
                  fontSize: 11,
                  color: 'rgba(115, 89, 64, 0.75)',
                  letterSpacing: '1.5px',
                  marginTop: 4,
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                roll to
              </span>
            </motion.div>
          </div>

          {/* Main Footer Content Row (Node 298:3124) */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: 1280,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 32
            }}
          >
            {/* Left Column (Node 298:3125) */}
            <div style={{ maxWidth: 520 }}>
              {/* Thank you title with gradient (Node 298:3127) */}
              <h3
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.5px',
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                }}
              >
                Thank you for watching!
              </h3>

              {/* Author info (Node 298:3128) */}
              <div
                style={{
                  fontSize: 18,
                  color: '#4e4e4e',
                  marginBottom: 16,
                  fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                }}
              >
                Created by: camind Team - Research & Presentation
              </div>

              {/* Copyright & Tagline (Node 298:3129) */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(78, 78, 78, 0.7)',
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                  }}
                >
                  © 2024 camind. All rights reserved.
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(78, 78, 78, 0.7)',
                    marginTop: 4,
                    fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
                  }}
                >
                  Empowering discovery through deep research and visual storytelling.
                </div>
              </div>
            </div>

            {/* Right Column: CTA Button (Node 377:1314) */}
            <div>
              <FigmaCtaButton onClick={() => onNavClick('conclusion')} />
            </div>
          </div>
        </footer>
      </div>

      {/* ===================================================================
          MODALS
         =================================================================== */}
      <ReferencesModal
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  )
}
