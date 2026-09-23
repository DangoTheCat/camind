import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  Laptop,
  Wifi,
  BookOpen,
  Home,
  Users,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ExternalLink,
  Search,
  MessageSquare,
  Presentation,
  Info
} from 'lucide-react'
import FigmaOpenHeader from './FigmaOpenHeader'

/**
 * Figma Component: ref-item-01 to ref-item-09 (Component Sets 408:1494 - 408:1812)
 * Exact Figma tokens:
 * - Default: background linear-gradient(180deg, #fffef4 0%, #fef2d7 100%), border 1.03px solid rgba(215, 180, 156, 0.31)
 * - Hover: background linear-gradient(180deg, #faf0de 0%, #f2dbb8 100%), boxShadow 0px 4px 16px rgba(215, 180, 156, 0.20)
 * - Transition: 0.15s easeOut dissolve
 */
function FigmaRefItemCard({ refItem }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        background: isHovered
          ? 'linear-gradient(180deg, #faf0de 0%, #f2dbb8 100%)'
          : 'linear-gradient(180deg, #fffef4 0%, #fef2d7 100%)',
        boxShadow: isHovered
          ? '0px 4px 16px rgba(215, 180, 156, 0.20)'
          : '0px 0px 0px rgba(0, 0, 0, 0)',
        y: isHovered ? -3 : 0
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        width: '100%',
        minHeight: refItem.hasLink ? 111.8 : 86.31,
        borderRadius: 16.44,
        border: '1.03px solid rgba(215, 180, 156, 0.31)',
        padding: '17.46px 20.55px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16.44
      }}
    >
      {/* number-block (Node I408:1496;408:1471: 36.98x36.98, radius: 8.22) */}
      <div
        style={{
          width: 36.98,
          height: 36.98,
          borderRadius: 8.22,
          backgroundColor: '#fdfbfa',
          border: '1.03px solid #fff1d7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 14.38,
          fontWeight: 700,
          color: '#8e6f5d'
        }}
      >
        {refItem.id}
      </div>

      {/* content-block */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6.16 }}>
        {/* title-row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}
        >
          <span
            style={{
              fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 14.38,
              fontWeight: 700,
              color: '#2c1e15',
              lineHeight: '140%'
            }}
          >
            {refItem.title}
          </span>
          {refItem.tag && (
            <span
              style={{
                fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 10.27,
                fontWeight: 700,
                color: refItem.tagColor || '#8e6f5d',
                backgroundColor: refItem.tagBg || '#f4ece1',
                border: '1px solid rgba(215, 180, 156, 0.5)',
                borderRadius: 4.11,
                padding: '4.11px 8.22px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {refItem.tag}
            </span>
          )}
        </div>

        {/* subtitle */}
        <span
          style={{
            fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: 12.33,
            color: '#4a372c',
            lineHeight: '150%'
          }}
        >
          {refItem.subtitle}
        </span>

        {/* link-row (Node I408:1634;408:1609) */}
        {refItem.hasLink && (
          <a
            href={refItem.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6.16,
              marginTop: 4,
              cursor: 'pointer',
              width: 'fit-content',
              textDecoration: 'none'
            }}
          >
            <ExternalLink size={12} color="#c28c33" />
            <span
              style={{
                fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 11.3,
                color: '#c28c33',
                textDecoration: 'underline'
              }}
            >
              Truy cập tài liệu liên kết
            </span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Figma Component: tool-card-Consensus, tool-card-ChatGPT, tool-card-Google Scholar, tool-card-Canva & PowerPoint
 * (Component Sets 414:1544, 414:1579, 414:1614, 414:1649)
 * Exact Figma tokens:
 * - Default: background linear-gradient(180deg, #fffef4 0%, #fef2d7 100%), border 1.03px solid rgba(215, 180, 156, 0.31)
 * - Hover: background linear-gradient(180deg, #faf0de 0%, #f2dbb8 100%), boxShadow 0px 4px 16px rgba(215, 180, 156, 0.20)
 * - Transition: 0.2s cubic-bezier(0.42, 0, 0.58, 1) dissolve
 */
function FigmaToolCard({ tool }) {
  const [isHovered, setIsHovered] = useState(false)
  const ToolIcon = tool.icon

  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      animate={{
        background: isHovered
          ? 'linear-gradient(180deg, #faf0de 0%, #f2dbb8 100%)'
          : 'linear-gradient(180deg, #fffef4 0%, #fef2d7 100%)',
        boxShadow: isHovered
          ? '0px 4px 16px rgba(215, 180, 156, 0.20)'
          : '0px 0px 0px rgba(0, 0, 0, 0)',
        y: isHovered ? -3 : 0
      }}
      transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
      style={{
        width: '100%',
        minHeight: 144.79,
        borderRadius: 16.44,
        border: '1.03px solid rgba(215, 180, 156, 0.31)',
        padding: 24.66,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 12.33,
        textDecoration: 'none',
        cursor: 'pointer'
      }}
    >
      {/* card-header (height: 41.09) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 41.09
        }}
      >
        {/* title-group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12.33 }}>
          {/* icon-container (41.09x41.09, radius: 8.22) */}
          <div
            style={{
              width: 41.09,
              height: 41.09,
              borderRadius: 8.22,
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8.22,
              boxSizing: 'border-box',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: 24.66,
                height: 24.66,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ToolIcon size={16.44} color="#8e6f5d" strokeWidth={2.05} />
            </div>
          </div>
          <span
            style={{
              fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 16.44,
              fontWeight: 700,
              color: '#2c1e15',
              lineHeight: 1
            }}
          >
            {tool.name}
          </span>
        </div>

        {/* tool-tag (height: 25.22, radius: 4.11, border: #eae5dc, text: 9.25 bold #8e6f5d) */}
        <div
          style={{
            height: 25.22,
            backgroundColor: '#ffffff',
            border: '1.03px solid #eae5dc',
            borderRadius: 4.11,
            padding: '4.11px 8.22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
        >
          <span
            style={{
              fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 9.25,
              fontWeight: 700,
              color: '#8e6f5d',
              lineHeight: 1
            }}
          >
            {tool.tag}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 12.33,
          fontWeight: 400,
          color: '#4a372c',
          lineHeight: '160%'
        }}
      >
        {tool.desc}
      </p>
    </motion.a>
  )
}

/**
 * ConclusionPage (Figma Wireframe - 7 / Node 367:6512)
 * Height: 4413px | Width: 1440px
 * Seamless vertical scroll:
 * 1. Frame 8: Global Header (y=0, h=80)
 * 2. screen-tong-ket-bien-chung (y=80, h=2569)
 * 3. tai-lieu-tham-khao-va-cong-cu (y=2649, h=1464)
 * 4. Frame 10: Footer Bottom Bar (y=4113, h=300)
 */
export default function ConclusionPage({
  activeTab = '',
  isControllerActive = false,
  onNavClick,
  onControllerClick,
  onLogoClick
}) {
  const pageContainerRef = useRef(null)

  // Ensure scroll is enabled for ConclusionPage
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = 0
    }
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  // 10 Material & Environmental factors from Node 212:569
  const tableData = [
    {
      icon: Wallet,
      factor: 'Kinh tế',
      positive: 'Có đầy đủ điều kiện trang bị tài liệu, học thuật',
      risk: 'Áp lực tài chính nặng nề, buộc phải làm thêm kiệt sức'
    },
    {
      icon: Laptop,
      factor: 'Thiết bị',
      positive: 'Tăng tốc độ tiếp cận, xử lý, nghiên cứu thông tin',
      risk: 'Dễ sa đà vào giải trí, game và phụ thuộc thiết bị'
    },
    {
      icon: Wifi,
      factor: 'Internet',
      positive: 'Mở ra kho tàng tri thức vô tận từ khắp thế giới',
      risk: 'Gây nhiễu thông tin, xao nhãng và quá tải tri thức'
    },
    {
      icon: BookOpen,
      factor: 'Không gian học',
      positive: 'Tăng khả năng tập trung sâu và năng suất học tập',
      risk: 'Tiếng ồn, thiếu sự riêng tư cản trở tiếp thu'
    },
    {
      icon: Home,
      factor: 'Gia đình',
      positive: 'Hỗ trợ tài chính, điểm tựa tinh thần vững chãi',
      risk: 'Kỳ vọng điểm số phi thực tế gây căng thẳng lớn'
    },
    {
      icon: Users,
      factor: 'Bạn bè',
      positive: 'Hỗ trợ học tập, rèn giũa cạnh tranh tích cực',
      risk: 'Kéo nhau sa ngã, lây lan tâm lý học đối phó'
    },
    {
      icon: GraduationCap,
      factor: 'Nhà trường',
      positive: 'Định hướng tri thức chuẩn mực, phương pháp tốt',
      risk: 'Cơ sở vật chất yếu kém gây cản trở thực hành'
    },
    {
      icon: MessageCircle,
      factor: 'Mạng xã hội',
      positive: 'Kênh kết nối, trao đổi học thuật nhanh chóng',
      risk: 'Hội chứng sợ bỏ lỡ (FOMO), phân tán chú ý'
    },
    {
      icon: Sparkles,
      factor: 'AI (Trí tuệ nhân tạo)',
      positive: 'Cá nhân hóa việc học, gợi ý giải quyết vấn đề',
      risk: 'Ỷ lại công cụ, không tự tư duy phản biện'
    },
    {
      icon: Briefcase,
      factor: 'Thị trường lao động',
      positive: 'Tạo động lực mạnh mẽ học thực chất để hành',
      risk: 'Chạy đua chứng chỉ rỗng tuếch theo phong trào'
    }
  ]

  // 6 Process Steps from Node 212:656
  const processSteps = [
    { step: 'Bước 01', label: 'Điều kiện vật chất & môi trường' },
    { step: 'Bước 02', label: 'Tạo ra khả năng & giới hạn khách quan' },
    { step: 'Bước 03', label: 'Sinh viên nhận thức & đánh giá hoàn cảnh' },
    { step: 'Bước 04', label: 'Hình thành thái độ học tập' },
    { step: 'Bước 05', label: 'Lựa chọn phương thức hành động' },
    { step: 'Bước 06', label: 'Kết quả học tập thực tế' }
  ]

  // 9 Academic References from Node 367:6561 (Component Sets 408:1494 - 408:1812)
  const referencesList = [
    {
      id: '01',
      title: 'Bộ Giáo dục và Đào tạo. Giáo trình Triết học Mác – Lênin.',
      subtitle: 'Nhà xuất bản Chính trị Quốc gia Sự thật.',
      tag: 'Giáo Trình Chuẩn',
      tagBg: '#f4ece1',
      tagColor: '#8e6f5d',
      hasLink: false
    },
    {
      id: '02',
      title: 'OECD. (2024). Students, Digital Devices and Success.',
      subtitle: 'OECD Education Policy Perspectives, No. 102. OECD Publications.',
      tag: 'Báo Cáo Toàn Cầu',
      tagBg: '#e2f0ec',
      tagColor: '#2aa399',
      hasLink: false
    },
    {
      id: '03',
      title: '[1] Lời tựa Góp phần phê phán Kinh tế chính trị học (1859).',
      subtitle: 'Tác phẩm kinh điển của K.Marx về mối quan hệ biện chứng giữa hạ tầng cơ sở và thượng tầng kiến trúc.',
      hasLink: false
    },
    {
      id: '04',
      title: '[2] Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán (1908).',
      subtitle: 'V.I.Lenin bảo vệ và phát triển thế giới quan duy vật khoa học trước các biến động lịch sử.',
      hasLink: false
    },
    {
      id: '05',
      title: 'STUDENT PART-TIME EMPLOYMENT CASE STUDY AT TON DUC THANG UNIVERSITY IN VIETNAM',
      subtitle: 'Nghiên cứu thực tiễn về ảnh hưởng của việc làm thêm đối với kết quả học tập của sinh viên.',
      hasLink: true,
      url: 'https://archive.conscientiabeam.com/index.php/61/article/view/636'
    },
    {
      id: '06',
      title: 'ScienceDirect: Family & Peer Support for First-Year Students',
      subtitle: 'Nghiên cứu về vai trò bệ đỡ tinh thần từ gia đình và bạn bè đối với sự thích ứng học tập năm nhất.',
      hasLink: true,
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S2050700321000358'
    },
    {
      id: '07',
      title: 'Conscientia Beam: 5 Groups of Factors Influencing Academic Performance',
      subtitle: 'Phân tích 5 nhóm yếu tố tác động trực tiếp và gián tiếp tới năng lực tiếp thu của người học.',
      hasLink: true,
      url: 'https://archive.conscientiabeam.com/index.php/61/article/view/636'
    },
    {
      id: '08',
      title: 'Taylor & Francis: Impact of Social Media on Students (Hanoi & HCMC)',
      subtitle: 'Khảo sát tác động hai chiều của mạng xã hội và hội chứng tâm lý FOMO lên hành vi sinh viên.',
      hasLink: true,
      url: 'https://www.tandfonline.com/doi/abs/10.1080/0267257X.2021.1996443'
    },
    {
      id: '09',
      title: 'Hoạt động hướng dẫn ứng dụng công cụ AI cho tân sinh viên',
      subtitle: 'Tài liệu phương pháp luận thực tiễn của Trường Đại học FPT về việc làm chủ AI trong học tập.',
      hasLink: true,
      url: 'https://daihoc.fpt.edu.vn/'
    }
  ]

  // 4 Research Tools from Node 367:6720 (Component Sets 414:1544 - 414:1649)
  const toolsList = [
    {
      name: 'Consensus',
      tag: 'Kiểm Chứng Học Thuật',
      desc: 'Hỗ trợ kiểm tra và đối chiếu chất lượng thông tin đầu vào từ các bài báo khoa học đã qua bình duyệt (peer-reviewed).',
      icon: Search,
      url: 'https://consensus.app'
    },
    {
      name: 'ChatGPT',
      tag: 'Trợ Lý Ý Tưởng',
      desc: 'Công cụ tìm ý tưởng, hệ thống hóa nội dung bài học và tối ưu hóa diễn đạt. Cần đối chiếu độc lập với nguồn tri thức chính thống.',
      icon: MessageCircle,
      url: 'https://chatgpt.com'
    },
    {
      name: 'Google Scholar',
      tag: 'Tra Cứu Nguồn',
      desc: 'Cơ sở dữ liệu khổng lồ phục vụ tra cứu nhanh các công trình nghiên cứu, luận văn và tài liệu học thuật chuyên sâu toàn cầu.',
      icon: BookOpen,
      url: 'https://scholar.google.com'
    },
    {
      name: 'Canva & PowerPoint',
      tag: 'Trực Quan Hóa',
      desc: 'Nền tảng thiết kế trực quan, hỗ trợ trình bày kết quả phân tích số liệu và báo cáo nghiên cứu khoa học một cách chuyên nghiệp.',
      icon: Presentation,
      url: 'https://www.canva.com'
    }
  ]

  return (
    <div
      ref={pageContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        backgroundColor: '#fdfcf9',
        fontFamily: "'Kantumruy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* ========================================================= */}
      {/* 1. GLOBAL NAVIGATION HEADER (Frame 8 / y=0, h=80)         */}
      {/* ========================================================= */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', width: '100%' }}>
        <FigmaOpenHeader
          activeTab={activeTab}
          isControllerActive={isControllerActive}
          onNavClick={onNavClick}
          onControllerClick={onControllerClick}
          onLogoClick={onLogoClick}
        />
      </div>

      {/* ========================================================= */}
      {/* 2. KHỐI TỔNG KẾT BIỆN CHỨNG (screen-tong-ket-bien-chung)   */}
      {/*    y = 80, height = 2569, width = 1440                    */}
      {/*    Background: linear-gradient(180deg, #fff8f0, #fdfcf8)  */}
      {/* ========================================================= */}
      <section
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #fff8f0 0%, #fdfcf8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            width: '100%',
            padding: '56px 80px 72px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 64
          }}
        >
          {/* 2.1 HERO HEADER (Hero-Screen-3 / Node 212:555) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 32,
              background: 'linear-gradient(141deg, #fff8f0cc 0%, #fff3e0f2 100%)',
              border: '1px solid #e7d3b8',
              boxShadow: '0 8px 30px rgba(229, 161, 0, 0.06)',
              padding: '72px 72px 56px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 24
            }}
          >
            {/* Subtle vintage logo watermark */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 280,
                height: 280,
                opacity: 0.05,
                backgroundImage: 'url(/assets/camind_logo_footer.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                pointerEvents: 'none'
              }}
            />

            {/* Kicker tag row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 60, height: 2, backgroundColor: '#d4941a' }} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                TỔNG KẾT BIỆN CHỨNG BIỂU ĐỒ & MÔ HÌNH
              </span>
              <div style={{ width: 60, height: 2, backgroundColor: '#d4941a' }} />
            </div>

            {/* Main Hero Title */}
            <h1
              style={{
                maxWidth: 1000,
                fontSize: 44,
                fontWeight: 700,
                lineHeight: '125%',
                color: '#2c1e15',
                margin: 0
              }}
            >
              Sự Thống Nhất Biện Chứng Giữa Điều Kiện Vật Chất Khách Quan Và Tính Chủ Động Ý Thức
            </h1>

            {/* Scroll Down Indicator */}
            <div
              onClick={() => scrollToSection('bang-tong-hop')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginTop: 8,
                padding: '8px 12px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ChevronDown size={18} color="#735940b2" />
                <ChevronDown size={18} color="#73594073" style={{ marginTop: -10 }} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: '#73594099',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}
              >
                roll to
              </span>
            </div>
          </motion.div>

          {/* 2.2 BẢNG TỔNG HỢP (5.11. Bang Tong Hop / Node 212:562) */}
          <motion.div
            id="bang-tong-hop"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}
          >
            {/* Section Sub-header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    backgroundColor: '#e5a100',
                    borderRadius: 4,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#ffffff' }}>MỤC</span>
                </div>
                <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#8b6914',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  NHÌN TỔNG THỂ - BẢNG TỔNG HỢP
                </span>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2c1e15', margin: 0 }}>
                Nhìn tổng thể - Bảng tổng hợp
              </h2>
            </div>

            {/* Table Container */}
            <div
              style={{
                backgroundColor: '#fffdf9',
                borderRadius: 16,
                border: '1px solid #e7d3b8',
                boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Table Header Row */}
              <div
                style={{
                  background: 'linear-gradient(90deg, #e5a100 0%, #c28c33 100%)',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 15
                }}
              >
                <div style={{ width: 240, flexShrink: 0 }}>Điều kiện vật chất & môi trường</div>
                <div style={{ flex: 1 }}>Tác động tích cực (Thời cơ)</div>
                <div style={{ flex: 1 }}>Nguy cơ tiêu cực (Thách thức)</div>
              </div>

              {/* 10 Data Rows */}
              {tableData.map((row, index) => {
                const IconComp = row.icon
                const isEven = index % 2 === 1
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: isEven ? '#f8f2ea' : '#fffdf9',
                      padding: '16px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      borderBottom: index < tableData.length - 1 ? '1px solid #e7d3b8' : 'none',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {/* Factor Column */}
                    <div
                      style={{
                        width: 240,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: '#fff4e8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <IconComp size={15} color="#8b6914" />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                        {row.factor}
                      </span>
                    </div>

                    {/* Positive Column */}
                    <div
                      style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#4a372c',
                        lineHeight: '145%'
                      }}
                    >
                      {row.positive}
                    </div>

                    {/* Risk Column */}
                    <div
                      style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#4a372c',
                        lineHeight: '145%'
                      }}
                    >
                      {row.risk}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Philosophy Takeaway Callout Box */}
            <div
              style={{
                backgroundColor: '#fffdf9',
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                borderLeft: '4px solid #e5a100',
                borderTop: '1px solid #e7d3b8',
                borderRight: '1px solid #e7d3b8',
                borderBottom: '1px solid #e7d3b8',
                padding: '24px',
                boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                fontSize: 15,
                lineHeight: '160%',
                color: '#2c1e15'
              }}
            >
              <span style={{ fontWeight: 700, color: '#2c1e15' }}>Ý nghĩa triết học: </span>
              <span>
                Không bao giờ tuyệt đối hóa "Điều kiện tốt → Chắc chắn học tốt" hay ngược lại "Khó khăn → Học kém".
                Triết học Mác - Lênin yêu cầu đánh giá toàn diện sự tác động biện chứng giữa điều kiện khách quan và
                tính chủ động sáng tạo của chủ thể con người.
              </span>
            </div>
          </motion.div>

          {/* 2.3 TỪ ĐIỀU KIỆN VẬT CHẤT ĐẾN THÁI ĐỘ (5.12. Thai Do Hoc Tap / Node 212:650) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}
          >
            {/* Centered Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    backgroundColor: '#e5a100',
                    borderRadius: 4,
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#ffffff' }}>MỤC</span>
                </div>
                <div style={{ width: 40, height: 1, backgroundColor: 'rgba(215, 180, 156, 0.5)' }} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#8b6914',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  TỪ ĐIỀU KIỆN VẬT CHẤT ĐẾN THÁI ĐỘ
                </span>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2c1e15', margin: 0, textAlign: 'center' }}>
                Từ điều kiện vật chất đến thái độ học tập
              </h2>
            </div>

            {/* 6 Process Steps Cards */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                width: '100%'
              }}
            >
              {processSteps.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    style={{
                      flex: 1,
                      minHeight: 130,
                      backgroundColor: '#fffdf9',
                      borderRadius: 16,
                      border: '1px solid #e7d3b8',
                      boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                      padding: '24px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: 8
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#8b6914' }}>{item.step}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#2c1e15',
                        lineHeight: '140%',
                        maxWidth: 130
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight size={18} color="#c28c33" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 2 AI Approach Comparison Cards */}
            <div style={{ display: 'flex', gap: 24, width: '100%' }}>
              {/* Cách 1: Tích cực */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#f3f8f0',
                  borderRadius: 16,
                  border: '1px solid #d7e6d1',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  padding: '24px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#5f8f4e' }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                    Sinh viên có AI (Cách 1)
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: '#4a372c', lineHeight: '150%' }}>
                  Nhận thức AI là công cụ tăng hiệu suất hỗ trợ → Chủ động đối chiếu sách giáo khoa → Thực hành tự làm
                  bài → Nâng cao năng lực.
                </p>
              </div>

              {/* Cách 2: Tiêu cực */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#fff4e8',
                  borderRadius: 16,
                  border: '1px solid #f0d7b6',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  padding: '24px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c98a3b' }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1e15' }}>
                    Sinh viên có AI (Cách 2)
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: '#4a372c', lineHeight: '150%' }}>
                  Nhận thức AI là công cụ làm thay bài tập trốn tránh suy nghĩ → Sao chép mù quáng → Phụ thuộc thụ động
                  → Thụt lùi tư duy.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2.4 KẾT LUẬN CHUNG (Section6_Conclusion / Node 212:702) */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              backgroundColor: '#f6eedf',
              borderRadius: 24,
              border: '1px solid #e7d3b8',
              boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
              padding: '48px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              width: '100%'
            }}
          >
            {/* Header Title with gold underline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2c1e15', margin: 0 }}>KẾT LUẬN CHUNG</h2>
              <div style={{ width: 60, height: 3, backgroundColor: '#e5a100', borderRadius: 2 }} />
            </div>

            {/* Summary paragraph */}
            <p style={{ margin: 0, fontSize: 16, lineHeight: '160%', color: '#4a372c' }}>
              Điều kiện vật chất và môi trường xã hội có tác động cực kỳ to lớn đến ý thức, thái độ học tập của sinh
              viên. Kinh tế, thiết bị công nghệ, mạng xã hội, bạn bè, giảng viên hay áp lực tương lai đều tạo ra những
              giới hạn khách quan. Tuy nhiên, hoàn cảnh tuyệt đối không quyết định một cách máy móc kết quả cuối cùng.
            </p>

            {/* 2 Highlighted Philosophy White Cards */}
            <div style={{ display: 'flex', gap: 32, width: '100%' }}>
              {/* Card 1 */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#fffdf9',
                  borderRadius: 16,
                  border: '1px solid #e7d3b8',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  padding: '24px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2c1e15', margin: 0 }}>
                  Tính biện chứng hai chiều:
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '160%', color: '#4a372c' }}>
                  Vật chất đóng vai trò quyết định, tạo dựng nền tảng hoàn cảnh thực tế. Ý thức phản ánh, đánh giá và lựa
                  chọn hành vi. Thông qua hoạt động thực tiễn tích cực, sinh viên cải biến chính môi trường và tương lai
                  của bản thân.
                </p>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#fffdf9',
                  borderRadius: 16,
                  border: '1px solid #e7d3b8',
                  boxShadow: '0 6px 18px -10px rgba(0, 0, 0, 0.0314)',
                  padding: '24px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2c1e15', margin: 0 }}>
                  Quan điểm triết học đúng đắn:
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '160%', color: '#4a372c' }}>
                  Tôn trọng sâu sắc hoàn cảnh khách quan để thiết lập kế hoạch tối ưu thực tế, đồng thời không ngừng khơi
                  dậy, phát huy tối đa tính chủ động, ý chí tự lực vươn lên của mỗi sinh viên.
                </p>
              </div>
            </div>

            {/* Golden Summary Ribbon */}
            <div
              style={{
                background: 'linear-gradient(90deg, #e5a100 0%, #c28c33 100%)',
                borderRadius: 16,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px -10px rgba(0, 0, 0, 0.0784)'
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#ffffff',
                  textAlign: 'center',
                  letterSpacing: '0.02em'
                }}
              >
                Vật chất → Ý thức → Hành động thực tiễn → Cải biến hoàn cảnh
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. KHỐI TÀI LIỆU THAM KHẢO & CÔNG CỤ                      */}
      {/*    (tai-lieu-tham-khao-va-cong-cu / Node 367:6514)        */}
      {/*    y = 2649, height = 1464, width = 1440                  */}
      {/*    Background: linear-gradient(180deg, #fdfcf9, #ffecc4)  */}
      {/* ========================================================= */}
      <section
        id="section-tai-lieu"
        style={{
          position: 'relative',
          width: '100%',
          background: 'linear-gradient(180deg, #fdfcf9 0%, #ffecc4 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* 3.1 Top Accent Border (6.16px height) */}
        <div
          style={{
            width: '100%',
            maxWidth: 1438,
            height: 6.16,
            background: 'linear-gradient(90deg, #ffb200 0%, #b3b600 100%)'
          }}
        />

        {/* 3.2 Vintage Technical Corner Brackets */}
        {/* Top-Left Corner */}
        <div
          style={{
            position: 'absolute',
            top: 41,
            left: 41,
            width: 41,
            height: 2,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 41,
            left: 41,
            width: 2,
            height: 41,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        {/* Top-Right Corner */}
        <div
          style={{
            position: 'absolute',
            top: 41,
            right: 41,
            width: 41,
            height: 2,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 41,
            right: 41,
            width: 2,
            height: 41,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        {/* Bottom-Left Corner */}
        <div
          style={{
            position: 'absolute',
            bottom: 41,
            left: 41,
            width: 41,
            height: 2,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 41,
            left: 41,
            width: 2,
            height: 41,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        {/* Bottom-Right Corner */}
        <div
          style={{
            position: 'absolute',
            bottom: 41,
            right: 41,
            width: 41,
            height: 2,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 41,
            right: 41,
            width: 2,
            height: 41,
            backgroundColor: '#d7b49cb2',
            pointerEvents: 'none'
          }}
        />

        {/* 3.3 Main Content Container (width: 1308.5px, padding: 65.75px) */}
        <div
          style={{
            maxWidth: 1440,
            width: '100%',
            padding: '65.75px 65.75px 44.66px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 49.3
          }}
        >
          {/* Header Row (Node 367:6541) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{
                  fontSize: 12.33,
                  fontWeight: 700,
                  color: '#8b6914',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase'
                }}
              >
                HỆ THỐNG DỮ LIỆU & PHƯƠNG PHÁP NGHIÊN CỨU
              </span>
              <h2 style={{ fontSize: 32.87, fontWeight: 700, color: '#2c1e15', margin: 0 }}>
                Tài Liệu Tham Khảo & Công Cụ Hỗ Trợ
              </h2>
            </div>

            {/* Category Pill */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1.03px solid #eae5dc',
                borderRadius: 20.55,
                padding: '8.22px 20.55px',
                fontSize: 12.33,
                fontWeight: 700,
                color: '#8e6f5d',
                letterSpacing: '0.5px'
              }}
            >
              Chuyên Đề Triết Học
            </div>
          </div>

          {/* 2-Column Grid (Node 367:6548) */}
          <div style={{ display: 'flex', gap: 49.3, alignItems: 'flex-start', width: '100%' }}>
            {/* LEFT COLUMN: I. TÀI LIỆU THAM KHẢO (Width: 766px) */}
            <div style={{ width: 766, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24.66 }}>
              {/* Column Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 33 }}>
                <BookOpen size={20} color="#8b6914" />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2c1e15', margin: 0, letterSpacing: '0.5px' }}>
                  I. TÀI LIỆU THAM KHẢO
                </h3>
              </div>

              {/* 9 Reference Cards List (Component Sets 408:1494 - 408:1812) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16.44 }}>
                {referencesList.map((refItem) => (
                  <FigmaRefItemCard key={refItem.id} refItem={refItem} />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: II. CÔNG CỤ NGHIÊN CỨU (Width: 493px) */}
            <div style={{ width: 493, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24.66 }}>
              {/* Column Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 33 }}>
                <Sparkles size={20} color="#8b6914" />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2c1e15', margin: 0, letterSpacing: '0.5px' }}>
                  II. CÔNG CỤ NGHIÊN CỨU
                </h3>
              </div>

              {/* 4 Tool Cards List (Component Sets 414:1544 - 414:1649) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16.44 }}>
                {toolsList.map((tool, index) => (
                  <FigmaToolCard key={index} tool={tool} />
                ))}
              </div>

              {/* Guidance Card: Lưu Ý Phương Pháp Luận (Node 367:6795) */}
              <motion.div
                whileHover={{
                  y: -2,
                  boxShadow: '0 8px 28px rgba(84, 72, 53, 0.45)',
                  borderColor: '#ffd900'
                }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%',
                  minHeight: 132.08,
                  backgroundColor: '#544835',
                  borderRadius: 16.44,
                  border: '1.03px solid #d7b49c',
                  padding: 20.55,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12.33,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8.22 }}>
                  <div
                    style={{
                      width: 24.66,
                      height: 24.66,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Info size={18} color="#ffb700" strokeWidth={2.05} />
                  </div>
                  <span style={{ fontSize: 12.33, fontWeight: 700, color: '#ffb700' }}>
                    Lưu Ý Phương Pháp Luận
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 11.3, color: '#ffffff', lineHeight: '160%', opacity: 0.95 }}>
                  Tính chủ động trong học tập đòi hỏi sinh viên biết chọn lọc, đối chiếu chéo các thông tin từ AI (ChatGPT)
                  với các nguồn học thuật uy tín để tránh tối đa các ngụy biện duy ý chí hoặc sai lệch dữ liệu thực tế.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Footer Section (Node 367:6808) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(215, 180, 156, 0.3)',
              paddingTop: 24.66,
              fontSize: 11.3,
              color: '#8e6f5d',
              width: '100%'
            }}
          >
            <span>Nghiên cứu về mối quan hệ giữa Môi trường vật chất và Tính năng động chủ quan của Sinh viên</span>
            <span style={{ fontWeight: 700 }}>© 2026 Nhóm Nghiên Cứu Triết Học Biện Chứng</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. KHỐI CHÂN TRANG FOOTER (Frame 10 / Node 367:6811)       */}
      {/*    y = 4113, height = 300, width = 1440                   */}
      {/*    Background: #ffecc3 (hòa quyện đáy Khối 3)              */}
      {/* ========================================================= */}
      <footer
        style={{
          position: 'relative',
          width: '100%',
          height: 300,
          backgroundColor: '#ffecc3',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Roll to Top Floating Button (Node 367:11143 / x=80, y=-7) */}
        <div
          onClick={scrollToTop}
          style={{
            position: 'absolute',
            top: 16,
            left: 80,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            zIndex: 10,
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronUp size={16} color="#735940b2" />
            <ChevronUp size={16} color="#73594073" style={{ marginTop: -8 }} />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: '#73594099',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            roll to
          </span>
        </div>

        {/* Content Box (x=80, y=74) */}
        <div
          style={{
            maxWidth: 1440,
            width: '100%',
            padding: '0 80px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Left info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Title & Author */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  margin: 0,
                  background: 'linear-gradient(180deg, #ffb200 0%, #b3b600 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '110%'
                }}
              >
                Thank you for watching!
              </h2>
              <span style={{ fontSize: 18, fontWeight: 400, color: '#4e4e4e' }}>
                Created by: camind Team - Research & Presentation
              </span>
            </div>

            {/* Copyright & Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 14, color: '#4e4e4e', opacity: 0.6 }}>
                © 2024 camind. All rights reserved.
              </span>
              <span style={{ fontSize: 14, color: '#4e4e4e', opacity: 0.6 }}>
                Empowering discovery through deep research and visual storytelling.
              </span>
            </div>
          </div>
        </div>

        {/* Giant Watermark Logo on bottom right (Node 367:6813 / w: 755.3, h: 147.57, x: 661, y: 145) */}
        <img
          src="/assets/camind_logo_footer.svg"
          alt="camind logo watermark"
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 755,
            height: 148,
            opacity: 0.28,
            pointerEvents: 'none',
            zIndex: 1,
            objectFit: 'contain',
            objectPosition: 'right bottom'
          }}
        />
      </footer>
    </div>
  )
}
