import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LienHeSection - Section 04: LIÊN HỆ THỰC TIỄN
 * Component 15 from Figma:
 * - Slide 0 (298:2175): Property 1=lien-he-01-gioi-thieu
 * - Slide 1 (298:2176): Property 1=lien-he-02-bang-so-sanh
 * - Slide 2 (298:2177): Property 1=lien-he-03-bai-hoc
 * - Variant 4 (298:2345): Property 1=Variant4
 *
 * Pixel-perfect translation conforming directly to Figma node geometry,
 * typography (Kantumruy / Kantumruy Pro), design tokens, and prototype reactions:
 * - Smart Animate 400ms ease-in-out ([0.42, 0, 0.58, 1])
 */

const TRANSITION_SPEC = {
  duration: 0.4,
  ease: [0.42, 0, 0.58, 1]
}

export default function LienHeSection({
  onNavigateToThinker,
  onScrollToTop
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  // Data for Slide 1 (lien-he-01-gioi-thieu)
  const materialImpacts = [
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
  ]

  // Data for Slide 2 (lien-he-02-bang-so-sanh)
  const comparisonScenarios = [
    {
      id: 'ai',
      title: 'Công cụ AI',
      proactive: {
        tag: 'CHỦ ĐỘNG (NĂNG ĐỘNG)',
        text: 'Dùng AI gợi ý dàn ý, phản biện → tự viết và kiểm chứng'
      },
      passive: {
        tag: 'THỤ ĐỘNG (Ỷ LẠI)',
        text: 'Đưa đề cho AI làm hộ → Copy/Paste nguyên văn → Không hiểu bài'
      }
    },
    {
      id: 'noise',
      title: 'Trọ KTX ồn ào',
      proactive: {
        tag: 'CHỦ ĐỘNG (NĂNG ĐỘNG)',
        text: 'Ra thư viện trường hoặc quán cà phê yên tĩnh để tập trung'
      },
      passive: {
        tag: 'THỤ ĐỘNG (Ỷ LẠI)',
        text: 'Đổ lỗi hoàn cảnh, nằm lướt mạng xã hội né tránh việc học'
      }
    },
    {
      id: 'finance',
      title: 'Khó khăn tài chính',
      proactive: {
        tag: 'CHỦ ĐỘNG (NĂNG ĐỘNG)',
        text: 'Sắp xếp thời gian săn học bổng, làm thêm đúng chuyên ngành'
      },
      passive: {
        tag: 'THỤ ĐỘNG (Ỷ LẠI)',
        text: 'Bi quan, bỏ giờ học, học đối phó chỉ mong đủ điểm qua môn'
      }
    }
  ]

  // Data for Slide 3 (lien-he-03-bai-hoc)
  const practicalLessons = [
    {
      title: 'THỪA NHẬN THỰC TẾ',
      desc: 'Đánh giá đúng nguồn lực bản thân để đặt mục tiêu phù hợp nhất'
    },
    {
      title: 'TỐI ƯU HOÁ NGUỒN LỰC',
      desc: 'Tận dụng tối đa thư viện trường, phần mềm miễn phí và bạn bè'
    },
    {
      title: 'LÀM CHỦ CÔNG NGHỆ',
      desc: 'Sử dụng AI như đòn bẩy, tuyệt đối không để AI tư duy thay thế'
    },
    {
      title: 'PHÁT HUY BẢN LĨNH',
      desc: 'Dùng kỷ luật cá nhân biến nghịch cảnh thành động lực rèn luyện'
    }
  ]

  // Slide-specific metadata
  const slideMeta = [
    {
      title: 'LIÊN HỆ LÝ LUẬN VỚI SINH VIÊN',
      subtitle: 'VẬN DỤNG THỰC TIỄN & NĂNG ĐỘNG CHỦ QUAN',
      quote: '"Điều kiện vật chất định hình nền tảng cho mọi nỗ lực học tập"'
    },
    {
      title: 'CHỦ ĐỘNG & THỤ ĐỘNG TRONG HỌC TẬP',
      subtitle: 'CÁCH ỨNG XỬ ĐỊNH HÌNH KẾT QUẢ HỌC TẬP',
      quote: '"Cùng hoàn cảnh — khác thái độ, khác kết quả"'
    },
    {
      title: 'TỪ LÝ LUẬN ĐẾN THỰC TIỄN',
      subtitle: 'PHÁT HUY NĂNG ĐỘNG CHỦ QUAN TRONG HỌC TẬP',
      quote: '"Chủ động thay đổi môi trường là bước đầu thay đổi kết quả"'
    }
  ]

  const currentMeta = slideMeta[activeSlide]

  return (
    <section
      id="section-lien-he"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#fdfcf7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '64px 0',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* 1440x900 Canvas Frame Container */}
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          minHeight: 772,
          padding: '0 160px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* ================= HEADER ROW (181:243) ================= */}
        <div
          style={{
            width: '100%',
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 28
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
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
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: '#6b7280'
              }}
            >
              MÁC - ĂNGGHEN - LÊNIN
            </span>
          </div>

          {/* Section Number Pill */}
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 100,
              padding: '4px 12px',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: '#6b7280'
              }}
            >
              SECTION 04
            </span>
          </div>
        </div>

        {/* ================= MAIN DYNAMIC SLIDE CONTENT ================= */}
        <div style={{ width: '100%', maxWidth: 1120, margin: '28px auto 0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={TRANSITION_SPEC}
              style={{ width: '100%' }}
            >
              {/* HERO META (Diamond + Titles) */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 920,
                  margin: '0 auto',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                {/* Diamond Symbol ◇ (181:251) */}
                <div
                  style={{
                    fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                    fontSize: 96,
                    fontWeight: 700,
                    lineHeight: '100%',
                    color: '#111827',
                    opacity: 0.1,
                    userSelect: 'none',
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ◇
                </div>

                {/* Title & Subtitle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                  <h2
                    style={{
                      fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                      fontSize: 40,
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '-1px',
                      margin: 0,
                      lineHeight: 1.2
                    }}
                  >
                    {currentMeta.title}
                  </h2>
                  <div
                    style={{
                      fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#6b7280',
                      letterSpacing: '1px'
                    }}
                  >
                    {currentMeta.subtitle}
                  </div>
                </div>
              </div>

              {/* SLIDE BODY */}
              <div style={{ width: '100%', maxWidth: 920, margin: '32px auto 0 auto', minHeight: 330 }}>
                {/* ---------------- SLIDE 0: lien-he-01-gioi-thieu ---------------- */}
                {activeSlide === 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 24,
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6b7280',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                      }}
                    >
                      4.1. VAI TRÒ CỦA ĐIỀU KIỆN VẬT CHẤT
                    </div>

                    {/* 3 Impact Cards Row (181:258) */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 20,
                        width: '100%'
                      }}
                    >
                      {materialImpacts.map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -3, borderColor: '#b7791f' }}
                          transition={{ duration: 0.2 }}
                          style={{
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #cccccc',
                            borderRadius: 8,
                            padding: '16px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 8,
                            minHeight: 103
                          }}
                        >
                          <h4
                            style={{
                              fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                              fontSize: 13,
                              fontWeight: 700,
                              color: '#000000',
                              margin: 0
                            }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                              fontSize: 11,
                              fontWeight: 400,
                              color: '#000000',
                              lineHeight: 1.45,
                              margin: 0
                            }}
                          >
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- SLIDE 1: lien-he-02-bang-so-sanh ---------------- */}
                {activeSlide === 1 && (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Subnote */}
                    <div
                      style={{
                        fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                        fontSize: 13,
                        fontWeight: 400,
                        color: '#736659',
                        textAlign: 'center'
                      }}
                    >
                      Cách ứng xử định hình kết quả học tập từ cùng một điểm xuất phát
                    </div>

                    {/* 3 Columns: AI, Noise, Finance */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 24,
                        width: '100%'
                      }}
                    >
                      {comparisonScenarios.map((scenario) => (
                        <div
                          key={scenario.id}
                          style={{
                            padding: '16px 20px',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {/* Column Title */}
                          <h3
                            style={{
                              fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                              fontSize: 18,
                              fontWeight: 700,
                              color: '#332b21',
                              lineHeight: '26px',
                              margin: '0 0 16px 0'
                            }}
                          >
                            {scenario.title}
                          </h3>

                          {/* Proactive Block */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                color: '#000000'
                              }}
                            >
                              {scenario.proactive.tag}
                            </span>
                            <p
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#000000',
                                lineHeight: '22px',
                                margin: 0
                              }}
                            >
                              {scenario.proactive.text}
                            </p>
                          </div>

                          {/* Section Divider (307:869) */}
                          <div
                            style={{
                              width: 40,
                              height: 1,
                              backgroundColor: '#c8bfb4',
                              margin: '18px 0'
                            }}
                          />

                          {/* Passive Block */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                color: '#000000'
                              }}
                            >
                              {scenario.passive.tag}
                            </span>
                            <p
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#000000',
                                lineHeight: '22px',
                                margin: 0
                              }}
                            >
                              {scenario.passive.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------- SLIDE 2: lien-he-03-bai-hoc ---------------- */}
                {activeSlide === 2 && (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* Box 4.3: Mô hình hai chiều (283:819) */}
                    <div
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        padding: '20px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#b7791f',
                          letterSpacing: '2px',
                          textTransform: 'uppercase'
                        }}
                      >
                        4.3. MÔ HÌNH HAI CHIỀU
                      </div>

                      {/* Direction 1: Khách quan */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div
                          style={{
                            fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#111827'
                          }}
                        >
                          TÁC ĐỘNG KHÁCH QUAN
                        </div>
                        <div
                          style={{
                            fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                            fontSize: 12,
                            fontWeight: 400,
                            color: '#374151',
                            lineHeight: 1.5
                          }}
                        >
                          Vật chất/Môi trường → Nhận thức → Thái độ → Hành vi học tập
                        </div>
                      </div>

                      {/* Line Divider */}
                      <div style={{ width: '100%', height: 1, backgroundColor: '#e5e7eb' }} />

                      {/* Direction 2: Chủ quan */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div
                          style={{
                            fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#111827'
                          }}
                        >
                          TỰ CHỦ CHỦ QUAN
                        </div>
                        <div
                          style={{
                            fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                            fontSize: 12,
                            fontWeight: 400,
                            color: '#374151',
                            lineHeight: 1.5
                          }}
                        >
                          Nỗ lực cá nhân → Hành động thực tiễn → Cải thiện, tối ưu hóa môi trường
                        </div>
                      </div>
                    </div>

                    {/* Section 4.4: Bài học thực tiễn */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div
                        style={{
                          fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#6b7280',
                          letterSpacing: '2px',
                          textTransform: 'uppercase'
                        }}
                      >
                        4.4. BÀI HỌC THỰC TIỄN CHO SINH VIÊN
                      </div>

                      {/* 4 Cards Grid (283:831) */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: 16,
                          width: '100%'
                        }}
                      >
                        {practicalLessons.map((lesson, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ y: -3, borderColor: '#b7791f' }}
                            transition={{ duration: 0.2 }}
                            style={{
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e5e7eb',
                              borderRadius: 6,
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 10,
                              boxSizing: 'border-box'
                            }}
                          >
                            <h4
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#b7791f',
                                margin: 0
                              }}
                            >
                              {lesson.title}
                            </h4>
                            <p
                              style={{
                                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                                fontSize: 11,
                                fontWeight: 400,
                                color: '#374151',
                                lineHeight: 1.4,
                                margin: 0
                              }}
                            >
                              {lesson.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ================= NAVIGATION ROW (According to Prototype Flow) ================= */}
              <div
                style={{
                  width: '100%',
                  maxWidth: 1120,
                  margin: '32px auto 0 auto',
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: activeSlide === 0 ? 'center' : 'space-between',
                  padding: '0 16px',
                  boxSizing: 'border-box'
                }}
              >
                {/* Back Button (Only on Slide 1 & 2) */}
                {activeSlide > 0 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, color: '#111827' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSlide((prev) => prev - 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: '#66594d',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    ← QUAY LẠI
                  </motion.button>
                )}

                {/* Forward / Restart Button */}
                {activeSlide < 2 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, color: '#111827' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSlide((prev) => prev + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: '#66594d',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    TIẾP THEO →
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, color: '#111827' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSlide(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                      fontSize: 13,
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: '#66594d',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    VỀ ĐẦU ↺
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= FOOTER DECOR (181:290 / 283:759 / 283:844) ================= */}
        <div
          style={{
            width: '100%',
            maxWidth: 1120,
            margin: '36px auto 0 auto',
            borderTop: '1px solid #e5e7eb',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          {/* Left: Quote & Section Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: '#6b7280'
              }}
            >
              {currentMeta.quote}
            </span>
            <span
              style={{
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: '#b7791f'
              }}
            >
              Liên hệ thực tiễn
            </span>

            {/* Quick slide jumper pills */}
            <div style={{ display: 'flex', gap: 6, marginLeft: 16, alignItems: 'center' }}>
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  style={{
                    width: idx === activeSlide ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    border: 'none',
                    backgroundColor: idx === activeSlide ? '#b7791f' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  title={`Trang ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Dot & Tagline */}
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
                fontFamily: "'Kantumruy Pro', 'Kantumruy', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: '1px',
                color: '#6b7280'
              }}
            >
              CINEMATIC THEORY VIEW
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
