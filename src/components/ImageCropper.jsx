"use client"

import { useState, useRef } from "react"

function ImageCropper({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left - crop.x,
      y: e.clientY - rect.top - crop.y,
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const rect = e.currentTarget.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragStart.x
    const newY = e.clientY - rect.top - dragStart.y

    setCrop((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(newX, rect.width - prev.width)),
      y: Math.max(0, Math.min(newY, rect.height - prev.height)),
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCrop = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const image = imageRef.current

    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

    canvas.toBlob(
      (blob) => {
        onCropComplete(blob)
      },
      "image/jpeg",
      0.9,
    )
  }

  return (
    <div className="image-cropper-modal">
      <div className="cropper-content">
        <h3>Crop Your Image</h3>
        <div
          className="crop-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img ref={imageRef} src={imageSrc || "/placeholder.svg"} alt="Crop preview" className="crop-image" />
          <div
            className="crop-overlay"
            style={{
              left: crop.x,
              top: crop.y,
              width: crop.width,
              height: crop.height,
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="crop-handle"></div>
          </div>
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="cropper-actions">
          <button className="crop-btn" onClick={handleCrop}>
            ✂️ Crop Image
          </button>
          <button className="cancel-crop-btn" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
