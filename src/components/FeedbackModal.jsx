import React, { useState } from 'react'
import { X, Star, Send, CheckCircle2 } from 'lucide-react'

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [category, setCategory] = useState('Nội dung triết học')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setComment('')
      onClose()
    }, 2000)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog feedback-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>Phiếu Khảo Sát & Góp Ý Đề Tài</h3>
          <button onClick={onClose} className="btn-modal-close" aria-label="Đóng">
            <X size={20} />
          </button>
        </header>

        {submitted ? (
          <div className="modal-body success-body">
            <CheckCircle2 size={54} color="#10B981" />
            <h4>Cảm ơn bạn đã đóng góp ý kiến!</h4>
            <p>Phản hồi của bạn đã được ghi nhận vào hệ thống nghiên cứu của nhóm Camind.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-group">
              <label>Đánh giá tổng quan chất lượng nội dung:</label>
              <div className="star-rating-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={26}
                      fill={(hoverRating || rating) >= star ? '#F59E0B' : 'none'}
                      color={(hoverRating || rating) >= star ? '#F59E0B' : '#CCCCCC'}
                    />
                  </button>
                ))}
                <span className="rating-text">
                  {rating === 5 && 'Xuất sắc'}
                  {rating === 4 && 'Rất tốt'}
                  {rating === 3 && 'Hài lòng'}
                  {rating === 2 && 'Cần cải thiện'}
                  {rating === 1 && 'Chưa hài lòng'}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Khía cạnh bạn muốn góp ý:</label>
              <div className="category-pill-row">
                {['Nội dung triết học', 'Liên hệ thực tiễn', 'Thiết kế trực quan', 'Số liệu khảo sát'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`cat-pill ${category === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Cảm nghĩ hoặc góp ý chi tiết của bạn:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Chia sẻ góc nhìn của bạn về mối quan hệ giữa điều kiện vật chất và ý thức học tập..."
                required
              />
            </div>

            <footer className="modal-footer">
              <button type="button" onClick={onClose} className="btn-modal-secondary">
                Hủy
              </button>
              <button type="submit" className="btn-modal-primary">
                <Send size={15} />
                <span>Gửi Góp Ý</span>
              </button>
            </footer>
          </form>
        )}
      </div>
    </div>
  )
}
