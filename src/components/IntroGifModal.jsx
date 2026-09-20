import React from 'react'
import { X, Sparkles, RefreshCw } from 'lucide-react'

export default function IntroGifModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog gif-modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="modal-title-wrap">
            <Sparkles size={20} color="#E5A912" />
            <h3>Hoạt Họa Mở Đầu Gốc (Figma Desktop GIF)</h3>
          </div>
          <button onClick={onClose} className="btn-modal-close" aria-label="Đóng">
            <X size={20} />
          </button>
        </header>

        <div className="modal-body gif-body">
          <p className="gif-desc">
            Đây là tệp hoạt họa GIF nguyên bản <code>download (3) 1</code> được trích xuất trực tiếp từ bản thiết kế Figma của bạn:
          </p>

          <div className="gif-image-container">
            <img
              src="/assets/camind_intro.gif"
              alt="Camind Animated Logo from Figma"
              className="original-figma-gif"
            />
          </div>
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
