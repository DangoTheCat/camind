import React from 'react'
import { ArrowUp } from 'lucide-react'
import FigmaCtaButton from './FigmaCtaButton'

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
          <FigmaCtaButton onClick={onOpenReferences} />
        </div>
      </div>

      {/* Giant faint watermark */}
      <div className="footer-watermark-camind">camind</div>
    </footer>
  )
}
