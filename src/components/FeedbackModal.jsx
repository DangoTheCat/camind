import React, { useEffect } from 'react'

export const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdKnfvtqPkgH8OJxFuHoVQWWwklF2cTxqjmUhn1cTIFAHAm0Q/viewform'

export default function FeedbackModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer')
      if (onClose) onClose()
    }
  }, [isOpen, onClose])

  return null
}
