import React from 'react'
import { X, BookOpen, ExternalLink, Wrench } from 'lucide-react'
import { REFERENCES_DATA, RESEARCH_TOOLS } from '../data/websiteContent'

export default function ReferencesModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog references-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div>
            <span className="modal-badge">HỆ THỐNG DỮ LIỆU & PHƯƠNG PHÁP NGHIÊN CỨU</span>
            <h3>Tài Liệu Tham Khảo & Công Cụ Hỗ Trợ</h3>
          </div>
          <button onClick={onClose} className="btn-modal-close" aria-label="Đóng">
            <X size={20} />
          </button>
        </header>

        <div className="modal-body references-body">
          {/* Section 1: 9 References */}
          <section className="references-section">
            <div className="section-title-row">
              <BookOpen size={18} color="#D97706" />
              <h4>I. TÀI LIỆU THAM KHẢO CHÍNH THỐNG</h4>
            </div>

            <div className="references-list">
              {REFERENCES_DATA.map((item) => (
                <div key={item.id} className="ref-card">
                  <div className="ref-num">{item.id}</div>
                  <div className="ref-info">
                    <h5 className="ref-title">{item.title}</h5>
                    <p className="ref-pub">{item.publisher}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ref-link"
                      >
                        <ExternalLink size={13} />
                        <span>Truy cập tài liệu liên kết</span>
                      </a>
                    )}
                  </div>
                  {item.tag && <span className="ref-tag">{item.tag}</span>}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: 4 Research Tools */}
          <section className="tools-section">
            <div className="section-title-row">
              <Wrench size={18} color="#D97706" />
              <h4>II. CÔNG CỤ NGHIÊN CỨU & PHÂN TÍCH</h4>
            </div>

            <div className="tools-grid">
              {RESEARCH_TOOLS.map((tool) => (
                <div key={tool.name} className="tool-card">
                  <div className="tool-header">
                    <strong className="tool-name">{tool.name}</strong>
                    <span className="tool-role">{tool.role}</span>
                  </div>
                  <p className="tool-desc">{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="modal-footer">
          <button onClick={onClose} className="btn-modal-primary">
            Đóng Lại
          </button>
        </footer>
      </div>
    </div>
  )
}
