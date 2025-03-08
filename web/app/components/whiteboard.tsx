"use client"
import type React from "react"
import { useRef, useEffect, useState } from "react"

interface WhiteboardProps {
  selectedTool: string
}

const Whiteboard: React.FC<WhiteboardProps> = ({ selectedTool }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startCoords, setStartCoords] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 64 - 320
      canvas.height = window.innerHeight - 64 
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setStartCoords({ x, y })

    if (selectedTool === "Square" || selectedTool === "Circle") {
      // Clear the canvas before drawing the shape
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (selectedTool === "Square") {
        ctx.strokeRect(x, y, 50, 50)
      } else if (selectedTool === "Circle") {
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, 2 * Math.PI)
        ctx.stroke()
      }
    } else {
      draw(e, true)
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setStartCoords(null)
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) ctx.beginPath()
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>, isStart = false) => {
    if (!isDrawing || selectedTool === "Square" || selectedTool === "Circle") return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = selectedTool === "Eraser" ? 10 : 2
    ctx.lineCap = "round"
    ctx.strokeStyle = selectedTool === "Eraser" ? "#fff" : "#000"

    if (selectedTool === "Pen") {
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (selectedTool === "Eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.globalCompositeOperation = "source-over"
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="flex-1 bg-white"
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={draw}
    />
  )
}

export default Whiteboard