"use client"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import {
    Beaker,
    FlaskRoundIcon as Flask,
    Atom,
    Droplets,
    Zap,
    BookOpen,
    RotateCcw,
    Download,
    Info,
    AlertTriangle,
    Plus,
    Trash2,
  } from "lucide-react"
import { cn } from "@/lib/utils"
import { Chemical } from "./types"
import { useEffect } from "react"

export const TestTube = ({
    chemical,
    isResult = false,
    onRemove,
    draggable = false,
}: {
    chemical: Chemical
    isResult?: boolean
    onRemove?: () => void
    draggable?: boolean
}) => {
    const controls = useAnimation()
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Simulate 3D tilt effect on hover
    const handleHoverStart = () => {
        controls.start({
            rotateY: [0, 5, 0, -5, 0],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        })
    }

    const handleHoverEnd = () => {
        controls.stop()
        controls.start({ rotateY: 0 })
    }

    // Liquid fill animation
    useEffect(() => {
        controls.start({
            height: ["0%", "80%"],
            transition: { duration: 1.5, ease: "easeOut" },
        })
    }, [controls])

    return (
        <motion.div
            className={cn(
                "test-tube-container relative w-28 h-64 group z-10",
                draggable && "cursor-grab active:cursor-grabbing",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            style={{ x, y }}
            drag={draggable}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
            <div className="relative w-full h-full perspective-[1000px]">
                {/* 3D Test Tube Container */}
                <motion.div className="absolute inset-0 flex flex-col items-center" animate={controls}>
                    {/* Glass tube */}
                    <div className="relative w-full h-full">
                        {/* Tube neck */}
                        <div
                            className="absolute top-0 w-1/2 h-[15%] bg-gradient-to-b from-white/30 to-white/10 
                left-1/4 rounded-t-xl backdrop-blur-sm border-t border-l border-r border-white/20 z-10"
                        />

                        {/* Tube body */}
                        <div
                            className="absolute top-[15%] w-full h-[85%] rounded-b-2xl overflow-hidden
                bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm
                border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                            {/* Liquid */}
                            <motion.div
                                className={cn(
                                    "absolute bottom-0 w-full rounded-b-xl transition-all duration-300",
                                    isResult && "border-t-2 border-yellow-400/50",
                                )}
                                style={{
                                    backgroundColor: chemical.color,
                                    backgroundImage: `
                      linear-gradient(to right, 
                        ${chemical.color}80, 
                        ${chemical.color}, 
                        ${chemical.color}80
                      ),
                      linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))
                    `,
                                    boxShadow: `0 -5px 15px ${chemical.color}50 inset`,
                                    height: "0%",
                                }}
                                animate={controls}
                            />

                            {/* Glass reflections */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-white to-transparent" />
                                <div className="absolute top-0 left-[30%] w-[1px] h-[70%] bg-gradient-to-b from-white to-transparent" />
                            </div>
                        </div>

                        {/* Chemical label */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                            <div
                                className="bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full 
                  text-white text-xs font-mono shadow-lg border border-slate-700/50
                  flex items-center gap-1.5"
                            >
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chemical.color }} />
                                <span>{chemical.formula || chemical.name}</span>
                            </div>
                        </div>

                        {/* Remove button for selected chemicals */}
                        {onRemove && (
                            <motion.button
                                className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded-full p-1
                    opacity-0 group-hover:opacity-100 transition-opacity z-30"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onRemove}
                            >
                                <Trash2 className="w-3 h-3" />
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* Chemical Info Card */}
                <div
                    className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-72
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30
      pointer-events-none"
                >
                    <div
                        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md p-4 rounded-xl
        shadow-2xl border border-slate-700/50"
                    >
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-6 rounded-full" style={{ backgroundColor: chemical.color }} />
                            {chemical.name}
                        </h3>

                        <div className="space-y-2">
                            {chemical.formula && (
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400">
                                        <Atom className="w-4 h-4" />
                                    </span>
                                    <p className="text-sm text-gray-300">
                                        Formula: <span className="font-mono text-blue-300">{chemical.formula}</span>
                                    </p>
                                </div>
                            )}

                            {chemical.state_at_room_temp && (
                                <div className="flex items-center gap-2">
                                    <span className="text-green-400">
                                        <Droplets className="w-4 h-4" />
                                    </span>
                                    <p className="text-sm text-gray-300">State: {chemical.state_at_room_temp}</p>
                                </div>
                            )}

                            {chemical.safety_info && (
                                <div className="mt-3 p-3 bg-red-900/30 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-400">
                                        <AlertTriangle className="w-4 h-4" />
                                        <p className="text-sm font-medium">{chemical.safety_info}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}