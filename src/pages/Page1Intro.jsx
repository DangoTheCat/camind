import React from 'react'
import { ArrowRight, ChevronDown, BookOpen, Compass, Cpu, Users } from 'lucide-react'

export default function Page1Intro({ onNavigateNext }) {
  return (
    <div className="page-intro-wrapper">
      {/* Hero Section with misty garden background (Wireframe 2) */}
      <section className="intro-hero-section">
        <div className="intro-bg-image" style={{ backgroundImage: 'url(/assets/bg_intro.png)' }} />
        <div className="intro-hero-overlay" />

        {/* Decorative corner brackets matching Figma */}
        <div className="corner-bracket top-left" />
        <div className="corner-bracket bottom-left" />

        {/* Left scroll line indicator */}
        <div className="left-scroll-indicator">
          <span className="chevrons">&gt;&gt;</span>
          <span className="v-line" />
        </div>

        {/* Center Main Quote & Problem Statement */}
        <div className="intro-hero-content">
          <div className="intro-tag-pill">
            <span>KẾT QUẢ HỌC TẬP</span>
          </div>

          <h1 className="intro-main-quote">
            Kết quả học tập của sinh viên chịu sự tác động đan xen giữa điều kiện vật chất thực tế và tính chủ động của mỗi cá nhân
          </h1>

          <div className="intro-scroll-hint">
            <span>Cuộn xuống để khám phá các khái niệm cốt lõi</span>
            <ChevronDown size={18} className="bounce-arrow" />
          </div>
        </div>
      </section>

      {/* Detailed Problem Formulation & Core Concepts (From syllabus node 6:3) */}
      <section className="intro-details-container">
        <div className="container-inner">
          <div className="section-header-badge">
            <span className="badge-bar" />
            <span className="badge-title">1. MỞ ĐẦU – ĐẶT VẤN ĐỀ</span>
          </div>

          <h2 className="intro-section-heading">
            Khái niệm cốt lõi: Vật chất, Môi trường & Ý thức học tập
          </h2>

          <div className="concept-cards-grid">
            {/* Card 1: Điều kiện vật chất */}
            <div className="concept-card">
              <div className="concept-icon-wrap">
                <Compass size={24} color="#D97706" />
              </div>
              <h3>Điều kiện vật chất</h3>
              <p>
                Là tiền sinh hoạt, chỗ ở, laptop, Wi-Fi, sách vở, phòng học và thư viện trường. Các yếu tố này không trực tiếp ấn định năng lực nhưng tạo ra sự thuận lợi hoặc rào cản thực tế cho việc học.
              </p>
              <div className="card-pill-tag">Yếu tố nền tảng khách quan</div>
            </div>

            {/* Card 2: Môi trường học tập */}
            <div className="concept-card">
              <div className="concept-icon-wrap">
                <Users size={24} color="#D97706" />
              </div>
              <h3>Môi trường học tập</h3>
              <ul className="concept-list">
                <li><strong>Gia đình:</strong> Chu cấp tài chính, không khí sống, kỳ vọng bố mẹ.</li>
                <li><strong>Nhà trường:</strong> Giảng viên, bạn bè, chương trình đào tạo, LMS.</li>
                <li><strong>Xã hội:</strong> Thị trường việc làm, áp lực tuyển dụng, tâm lý FOMO.</li>
                <li><strong>Công nghệ:</strong> Internet, mạng xã hội, các công cụ Trí tuệ nhân tạo (AI).</li>
              </ul>
            </div>

            {/* Card 3: Ý thức & Thái độ */}
            <div className="concept-card">
              <div className="concept-icon-wrap">
                <BookOpen size={24} color="#D97706" />
              </div>
              <h3>Ý thức & Thái độ học tập</h3>
              <p>
                Hiểu rõ mục đích học tập để tích lũy năng lực thực tế cho tương lai. Nhận thức đúng đắn sẽ dẫn đến thái độ chủ động, kiên trì tự giác thay vì học đối phó hay ỷ lại hoàn cảnh.
              </p>
              <div className="card-pill-tag">Tính năng động chủ quan</div>
            </div>
          </div>

          {/* Central Question Callout Box */}
          <div className="central-question-box">
            <div className="q-label">1.6. CÂU HỎI TRUNG TÂM CỦA ĐỀ TÀI</div>
            <p className="q-text">
              &ldquo;Điều kiện vật chất và môi trường tác động như thế nào đến nhận thức, thái độ và hành vi học tập của sinh viên hiện nay?&rdquo;
            </p>
            <button onClick={onNavigateNext} className="btn-intro-proceed">
              <span>Khám Phá Cơ Sở Lý Luận Triết Học</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
