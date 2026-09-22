import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Smartphone, TrendingUp } from 'lucide-react'
import FigmaOpenHeader from './FigmaOpenHeader'
import FeedbackModal from './FeedbackModal'
import ReferencesModal from './ReferencesModal'
import FigmaCtaButton from './FigmaCtaButton'

/**
 * InfluencePage (4. Ảnh hưởng — Ảnh Hưởng Xã Hội & Môi Trường Thứ Cấp)
 * 100% Authentic Figma Design
 *
 * Sections:
 * - Hero (367:5502): "ẢNH HƯỞNG XÃ HỘI & MÔI TRƯỜNG THỨ CẤP"
 * - 5.5 Gia Đình (367:5509)
 * - 5.6 Bạn Bè (367:5528)
 * - 5.7 Nhà Trường (367:5547)
 * - 5.8 Mạng Xã Hội (367:5587)
 * - 5.9 AI (367:5609)
 * - 5.10 Sức Ép (367:5634)
 * - Footer (reuse pattern from EnvironmentConditionPage)
 */

export default function InfluencePage({
  activeTab = 'influence',
  isControllerActive = false,
  onNavClick,
  onControllerClick,
  onLogoClick
}) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isReferencesOpen, setIsReferencesOpen] = useState(false)
  const scrollContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    } else {
      const footerEl = document.getElementById('page-footer')
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
  }
  const scrollToContent = scrollToBottom

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Animation variants
  const fadeInSection = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const cardHover = {
    whileHover: {
      y: -4,
      boxShadow: '0 12px 28px -6px rgba(115, 89, 64, 0.12)',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  }

  // Reusable sub-components

  /** Section tag label: gold badge + line + uppercase text */
  const SectionTag = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          backgroundColor: '#e5a100',
          borderRadius: 4,
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#ffffff', fontFamily: "'Kantumruy', sans-serif" }}>&nbsp;</span>
      </div>
      <div style={{ width: 40, height: 0, borderTop: '1px solid rgba(215, 180, 156, 0.5)' }} />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: '#8b6914',
          letterSpacing: '1px',
          fontFamily: "'Kantumruy', sans-serif",
          textTransform: 'uppercase'
        }}
      >
        {label}
      </span>
    </div>
  )

  /** Section title (28px bold) */
  const SectionTitle = ({ children }) => (
    <h2
      style={{
        fontSize: 28,
        fontWeight: 700,
        color: '#2c1e15',
        margin: 0,
        fontFamily: "'Kantumruy', sans-serif"
      }}
    >
      {children}
    </h2>
  )

  /** Body text (16px regular) */
  const BodyText = ({ children }) => (
    <p
      style={{
        fontSize: 16,
        fontWeight: 400,
        color: '#4a372c',
        lineHeight: 1.6,
        margin: 0,
        fontFamily: "'Kantumruy', sans-serif"
      }}
    >
      {children}
    </p>
  )

  /** Image card with border and shadow */
  const ImageCard = ({ src, alt, width = 400, height = 'auto', imgHeight }) => (
    <motion.div
      {...cardHover}
      style={{
        width,
        minWidth: width,
        borderRadius: 16,
        border: '1px solid #e7d3b8',
        backgroundColor: '#fffdf9',
        padding: 20,
        boxSizing: 'border-box',
        boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)',
        flexShrink: 0
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: imgHeight || 'auto',
          borderRadius: 8,
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </motion.div>
  )

  /** Comparison card (positive/negative) */
  const ComparisonCard = ({ title, description, variant = 'positive' }) => {
    const isPositive = variant === 'positive'
    return (
      <motion.div
        {...cardHover}
        style={{
          flex: 1,
          borderRadius: 16,
          backgroundColor: isPositive ? '#f3f8f0' : '#fff4e8',
          border: `1px solid ${isPositive ? '#d7e6d1' : '#f0d7b6'}`,
          padding: 20,
          boxSizing: 'border-box',
          boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#2c1e15',
            fontFamily: "'Kantumruy', sans-serif"
          }}
        >
          {title}
        </span>
        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#4a372c',
            lineHeight: 1.5,
            margin: 0,
            fontFamily: "'Kantumruy', sans-serif"
          }}
        >
          {description}
        </p>
      </motion.div>
    )
  }

  /** Research card with book icon + study text + source */
  const ResearchCard = ({ children, source, chartSrc, chartAlt, chartHeight }) => (
    <motion.div
      {...cardHover}
      style={{
        borderRadius: 16,
        backgroundColor: '#fffdf9',
        border: '1px solid #e5a100',
        borderTop: '2px solid #e5a100',
        padding: 24,
        boxSizing: 'border-box',
        boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03), 0 -2px 0 rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BookOpen size={16} color="#8b6914" strokeWidth={2} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#2c1e15',
            letterSpacing: '1px',
            fontFamily: "'Kantumruy', sans-serif",
            textTransform: 'uppercase'
          }}
        >
          NGHIÊN CỨU & SỐ LIỆU THỰC TẾ
        </span>
      </div>
      {chartSrc && (
        <img
          src={chartSrc}
          alt={chartAlt || 'Research chart'}
          style={{
            width: '100%',
            height: chartHeight || 'auto',
            borderRadius: 8,
            objectFit: 'cover',
            display: 'block'
          }}
        />
      )}
      <p
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: '#4a372c',
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'Kantumruy', sans-serif"
        }}
      >
        {children}
      </p>
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            color: '#8b6914',
            textDecoration: 'underline',
            fontFamily: "'Kantumruy', sans-serif",
            wordBreak: 'break-all'
          }}
        >
          Nguồn: {source}
        </a>
      )}
    </motion.div>
  )

  /** Numbered list item */
  const NumberedItem = ({ num, label }) => (
    <motion.div
      {...cardHover}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fffdf9',
        border: '1px solid #e7d3b8',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: '#e5a100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', fontFamily: "'Kantumruy', sans-serif" }}>
          {num}
        </span>
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: '#2c1e15',
          fontFamily: "'Kantumruy', sans-serif"
        }}
      >
        {label}
      </span>
    </motion.div>
  )

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #fff8f0 0%, #fdfcf7 100%)',
        userSelect: 'text',
        fontFamily: "'Kantumruy', 'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        color: '#2c1e15'
      }}
    >
      {/* ===================================================================
          1. HEADER
         =================================================================== */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: 84,
          zIndex: 1000
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

      {/* ===================================================================
          2. HERO SECTION (Node 367:5502) - 100% Authentic Figma Wireframe - 6
             Full Width Edge-to-Edge Fill without side margins
         =================================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          userSelect: 'none',
          boxShadow: '0 8px 32px rgba(139, 105, 20, 0.08)'
        }}
      >
        {/* Authentic High-Resolution Figma Hero Image (2880x840 Retina) with students photography & warm gradient */}
        <img
          src="/assets/hero_wf6.png"
          alt="Tác Động Từ Gia Đình, Bạn Bè, Giảng Viên, Mạng Xã Hội Và Trí Tuệ Nhân Tạo (AI)"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            pointerEvents: 'none'
          }}
        />

        {/* Accessible hidden text for screen readers & SEO */}
        <h1
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0
          }}
        >
          Tác Động Từ Gia Đình, Bạn Bè, Giảng Viên, Mạng Xã Hội Và Trí Tuệ Nhân Tạo (AI)
        </h1>

        {/* Interactive "roll to" hotspot button over authentic Figma design */}
        <motion.button
          onClick={scrollToContent}
          whileHover={{
            scale: 1.05,
            backgroundColor: 'rgba(115, 89, 64, 0.08)',
            boxShadow: '0 4px 16px rgba(115, 89, 64, 0.10)'
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: '69.0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100,
            height: 52,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
          }}
          aria-label="Cuộn xuống nội dung"
        />
      </motion.section>

      {/* ===================================================================
          3. MAIN CONTENT CONTAINER (1280px Stage Centered)
         =================================================================== */}
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '56px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 31
        }}
      >

          {/* =================================================================
              SECTION 5.5 — GIA ĐÌNH (Node 367:5509)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="MÔI TRƯỜNG GIA ĐÌNH" />
            <SectionTitle>Môi trường gia đình</SectionTitle>

            {/* Horizontal layout: Image left + Text right */}
            <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
              <ImageCard
                src="/assets/moi_truong_gia_dinh.jpg"
                alt="Môi trường gia đình"
                width={400}
                imgHeight={187}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <BodyText>
                  Gia đình là điểm tựa vững chắc cung cấp hỗ trợ kinh tế, tinh thần, định hướng nghề nghiệp. Tuy nhiên, áp lực vô hình từ kỳ vọng điểm số quá cao hay so sánh với "con nhà người ta" đôi khi lại biến sự quan tâm thành rào cản tâm lý nặng nề.
                </BodyText>

                {/* Comparison cards */}
                <div style={{ display: 'flex', gap: 24 }}>
                  <ComparisonCard
                    variant="positive"
                    title="Hướng tích cực"
                    description="Gia đình hỗ trợ ổn định tài chính và động viên tinh thần giúp sinh viên an tâm tập trung hoàn toàn vào học tập và phát triển bản thân."
                  />
                  <ComparisonCard
                    variant="negative"
                    title="Hướng tiêu cực"
                    description='Kỳ vọng thái quá tạo ra căng thẳng thường trực, lo âu sợ thất bại khiến sinh viên dễ có xu hướng học đối phó, thiếu sáng tạo.'
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* =================================================================
              SECTION 5.6 — BẠN BÈ (Node 367:5528)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="BẠN BÈ & NHÓM HỌC TẬP" />
            <SectionTitle>Bạn bè và nhóm học tập</SectionTitle>

            <BodyText>
              Môi trường tương tác xã hội của sinh viên được quyết định rất lớn bởi bạn bè đồng trang lứa. Bạn bè tốt mang đến động lực cạnh tranh lành mạnh, cơ hội học hỏi lẫn nhau. Ngược lại, những thói quen tiêu cực như nghiện game, ỷ lại cũng rất dễ lây lan biện chứng.
            </BodyText>

            {/* Research card with chart */}
            <ResearchCard
              chartSrc="/assets/ban_be_nhom_hoc_tap.jpg"
              chartAlt="Biểu đồ nghiên cứu bạn bè và nhóm học tập"
              chartHeight={388}
              source="https://www.sciencedirect.com/science/article/abs/pii/S2050700321000358"
            >
              Nghiên cứu trên 468 sinh viên năm nhất cho thấy sự hỗ trợ học tập đắc lực từ gia đình và bạn bè có mối liên hệ mật thiết đến động lực học tập nội tại và điểm số GPA học kỳ đầu. Dẫu vậy, đây là nghiên cứu tương quan và bạn bè không mang tính quyết định tuyệt đối một chiều.
            </ResearchCard>
          </motion.section>

          {/* =================================================================
              SECTION 5.7 — NHÀ TRƯỜNG (Node 367:5547)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="GIẢNG VIÊN & NHÀ TRƯỜNG" />
            <SectionTitle>Giảng viên và nhà trường</SectionTitle>

            {/* Horizontal layout: Text + numbered items left / Image right */}
            <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <BodyText>
                  Môi trường nhà trường bao gồm hệ thống cơ sở vật chất, thư viện, chất lượng chương trình đào tạo và phương pháp truyền đạt của giảng viên. Tất cả những yếu tố khách quan này đóng vai trò quan trọng trong việc định hướng, nuôi dưỡng thái độ nghiêm túc của người học.
                </BodyText>

                {/* 5 numbered list items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  <NumberedItem num="1" label="Động lực nội tại của sinh viên" />
                  <NumberedItem num="2" label="Kiến thức & kỹ năng sư phạm của giảng viên" />
                  <NumberedItem num="3" label="Trình độ chuyên môn của giảng viên" />
                  <NumberedItem num="4" label="Nguồn lực & điều kiện học tập" />
                  <NumberedItem num="5" label="Cấu trúc môn học" />
                </div>
              </div>

              <ImageCard
                src="/assets/giang_vien_nha_truong.jpg"
                alt="Giảng viên và nhà trường"
                width={400}
                imgHeight={320}
              />
            </div>

            {/* Research card */}
            <motion.div
              {...cardHover}
              style={{
                borderRadius: 16,
                backgroundColor: '#fffdf9',
                padding: 24,
                boxSizing: 'border-box',
                boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)',
                border: '1px solid #e5a100',
                borderTop: '2px solid #e5a100',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} color="#8b6914" strokeWidth={2} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#2c1e15',
                    letterSpacing: '1px',
                    fontFamily: "'Kantumruy', sans-serif",
                    textTransform: 'uppercase'
                  }}
                >
                  NGHIÊN CỨU & SỐ LIỆU THỰC TẾ
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#4a372c',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "'Kantumruy', sans-serif"
                }}
              >
                Khảo sát trên 397 sinh viên năm nhất tại Việt Nam phân định rõ 5 nhóm yếu tố tác động đến học tập: (1) Động lực nội tại của sinh viên đứng đầu; (2) Kiến thức & kỹ năng sư phạm của giảng viên; (3) Trình độ chuyên môn của giảng viên; (4) Nguồn lực & điều kiện học tập; (5) Cấu trúc môn học.
              </p>
              <a
                href="https://archive.conscientiabeam.com/index.php/61/article/view/636"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: '#8b6914',
                  textDecoration: 'underline',
                  fontFamily: "'Kantumruy', sans-serif",
                  wordBreak: 'break-all'
                }}
              >
                Nguồn: https://archive.conscientiabeam.com/index.php/61/article/view/636
              </a>
            </motion.div>
          </motion.section>

          {/* =================================================================
              SECTION 5.8 — MẠNG XÃ HỘI (Node 367:5587)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="MẠNG XÃ HỘI" />
            <SectionTitle>Mạng xã hội</SectionTitle>

            {/* 3-column layout (Node 367:5594) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '302px minmax(380px, 1.15fr) minmax(320px, 1fr)',
                gap: 32,
                alignItems: 'start',
                width: '100%'
              }}
            >
              {/* Column 1: Panel-Mockup (Node 386:1421) */}
              <motion.div
                {...cardHover}
                style={{
                  width: 302,
                  height: 386,
                  maxHeight: 386,
                  borderRadius: 16,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#fffdf9',
                  boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)'
                }}
              >
                <img
                  src="/assets/phone_mockup.png"
                  alt="Mô phỏng mạng xã hội"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>

              {/* Column 2: Panel-Overview (Node 386:1415) */}
              <motion.div
                {...cardHover}
                style={{
                  height: 386,
                  maxHeight: 386,
                  borderRadius: 16,
                  backgroundColor: '#fffdf9',
                  border: '1px solid #e7d3b8',
                  boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)',
                  padding: '28px 32px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
                  {/* Smartphone Icon Container (Node 386:1417) */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: '#fff3e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Smartphone size={22} color="#e5a100" strokeWidth={2} />
                  </div>

                  {/* Title (Node 386:1419) */}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#8b6914',
                      letterSpacing: '1px',
                      fontFamily: "'Kantumruy', sans-serif",
                      textTransform: 'uppercase'
                    }}
                  >
                    TỔNG QUAN
                  </span>

                  {/* Body Text (Node 386:1420) */}
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: '#4a372c',
                      lineHeight: 1.55,
                      margin: 0,
                      fontFamily: "'Kantumruy', sans-serif"
                    }}
                  >
                    Mạng xã hội mở ra cơ hội trao đổi nhanh và lập nhóm học tiện lợi, nhưng cũng là nguồn xao nhãng vô tận dẫn đến trì hoãn công việc. Bản thân công cụ không hoàn toàn có hại; mấu chốt nằm ở mục đích, thời gian và khả năng tự kiểm soát của chủ thể hành động.
                  </p>
                </div>
              </motion.div>

              {/* Column 3: Panel-Stats-Research (Node 386:1454) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  boxSizing: 'border-box'
                }}
              >
                {/* Stat-Card (Node 386:1455) */}
                <motion.div
                  {...cardHover}
                  style={{
                    width: '100%',
                    height: 188,
                    borderRadius: 16,
                    backgroundColor: '#fff8e8',
                    border: '1px solid #f0d7b6',
                    padding: 24,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 12
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#8b6914',
                      letterSpacing: '1px',
                      fontFamily: "'Kantumruy', sans-serif",
                      textTransform: 'uppercase'
                    }}
                  >
                    MỨC ĐỘ SỬ DỤNG TRUNG BÌNH
                  </span>

                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      color: '#2c1e15',
                      lineHeight: 1.2,
                      fontFamily: "'Kantumruy', sans-serif"
                    }}
                  >
                    4,2 giờ/ngày
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp size={16} color="#e5a100" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: '#8b6914',
                        fontFamily: "'Kantumruy', sans-serif"
                      }}
                    >
                      Tăng 15% so với năm ngoái
                    </span>
                  </div>
                </motion.div>

                {/* Research-Box (Node 386:1461) */}
                <motion.div
                  {...cardHover}
                  style={{
                    width: '100%',
                    minHeight: 226,
                    borderRadius: 16,
                    backgroundColor: '#fffdf9',
                    border: '1px solid #f0e6d6',
                    borderLeft: '4px solid #e5a100',
                    boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)',
                    padding: 24,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 16
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BookOpen size={16} color="#8b6914" strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#2c1e15',
                        letterSpacing: '1px',
                        fontFamily: "'Kantumruy', sans-serif",
                        textTransform: 'uppercase'
                      }}
                    >
                      NGHIÊN CỨU & SỐ LIỆU THỰC TẾ
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: '#4a372c',
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: "'Kantumruy', sans-serif"
                    }}
                  >
                    Nghiên cứu năm 2026 trên 300 sinh viên tại Hà Nội và TP.HCM ghi nhận thời gian sử dụng MXH trung bình lên tới 4,2 giờ/ngày. Mức độ sử dụng quá mức tỷ lệ thuận với lo âu, stress và tỷ lệ nghịch với GPA.
                  </p>

                  <a
                    href="https://www.tandfonline.com/doi/full/10.1080/02673843.2025.2608766"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: '#8b6914',
                      textDecoration: 'underline',
                      fontFamily: "'Kantumruy', sans-serif",
                      wordBreak: 'break-all'
                    }}
                  >
                    Nguồn: https://www.tandfonline.com/doi/full/10.1080/02673843.2025.2608766
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* =================================================================
              SECTION 5.9 — AI (Node 367:5609)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="TRÍ TUỆ NHÂN TẠO - AI" />
            <SectionTitle>Trí tuệ nhân tạo - AI</SectionTitle>

            <BodyText>
              Trí tuệ nhân tạo (AI) đang định hình lại toàn bộ phương pháp tiếp cận học tập. Sinh viên có thể sử dụng AI để giải thích khái niệm phức tạp, tóm tắt tài liệu, luyện ngoại ngữ hay sửa lỗi lập trình. Việc sử dụng thế nào thể hiện rõ nét tính độc lập và chủ động của ý thức.
            </BodyText>

            {/* Comparison cards */}
            <div style={{ display: 'flex', gap: 24 }}>
              <ComparisonCard
                variant="positive"
                title="Sử dụng chủ động (Sinh viên A)"
                description="Coi AI là trợ lý đắc lực để tóm tắt, lấy gợi ý dàn ý, sau đó tự mình đối chiếu, kiểm chứng thông tin, tự lập luận và thực hành."
              />
              <ComparisonCard
                variant="negative"
                title="Sử dụng thụ động (Sinh viên B)"
                description="Ủy thác hoàn toàn cho AI viết hộ bài, copy-paste 100% không qua chọn lọc, dễ gặp bẫy ảo tưởng (hallucination) của mô hình ngôn ngữ lớn."
              />
            </div>

            {/* Fact card */}
            <motion.div
              {...cardHover}
              style={{
                borderRadius: 16,
                backgroundColor: '#ffffff',
                border: '1px solid #f0d7b6',
                padding: 20,
                boxSizing: 'border-box',
                boxShadow: '0 6px 18px -10px rgba(0,0,0,0.03)'
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: '#4a372c',
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Kantumruy', sans-serif"
                }}
              >
                <strong>Thực tế tại Việt Nam:</strong> Trường Đại học FPT đã sớm tổ chức hướng dẫn tân sinh viên khai thác đúng đắn các công cụ AI trong học tập, đồng thời đặt ra quy định chặt chẽ về đạo đức sử dụng AI chống gian lận.
              </p>
            </motion.div>
          </motion.section>

          {/* =================================================================
              SECTION 5.10 — SỨC ÉP (Node 367:5634)
             ================================================================= */}
          <motion.section
            variants={fadeInSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            <SectionTag label="SỨC ÉP XÃ HỘI & VIỆC LÀM" />
            <SectionTitle>Sức ép xã hội và việc làm</SectionTitle>

            {/* Hero image with gradient overlay and caption */}
            <motion.div
              {...cardHover}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: 280 }}>
                <img
                  src="/assets/hero_anh_huong_xa_hoi.jpg"
                  alt="Sức ép xã hội và việc làm"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)'
                  }}
                />
                {/* Caption text over image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 32px'
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      color: '#ffffff',
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: "'Kantumruy', sans-serif"
                    }}
                  >
                    Yêu cầu khắt khe của thị trường lao động hiện đại về chứng chỉ, ngoại ngữ, kỹ năng công nghệ và kinh nghiệm thực tế buộc sinh viên phải tự định hình lại mục tiêu học tập: từ học đối phó thi cử sang tích lũy năng lực hành động thực tế.
                  </p>
                </div>
              </div>

              {/* Comparison cards below image */}
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  <ComparisonCard
                    variant="positive"
                    title="Chuyển hóa tích cực"
                    description="Sức ép việc làm chuyển thành động lực tự thân học tập thực chất, tích cực trau dồi kỹ năng mềm và ngoại ngữ đáp ứng nhu cầu thực tế."
                  />
                  <ComparisonCard
                    variant="negative"
                    title="Hệ lụy tiêu cực"
                    description="Chạy theo số lượng chứng chỉ một cách hình thức, làm đẹp CV rỗng tuếch, học theo xu hướng thời thượng mà bỏ quên năng lực cốt lõi."
                  />
                </div>
              </div>
            </motion.div>
          </motion.section>

        </div>

      {/* ===================================================================
          3. GRADIENT DIVIDER / TRANSITION
         =================================================================== */}
      <div
        style={{
          width: '100%',
          height: 248,
          background: 'linear-gradient(180deg, #fcfbf6 0%, #ffecc4 100%)',
          display: 'block'
        }}
      />

      {/* ===================================================================
          4. FOOTER
         =================================================================== */}
      <footer
        id="page-footer"
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
        {/* Subtle Watermark Logo Camind */}
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

        {/* Top Roll-to indicator */}
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
                fontFamily: "'Kantumruy', sans-serif",
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              roll to
            </span>
          </motion.div>
        </div>

        {/* Main Footer Content Row */}
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
          {/* Left Column */}
          <div style={{ maxWidth: 520 }}>
            {/* Thank you title with gradient */}
            <h3
              style={{
                fontSize: 32,
                fontWeight: 700,
                background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 8px 0',
                letterSpacing: '-0.5px'
              }}
            >
              Thank you for watching!
            </h3>

            {/* Author info */}
            <div
              style={{
                fontSize: 18,
                color: '#4e4e4e',
                marginBottom: 16
              }}
            >
              Created by: camind Team - Research & Presentation
            </div>

            {/* Copyright & Tagline */}
            <div>
              <div style={{ fontSize: 14, color: 'rgba(78, 78, 78, 0.7)' }}>
                © 2024 camind. All rights reserved.
              </div>
              <div style={{ fontSize: 14, color: 'rgba(78, 78, 78, 0.7)', marginTop: 4 }}>
                Empowering discovery through deep research and visual storytelling.
              </div>
            </div>
          </div>

          {/* Right Column: CTA Button (Node 367:6940) */}
          <div style={{ display: 'flex' }}>
            <FigmaCtaButton onClick={() => onNavClick('conclusion')} />
          </div>
        </div>
      </footer>

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
