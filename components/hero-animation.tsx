"use client"

import { useEffect, useRef } from "react"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Neural network nodes
    const nodes: { x: number; y: number; radius: number; vx: number; vy: number }[] = []
    const numNodes = 30
    const connections: { from: number; to: number; opacity: number }[] = []
    const maxDistance = 100

    // Create nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    // Create connections
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        connections.push({
          from: i,
          to: j,
          opacity: 0,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      connections.forEach((connection) => {
        const nodeA = nodes[connection.from]
        const nodeB = nodes[connection.to]
        const dx = nodeB.x - nodeA.x
        const dy = nodeB.y - nodeA.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          connection.opacity = 1 - distance / maxDistance
          ctx.beginPath()
          ctx.moveTo(nodeA.x, nodeA.y)
          ctx.lineTo(nodeB.x, nodeB.y)
          ctx.strokeStyle = `rgba(124, 58, 237, ${connection.opacity * 0.5})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        } else {
          connection.opacity = 0
        }
      })

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = index % 5 === 0 ? "#7C3AED" : "#000000"
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="relative w-full h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#D8B4FE] opacity-20 animate-pulse"></div>
      </div>
    </div>
  )
}
