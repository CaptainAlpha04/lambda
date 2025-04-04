"use client"
import { motion } from "framer-motion"

export const ParticleEffect = ({ active, color }: { active: boolean; color: string }) => {
    const particleCount = 30
    const particles = Array.from({ length: particleCount })
  
    if (!active) return null
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px 2px ${color}80`,
            }}
            initial={{
              x: "50%",
              y: "100%",
              opacity: 1,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
              scale: [1, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    )
  }