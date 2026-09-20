import React from 'react'
import { ArrowUp, ArrowRight } from 'lucide-react'

export default function Footer({ onOpenReferences }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="camind-global-footer">
      <div className="footer-roll-top" onClick={scrollToTop} role="button" tabIndex={0}>
        <ArrowUp size={16} />
        <span>ROLL TO TOP</span>
      </div>

      <div className="footer-content-row">
        <div className="footer-left">
          <h2 className="footer-thank-title">Thank you for watching!</h2>
          <p className="footer-credits">Created by: camind Team - Research & Presentation</p>
          <p className="footer-copyright">
            &copy; 2024 camind. All rights reserved.<br />
            Empowering discovery through deep research and visual storytelling.
          </p>
        </div>

        <div className="footer-right">
          <button
            onClick={onOpenReferences}
            className="btn-view-references"
            title="Xem danh mục 9 tài liệu tham khảo và công cụ nghiên cứu"
          >
            <span>View References & Sources</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Giant faint watermark */}
      <div className="footer-watermark-camind">camind</div>
    </footer>
  )
}
