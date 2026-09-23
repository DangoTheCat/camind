import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import FigmaOpenHeader from './FigmaOpenHeader'
import ReferencesModal from './ReferencesModal'
import FigmaCtaButton from './FigmaCtaButton'

/**
 * EnvironmentConditionPage (3. Điều kiện và môi trường)
 * 100% Authentic Figma Wireframe - 4 (Node 298:3098) & screen-dieu-kien-moi-truong (Node 212:243)
 *
 * Exact Specs & Components:
 * - Header (Frame 8, Node 298:3099): FigmaOpenHeader with activeTab="history" (or "environment")
 * - Hero (Node 212:260):
 *     - Background: linear-gradient(141deg, rgba(255, 248, 240, 0.8) 0%, rgba(255, 243, 224, 0.95) 100%)
 *     - Subtitle line & text: "CHUYÊN ĐỀ PHÂN TÍCH TRIẾT HỌC MÁC - LÊNIN"
 *     - Main title: "Điều Kiện Vật Chất, Môi Trường Ảnh Hưởng Đến Sinh Viên Hiện Nay" (44px bold #2c1e15)
 *     - Meta: "Tác giả: Nhóm Nghiên Cứu Học Thuật ĐHQG" • "Chuyên đề: Mối quan hệ biện chứng giữa vật chất và ý thức"
 *     - Drag-up indicator (roll to): 2 chevrons + label
 * - Content Body (Node 212:270):
 *     - 5.1. Điều kiện kinh tế (Node 212:271)
 *         - Left: Narrative + "Các yếu tố cấu thành:" (5 items) + "Khi kinh tế ổn định:" (4 items)
 *         - Right: Image card (/assets/kinh_te.jpg)
 *         - Research card: Nghiên cứu tại ĐH Tôn Đức Thắng (Node 212:316)
 *         - Comparison cards: Sinh viên A (Chủ động) vs Sinh viên B (Thụ động) (Node 212:325)
 *     - 5.2. Thiết bị học tập (Node 212:334)
 *         - Left: Image card (/assets/thiet_bi.jpg)
 *         - Right: Narrative + Comparison cards: Sinh viên A (Sử dụng chủ động) vs Sinh viên B (Sử dụng thụ động)
 *     - 5.3. Internet và khả năng tiếp cận tài liệu (Node 212:357)
 *         - Narrative + Comparison cards: Mặt tích cực (Cơ hội) vs Mặt tiêu cực (Thách thức)
 *     - 5.4. Không gian học tập (Node 212:372)
 *         - Left: Narrative + "Hành động cải biến hoàn cảnh của sinh viên:"
 *         - Right: Image card (/assets/khong_gian.jpg)
 * - Rectangle 15 (Node 298:3108): Linear gradient transition to footer #fcfbf6 -> #ffecc4
 * - Footer (Frame 10, Node 298:3109):
 *     - Background #ffecc3 with camind logo watermark
 *     - "Thank you for watching!" & metadata
 *     - CTA button: "View References & Sources"
 *     - Scroll indicator (roll to)
 */

export default function EnvironmentConditionPage({
  activeTab = 'history',
  isControllerActive = false,
  onNavClick,
  onControllerClick,
  onLogoClick
}) {
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
        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        color: '#2c1e15'
      }}
    >
      {/* ===================================================================
          1. HEADER (Figma Frame 8 / Node 298:3099)
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
          onLogoClick={onLogoClick}
        />
      </div>

      {/* ===================================================================
          2. HERO SECTION (Node 212:260) - 100% Authentic Figma Wireframe - 4
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
        {/* Authentic High-Resolution Figma Hero Image (2880x998 Retina) with students photography & warm gradient */}
        <img
          src="/assets/hero_wf4.png"
          alt="Điều Kiện Vật Chất, Môi Trường Ảnh Hưởng Đến Sinh Viên Hiện Nay"
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
          Điều Kiện Vật Chất, Môi Trường Ảnh Hưởng Đến Sinh Viên Hiện Nay
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
            top: '88.8%',
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
          3. MAIN COLUMN CONTAINER (1280px Stage Centered)
         =================================================================== */}
      <div
        id="content-body"
        style={{
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '56px 20px',
          scrollMarginTop: 100,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 64
        }}
      >
          {/* -----------------------------------------------------------------
              5.1. ĐIỀU KIỆN KINH TẾ (Node 212:271)
             ----------------------------------------------------------------- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInSection}
            style={{ width: '100%' }}
          >
            {/* Badge Header (Node 212:272) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 30,
                  backgroundColor: '#e5a100',
                  borderRadius: 4
                }}
              />
              <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '1px'
                }}
              >
                ĐIỀU KIỆN KINH TẾ
              </span>
            </div>

            {/* Section Title */}
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#2c1e15',
                margin: '0 0 24px 0'
              }}
            >
              Điều kiện kinh tế
            </h2>

            {/* Two Column Layout: Left Content & Right Image */}
            <div className="env-grid-2col">
              {/* Left Column (832px) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: '1.6',
                    color: '#4a372c',
                    margin: 0
                  }}
                >
                  Điều kiện kinh tế là một trong những điều kiện vật chất có ảnh hưởng trực tiếp đến đời sống và hoạt động học tập của sinh viên. Các yếu tố kinh tế khách quan tạo ra những rào cản hoặc bệ phóng rõ rệt trong việc tích lũy tri thức.
                </p>

                {/* Box: Các yếu tố cấu thành (Node 212:281) */}
                <motion.div
                  {...cardHover}
                  style={{
                    backgroundColor: '#fffdf9',
                    border: '1px solid #e7d3b8',
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#2c1e15',
                      margin: '0 0 16px 0'
                    }}
                  >
                    Các yếu tố cấu thành:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Học phí hàng năm',
                      'Thu nhập của gia đình chu cấp',
                      'Chi phí sinh hoạt tại đô thị',
                      'Chi phí sách vở và thiết bị học tập chuyên ngành',
                      'Việc làm thêm ngoài giờ'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <path
                            d="M2.5 7.5L5.5 10.5L11.5 3.5"
                            stroke="#2c1e15"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: 14, color: '#4a372c' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Box: Khi kinh tế ổn định (Node 212:297) */}
                <motion.div
                  {...cardHover}
                  style={{
                    backgroundColor: '#fffdf9',
                    border: '1px solid #e7d3b8',
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#2c1e15',
                      margin: '0 0 16px 0'
                    }}
                  >
                    Khi kinh tế ổn định:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Dành nhiều thời gian hơn cho học tập',
                      'Có điều kiện trang bị thiết bị học tập xịn',
                      'Mua đầy đủ sách và tài liệu chính hãng',
                      'Tham gia các khóa học và hoạt động học thuật chuyên sâu'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                          <path
                            d="M2.5 7.5L5.5 10.5L11.5 3.5"
                            stroke="#2c1e15"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: 14, color: '#4a372c' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Image Card (Node 212:314) - Exact Figma 400x629 */}
              <motion.div
                className="env-image-card-5-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#fffdf9',
                  border: '1px solid #e7d3b8',
                  borderRadius: 16,
                  padding: 20,
                  boxSizing: 'border-box',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: 0
                }}
              >
                <img
                  src="/assets/kinh_te.jpg"
                  alt="Điều kiện kinh tế của sinh viên"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    borderRadius: 8,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </div>

            {/* Research Citation Box (Node 212:316) */}
            <motion.div
              {...cardHover}
              style={{
                backgroundColor: '#fffdf9',
                border: '1px solid #e5a100',
                borderRadius: 16,
                padding: 24,
                marginTop: 24,
                boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <BookOpen size={16} color="#8b6914" />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#2c1e15',
                    letterSpacing: '0.5px'
                  }}
                >
                  NGHIÊN CỨU & SỐ LIỆU THỰC TẾ
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: '1.6',
                  color: '#4a372c',
                  margin: '0 0 10px 0'
                }}
              >
                Nghiên cứu tại ĐH Tôn Đức Thắng: 86,9% sinh viên làm thêm một công việc với trung bình 21,85 giờ/tuần. Dù 59% sinh viên đánh giá việc làm thêm gây ảnh hưởng tiêu cực đến thời gian học và sức khỏe, kiểm định thực tế lại không tìm thấy bằng chứng cho thấy số lượng giờ làm tác động tiêu cực tuyến tính đến GPA của toàn mẫu.
              </p>
              <a
                href="https://www.researchgate.net/publication/310843746_STUDENT_PART-TIME_EMPLOYMENT"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 12,
                  color: '#8b6914',
                  textDecoration: 'underline',
                  wordBreak: 'break-all',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
              >
                Nguồn: https://www.researchgate.net/publication/310843746_STUDENT_PART-TIME_EMPLOYMENT
              </a>
            </motion.div>

            {/* Comparison Cards: Student A vs Student B (Node 212:325) */}
            <div className="env-grid-equal" style={{ marginTop: 24 }}>
              {/* Sinh viên A (Chủ động) */}
              <motion.div
                {...cardHover}
                style={{
                  backgroundColor: '#f3f8f0',
                  border: '1px solid #d7e6d1',
                  borderRadius: 16,
                  padding: 20
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                    Sinh viên A (Chủ động)
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                  Chủ động tìm học bổng, sắp xếp thời gian làm thêm hợp lý và kiên trì duy trì kế hoạch học tập nghiêm túc.
                </p>
              </motion.div>

              {/* Sinh viên B (Thụ động) */}
              <motion.div
                {...cardHover}
                style={{
                  backgroundColor: '#fff4e8',
                  border: '1px solid #f0d7b6',
                  borderRadius: 16,
                  padding: 20
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                    Sinh viên B (Thụ động)
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                  Cho rằng hoàn cảnh kinh tế quá khó khăn nên nản lòng, buông bỏ việc học tập và đổ lỗi hoàn toàn cho hoàn cảnh khách quan.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* -----------------------------------------------------------------
              5.2. THIẾT BỊ HỌC TẬP (Node 212:334)
             ----------------------------------------------------------------- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInSection}
            style={{ width: '100%' }}
          >
            {/* Badge Header (Node 212:335) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 30,
                  backgroundColor: '#e5a100',
                  borderRadius: 4
                }}
              />
              <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '1px'
                }}
              >
                THIẾT BỊ HỌC TẬP
              </span>
            </div>

            {/* Section Title */}
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#2c1e15',
                margin: '0 0 24px 0'
              }}
            >
              Thiết bị học tập
            </h2>

            {/* Two Column Layout: Left Image & Right Content */}
            <div className="env-grid-2col-reverse">
              {/* Left Column: Image Card (Node 212:342) - Exact Figma 380x235 */}
              <motion.div
                className="env-image-card-5-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#fffdf9',
                  border: '1px solid #e7d3b8',
                  borderRadius: 16,
                  padding: 20,
                  boxSizing: 'border-box',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: 0
                }}
              >
                <img
                  src="/assets/thiet_bi.jpg"
                  alt="Thiết bị học tập của sinh viên"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    borderRadius: 8,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>

              {/* Right Column: Narrative + Comparison (Node 212:344) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: '1.6',
                    color: '#4a372c',
                    margin: 0
                  }}
                >
                  Laptop, điện thoại thông minh và máy tính bảng trở thành những phương tiện không thể thiếu. Thiết bị học tập giúp sinh viên tiếp cận tài liệu, học trực tuyến, sử dụng phần mềm chuyên ngành, thực hiện dự án thực tế và kết nối tức thời với giảng viên, bạn bè.
                </p>

                {/* Sub comparison cards */}
                <div className="env-grid-equal">
                  {/* Sinh viên A (Sử dụng chủ động) */}
                  <motion.div
                    {...cardHover}
                    style={{
                      backgroundColor: '#f3f8f0',
                      border: '1px solid #d7e6d1',
                      borderRadius: 16,
                      padding: 20
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                        Sinh viên A (Sử dụng chủ động)
                      </span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                      Sử dụng laptop để lập trình, tra cứu tài liệu khoa học, thực hành đồ án và tham gia các khóa học chuyên sâu trực tuyến.
                    </p>
                  </motion.div>

                  {/* Sinh viên B (Sử dụng thụ động) */}
                  <motion.div
                    {...cardHover}
                    style={{
                      backgroundColor: '#fff4e8',
                      border: '1px solid #f0d7b6',
                      borderRadius: 16,
                      padding: 20
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                        Sinh viên B (Sử dụng thụ động)
                      </span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                      Chủ yếu sử dụng cấu hình máy mạnh để chơi game, lướt mạng xã hội tiêu khiển và xao nhãng khỏi nhiệm vụ học tập.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* -----------------------------------------------------------------
              5.3. INTERNET & TIẾP CẬN TÀI LIỆU (Node 212:357)
             ----------------------------------------------------------------- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInSection}
            style={{ width: '100%' }}
          >
            {/* Badge Header (Node 212:358) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 30,
                  backgroundColor: '#e5a100',
                  borderRadius: 4
                }}
              />
              <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '1px'
                }}
              >
                INTERNET & TIẾP CẬN TÀI LIỆU
              </span>
            </div>

            {/* Section Title */}
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#2c1e15',
                margin: '0 0 16px 0'
              }}
            >
              Internet và khả năng tiếp cận tài liệu
            </h2>

            {/* Narrative Paragraph */}
            <p
              style={{
                fontSize: 16,
                lineHeight: '1.6',
                color: '#4a372c',
                margin: '0 0 24px 0'
              }}
            >
              Sự phát triển của Internet đã phá vỡ ranh giới tiếp cận tri thức truyền thống (vốn chỉ bó hẹp trong giáo trình, giảng viên và thư viện giấy). Hiện nay, sinh viên có thể tiếp cận bài giảng quốc tế, hệ thống LMS, và các công cụ AI hỗ trợ nghiên cứu cực kỳ mạnh mẽ.
            </p>

            {/* Comparison Cards: Opportunity vs Challenge (Node 212:365) */}
            <div className="env-grid-equal">
              {/* Mặt tích cực (Cơ hội) */}
              <motion.div
                {...cardHover}
                style={{
                  backgroundColor: '#f3f8f0',
                  border: '1px solid #d7e6d1',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#2c1e15',
                    margin: '0 0 12px 0'
                  }}
                >
                  Mặt tích cực (Cơ hội)
                </h3>
                <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                  Mở rộng khả năng tiếp cận tri thức vô tận của nhân loại chỉ bằng vài cú click chuột; cá nhân hóa lộ trình tự học dễ dàng.
                </p>
              </motion.div>

              {/* Mặt tiêu cực (Thách thức) */}
              <motion.div
                {...cardHover}
                style={{
                  backgroundColor: '#fff4e8',
                  border: '1px solid #f0d7b6',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#2c1e15',
                    margin: '0 0 12px 0'
                  }}
                >
                  Mặt tiêu cực (Thách thức)
                </h3>
                <p style={{ fontSize: 14, lineHeight: '1.5', color: '#4a372c', margin: 0 }}>
                  Gây xao nhãng liên tục bởi thông báo, mạng xã hội; tạo thói quen phụ thuộc vào công cụ tìm kiếm thay vị tự mình suy luận độc lập.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* -----------------------------------------------------------------
              5.4. KHÔNG GIAN HỌC TẬP (Node 212:372)
             ----------------------------------------------------------------- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInSection}
            style={{ width: '100%', marginBottom: 40 }}
          >
            {/* Badge Header (Node 212:373) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  width: 20,
                  height: 30,
                  backgroundColor: '#e5a100',
                  borderRadius: 4
                }}
              />
              <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '1px'
                }}
              >
                KHÔNG GIAN HỌC TẬP
              </span>
            </div>

            {/* Section Title */}
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#2c1e15',
                margin: '0 0 24px 0'
              }}
            >
              Không gian học tập
            </h2>

            {/* Two Column Layout: Left Narrative & Right Image (Node 212:379) */}
            <div className="env-grid-2col">
              {/* Left Column (832px) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: '1.6',
                    color: '#4a372c',
                    margin: 0
                  }}
                >
                  Không gian học tập gồm thư viện, phòng tự học, ký túc xá hay nhà trọ. Ánh sáng, tiếng ồn, sự riêng tư tác động trực tiếp đến sự tập trung tinh thần. Tuy nhiên, theo tính độc lập tương đối của ý thức, chủ thể hoàn toàn có thể chủ động cải tạo hoặc lựa chọn môi trường phù hợp hơn.
                </p>

                {/* Box: Hành động cải biến hoàn cảnh (Node 212:382) */}
                <motion.div
                  {...cardHover}
                  style={{
                    backgroundColor: '#fffdf9',
                    border: '1px solid #e7d3b8',
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)'
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#2c1e15',
                      margin: '0 0 12px 0'
                    }}
                  >
                    Hành động cải biến hoàn cảnh của sinh viên:
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: '1.6', color: '#4a372c', margin: 0 }}>
                    Nếu nhà trọ quá ồn ào không thể tập trung học bài → Sinh viên nhận thức được trở ngại → Chủ động sắp xếp thời gian biểu → Di chuyển lên thư viện trường hoặc phòng tự học yên tĩnh để tối ưu hóa hiệu quả tiếp thu.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Image Card (Node 212:385) - Exact Figma 400x280 */}
              <motion.div
                className="env-image-card-5-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#fffdf9',
                  border: '1px solid #e7d3b8',
                  borderRadius: 16,
                  padding: 20,
                  boxSizing: 'border-box',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  height: '100%',
                  minHeight: 0
                }}
              >
                <img
                  src="/assets/khong_gian.jpg"
                  alt="Không gian học tập yên tĩnh"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    borderRadius: 8,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </div>
          </motion.section>
        </div>

      {/* ===================================================================
          3. GRADIENT DIVIDER / TRANSITION (Rectangle 15 / Node 298:3108)
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
          4. FOOTER (Frame 10 / Node 298:3109)
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
                letterSpacing: '-0.5px'
              }}
            >
              Thank you for watching!
            </h3>

            {/* Author info (Node 298:3128) */}
            <div
              style={{
                fontSize: 18,
                color: '#4e4e4e',
                marginBottom: 16
              }}
            >
              Created by: camind Team - Research & Presentation
            </div>

            {/* Copyright & Tagline (Node 298:3129) */}
            <div>
              <div style={{ fontSize: 14, color: 'rgba(78, 78, 78, 0.7)' }}>
                © 2024 camind. All rights reserved.
              </div>
              <div style={{ fontSize: 14, color: 'rgba(78, 78, 78, 0.7)', marginTop: 4 }}>
                Empowering discovery through deep research and visual storytelling.
              </div>
            </div>
          </div>

          {/* Right Column: CTA Button (Node 377:1314) */}
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
    </div>
  )
}
