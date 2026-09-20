import React from 'react'
import { MessageSquare, Gamepad2, Volume2, VolumeX, Image as ImageIcon } from 'lucide-react'

export default function Navbar({
  activeTab,
  onSelectTab,
  onOpenFeedback,
  onOpenIntroGif,
  soundEnabled,
  onToggleSound
}) {
  const tabs = [
    { id: 'intro', label: 'Giới thiệu' },
    { id: 'philosophy', label: 'Triết học cơ bản' },
    { id: 'environment', label: 'Điều kiện và môi trường' },
    { id: 'impact', label: 'Ảnh hưởng' }
  ]

  return (
    <header className="camind-torn-navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => onSelectTab('intro')} role="button" tabIndex={0}>
          <span className="brand-text">camind</span>
        </div>

        {/* 4 Main Navigation Tabs */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
              {activeTab === tab.id && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* View Original Intro GIF */}
          <button
            onClick={onOpenIntroGif}
            className="btn-intro-gif"
            title="Xem hoạt họa mở đầu gốc (Figma GIF)"
          >
            <ImageIcon size={15} />
            <span>Intro GIF</span>
          </button>

          {/* Feedback Button */}
          <button
            onClick={onOpenFeedback}
            className="btn-nav-feedback"
            title="Gửi phản hồi đóng góp cho đề tài"
          >
            Feedback
          </button>

          {/* Audio / Game controller icon */}
          <button
            onClick={onToggleSound}
            className={`btn-sound-controller ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            <Gamepad2 size={18} />
          </button>
        </div>
      </div>

      {/* Torn paper bottom jagged edge decoration */}
      <div className="torn-edge-svg-container">
        <svg viewBox="0 0 1440 18" fill="none" preserveAspectRatio="none" className="torn-edge-svg">
          <path
            d="M0 0H1440V6C1380 12 1320 4 1260 10C1200 16 1140 6 1080 11C1020 16 960 7 900 12C840 17 780 8 720 13C660 18 600 7 540 11C480 15 420 6 360 12C300 18 240 8 180 13C120 18 60 7 0 12V0Z"
            fill="#FAF6EE"
          />
        </svg>
      </div>
    </header>
  )
}
