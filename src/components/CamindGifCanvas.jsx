import React, { useEffect, useRef } from 'react'
import omggif from 'omggif'

export default function CamindGifCanvas({ onComplete, isDark }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let animId
    let isCancelled = false

    async function loadAndPlay() {
      try {
        const resp = await fetch('/assets/camind_intro.gif')
        const arrayBuf = await resp.arrayBuffer()
        if (isCancelled) return

        const { GifReader } = omggif
        const gr = new GifReader(new Uint8Array(arrayBuf))
        const width = gr.width
        const height = gr.height

        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        const numFrames = gr.numFrames()
        const frameData = new Uint8ClampedArray(width * height * 4)

        let currentFrame = 0
        let lastFrameTime = performance.now()

        function renderNext() {
          if (isCancelled) return

          const now = performance.now()
          const delay = (gr.frameInfo(currentFrame).delay || 3) * 10

          if (now - lastFrameTime >= delay) {
            lastFrameTime = now

            // Clear buffer & canvas to transparent for disposal 2
            frameData.fill(0)
            gr.decodeAndBlitFrameRGBA(currentFrame, frameData)
            const imgData = new ImageData(frameData, width, height)
            ctx.putImageData(imgData, 0, 0)

            currentFrame++
            if (currentFrame >= numFrames) {
              // Frame 280 reached! GIF has finished 100% of its animation.
              // Do NOT loop! Keep the final pristine frame visible.
              if (onComplete) onComplete()
              return
            }
          }

          animId = requestAnimationFrame(renderNext)
        }

        animId = requestAnimationFrame(renderNext)
      } catch (err) {
        console.error('Error in CamindGifCanvas:', err)
      }
    }

    loadAndPlay()

    return () => {
      isCancelled = true
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        filter: isDark ? 'invert(1)' : 'invert(0)',
        transition: 'filter 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    />
  )
}
