import React, { useState, useEffect } from 'react'
import { Menu, X, Gamepad2, Image as ImageIcon, MessageSquare } from 'lucide-react'

export default function Navbar({
  activeTab,
  onSelectTab,
  onNavClick,
  onOpenFeedback,
  onFeedbackClick,
  onOpenIntroGif,
  soundEnabled,
  isControllerActive,
  onToggleSound,
  onControllerClick,
  onLogoClick
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'intro', label: 'Giới thiệu' },
    { id: 'philosophy', label: 'Triết học cơ bản' },
    { id: 'environment', label: 'Điều kiện và môi trường' },
    { id: 'impact', label: 'Ảnh hưởng' }
  ]

  const isSoundOn = Boolean(soundEnabled ?? isControllerActive ?? false)

  // Bi-directional active tab check supporting both naming conventions
  const isTabActive = (tabId) => {
    if (!activeTab) return false
    if (activeTab === tabId) return true
    if (tabId === 'philosophy' && (activeTab === 'theory' || activeTab === 'philosophy')) return true
    if (tabId === 'theory' && (activeTab === 'theory' || activeTab === 'philosophy')) return true
    if ((tabId === 'environment' || tabId === 'history') && (activeTab === 'environment' || activeTab === 'history')) return true
    if ((tabId === 'impact' || tabId === 'influence') && (activeTab === 'impact' || activeTab === 'influence')) return true
    return false
  }

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Close mobile menu if window resizes to desktop width (> 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileMenuOpen])

  const handleSelectTab = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId)
    }
    if (onNavClick) {
      // Map philosophy -> theory and impact -> influence for App.jsx screen routing compatibility
      const navKey = tabId === 'philosophy' ? 'theory' : tabId === 'impact' ? 'influence' : tabId
      onNavClick(navKey)
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    } else if (onSelectTab) {
      onSelectTab('intro')
    } else if (onNavClick) {
      onNavClick('intro')
    }
    setIsMobileMenuOpen(false)
  }

  const handleOpenIntroGif = () => {
    if (onOpenIntroGif) onOpenIntroGif()
    setIsMobileMenuOpen(false)
  }

  const handleOpenFeedback = () => {
    if (onOpenFeedback) onOpenFeedback()
    if (onFeedbackClick) onFeedbackClick()
    setIsMobileMenuOpen(false)
  }

  const handleToggleSound = () => {
    if (onControllerClick) {
      onControllerClick(!isSoundOn)
    } else if (onNavClick) {
      onNavClick('game')
    } else if (onToggleSound) {
      onToggleSound()
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="camind-torn-navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div
          className="navbar-brand"
          onClick={handleLogoClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleLogoClick()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Về trang chủ Camind"
        >
          <span className="brand-text">camind</span>
        </div>

        {/* 4 Main Navigation Tabs (Desktop) */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const active = isTabActive(tab.id)
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`nav-tab-btn ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {tab.label}
                {active && <span className="nav-active-dot" />}
              </button>
            )
          })}
        </nav>

        {/* Action Controls (Desktop) */}
        <div className="navbar-actions">
          {/* View Original Intro GIF */}
          <button
            type="button"
            onClick={handleOpenIntroGif}
            className="btn-intro-gif"
            title="Xem hoạt họa mở đầu gốc (Figma GIF)"
            aria-label="Xem hoạt họa mở đầu gốc (Figma GIF)"
          >
            <ImageIcon size={15} />
            <span>Intro GIF</span>
          </button>

          {/* Feedback Button */}
          <button
            type="button"
            onClick={handleOpenFeedback}
            className="btn-nav-feedback"
            title="Gửi phản hồi đóng góp cho đề tài"
            aria-label="Gửi phản hồi đóng góp cho đề tài"
          >
            Feedback
          </button>

          {/* Audio / Game controller icon */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`btn-sound-controller ${isSoundOn ? 'sound-on' : 'sound-off'}`}
            title="Chơi mini-game Camind"
            aria-label="Chơi mini-game Camind"
          >
            <Gamepad2 size={18} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="btn-hamburger"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Torn paper bottom jagged edge decoration */}
      <div className="torn-edge-svg-container" aria-hidden="true">
        <svg viewBox="0 0 1440 18" fill="none" preserveAspectRatio="none" className="torn-edge-svg">
          <path
            d="M0 0H1440V6C1380 12 1320 4 1260 10C1200 16 1140 6 1080 11C1020 16 960 7 900 12C840 17 780 8 720 13C660 18 600 7 540 11C480 15 420 6 360 12C300 18 240 8 180 13C120 18 60 7 0 12V0Z"
            fill="#FAF6EE"
          />
        </svg>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="navbar-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Over Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal={isMobileMenuOpen}
        aria-label="Menu điều hướng di động"
      >
        <div className="mobile-drawer-header">
          <div
            className="navbar-brand"
            onClick={handleLogoClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleLogoClick()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Về trang chủ Camind"
          >
            <span className="brand-text">camind</span>
          </div>
          <button
            type="button"
            className="btn-drawer-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Tabs (Mobile) */}
        <nav className="mobile-nav-links" aria-label="Mobile Navigation Tabs">
          {tabs.map((tab) => {
            const active = isTabActive(tab.id)
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`mobile-nav-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="mobile-nav-label">{tab.label}</span>
                {active && <span className="mobile-active-indicator" />}
              </button>
            )
          })}
        </nav>

        {/* Action Controls (Mobile) */}
        <div className="mobile-drawer-actions">
          {/* Intro GIF */}
          <button
            type="button"
            onClick={handleOpenIntroGif}
            className="mobile-action-btn mobile-btn-intro"
            title="Xem hoạt họa mở đầu gốc (Figma GIF)"
            aria-label="Xem hoạt họa mở đầu gốc (Figma GIF)"
          >
            <ImageIcon size={18} />
            <span>Intro GIF</span>
          </button>

          {/* Feedback */}
          <button
            type="button"
            onClick={handleOpenFeedback}
            className="mobile-action-btn mobile-btn-feedback"
            title="Gửi phản hồi đóng góp cho đề tài"
            aria-label="Gửi phản hồi đóng góp cho đề tài"
          >
            <MessageSquare size={18} />
            <span>Feedback</span>
          </button>

          {/* Audio / Game controller toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`mobile-action-btn mobile-btn-sound ${isSoundOn ? 'sound-on' : 'sound-off'}`}
            title="Chơi mini-game Camind"
            aria-label="Chơi mini-game Camind"
          >
            <Gamepad2 size={18} />
            <span>Mini-game Camind</span>
          </button>
        </div>
      </div>
    </header>
  )
}
