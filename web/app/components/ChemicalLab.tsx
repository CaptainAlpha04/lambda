"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"
import { generateResponse } from "../lib/gemini"
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion"
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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface Chemical {
  name: string
  color: string
  formula?: string
  state_at_room_temp?: string
  safety_info?: string
}

interface Reaction {
  chemicals: Chemical[]
  result: Chemical
  timestamp: number
}

// Sound effects
const playSoundEffect = (type: "add" | "mix" | "success" | "error") => {
  const sounds = {
    add: new Audio("/sounds/bubble.mp3"),
    mix: new Audio("/sounds/pour.mp3"),
    success: new Audio("/sounds/success.mp3"),
    error: new Audio("/sounds/error.mp3"),
  }

  try {
    sounds[type].volume = 0.3
    sounds[type].play()
  } catch (e) {
    console.log("Sound not loaded yet")
  }
}

// Particle effect component for reactions
const ParticleEffect = ({ active, color }: { active: boolean; color: string }) => {
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

// 3D Test Tube Component
const TestTube = ({
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

// Chemical Selector Component
const ChemicalSelector = ({ onSelect }: { onSelect: (name: string) => Promise<Chemical> }) => {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    "Sodium Chloride",
    "Hydrochloric Acid",
    "Sodium Hydroxide",
    "Copper Sulfate",
    "Potassium Permanganate",
    "Silver Nitrate",
    "Calcium Carbonate",
    "Magnesium",
    "Zinc",
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsLoading(true)
      await onSelect(input.trim())
      setIsLoading(false)
      setInput("")
      playSoundEffect("add")
    }
  }

  const handleSuggestionClick = async (suggestion: string) => {
    setIsLoading(true)
    await onSelect(suggestion)
    setIsLoading(false)
    playSoundEffect("add")
  }

  return (
    <div className="chemical-selector-container backdrop-blur-md bg-slate-900/70 rounded-xl p-6 border border-slate-800/50 shadow-xl">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter chemical name or formula..."
              className="w-full bg-slate-800/80 text-white px-6 py-3 rounded-full 
                border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                shadow-inner placeholder:text-slate-500"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-cyan-400/50 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full 
              hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </form>

      <div className="suggestions">
        <h3 className="text-xs font-semibold text-slate-400 mb-2">QUICK ADD:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="text-xs bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 
                px-3 py-1.5 rounded-full border border-slate-700/30 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Lab Notebook Component
const LabNotebook = ({ reactions }: { reactions: Reaction[] }) => {
  if (reactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <BookOpen className="w-12 h-12 mb-4 opacity-30" />
        <p>Your lab notebook is empty</p>
        <p className="text-sm">Perform reactions to record them here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {reactions.map((reaction, index) => (
        <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-white">Reaction #{reactions.length - index}</h3>
            <span className="text-xs text-slate-500">{new Date(reaction.timestamp).toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {reaction.chemicals.map((chem, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="w-6 h-6 rounded-full border border-slate-700/50 flex items-center justify-center"
                  style={{ backgroundColor: chem.color }}
                >
                  <span className="text-[8px] font-bold text-white mix-blend-difference">{i + 1}</span>
                </div>
                {i < reaction.chemicals.length - 1 && <span className="mx-1 text-slate-500">+</span>}
              </div>
            ))}
            <span className="mx-2 text-slate-500">=</span>
            <div
              className="w-8 h-8 rounded-full border-2 border-yellow-500/30"
              style={{ backgroundColor: reaction.result.color }}
            />
          </div>

          <div className="text-sm text-slate-300">
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Result:</span>
              <span className="font-medium">{reaction.result.name}</span>
            </div>
            {reaction.result.formula && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-slate-500">Formula:</span>
                <span className="font-mono text-cyan-300/80">{reaction.result.formula}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Periodic Table Element
const PeriodicElement = ({
  symbol,
  name,
  number,
  category,
}: {
  symbol: string
  name: string
  number: number
  category: string
}) => {
  // Color based on element category
  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      "alkali-metal": "from-red-500/20 to-red-600/20 border-red-500/30 hover:border-red-500/50",
      "alkaline-earth": "from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:border-orange-500/50",
      "transition-metal": "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 hover:border-yellow-500/50",
      "post-transition": "from-green-500/20 to-green-600/20 border-green-500/30 hover:border-green-500/50",
      metalloid: "from-teal-500/20 to-teal-600/20 border-teal-500/30 hover:border-teal-500/50",
      nonmetal: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:border-cyan-500/50",
      halogen: "from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-500/50",
      "noble-gas": "from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-500/50",
      lanthanide: "from-pink-500/20 to-pink-600/20 border-pink-500/30 hover:border-pink-500/50",
      actinide: "from-rose-500/20 to-rose-600/20 border-rose-500/30 hover:border-rose-500/50",
    }

    return colors[category] || "from-slate-500/20 to-slate-600/20 border-slate-500/30 hover:border-slate-500/50"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-md 
              bg-gradient-to-br ${getCategoryColor()} backdrop-blur-sm
              border transition-colors cursor-pointer`}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <span className="text-xs text-slate-500">{number}</span>
            <span className="text-lg font-bold text-white">{symbol}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-center">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-slate-400">{category.replace("-", " ")}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Main Component
export default function ChemicalLab() {
  const [selectedChemicals, setSelectedChemicals] = useState<Chemical[]>([])
  const [result, setResult] = useState<Chemical | null>(null)
  const [loading, setLoading] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [activeTab, setActiveTab] = useState("lab")
  const workbenchRef = useRef<HTMLDivElement>(null)

  // Fetch chemical data
  const fetchChemicalData = async (chemicalName: string) => {
    const prompt = `Provide JSON data for ${chemicalName} with these properties: 
      common_name, chemical_formula, state_at_room_temp, color (hex code), safety_info. 
      Return in format: {name: string, formula: string, color: string, 
      state_at_room_temp: string, safety_info: string}`

    try {
      const response = await generateResponse(prompt)
      const chemical = JSON.parse(response)
      setSelectedChemicals((prev) => [...prev, chemical])
      return chemical
    } catch (error) {
      console.error("Error fetching chemical data:", error)
      return null
    }
  }

  // Perform chemical reaction
  const performReaction = async () => {
    if (selectedChemicals.length < 1) return

    setLoading(true)
    const chemicalsList = selectedChemicals.map((c) => c.formula || c.name).join(", ")

    const reactionPrompt = `What is the product when ${chemicalsList} are mixed?
      Provide JSON response with: product_name, product_formula, 
      reaction_type, color (hex code), safety_info. Use format:
      {name: string, formula: string, color: string, safety_info: string}`

    try {
      playSoundEffect("mix")
      setShowParticles(true)

      // Delay to show the particle effect
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const reactionResult = await generateResponse(reactionPrompt)
      const parsedResult = JSON.parse(reactionResult)
      setResult(parsedResult)

      // Add to reaction history
      setReactions((prev) => [
        {
          chemicals: [...selectedChemicals],
          result: parsedResult,
          timestamp: Date.now(),
        },
        ...prev,
      ])

      playSoundEffect("success")
    } catch (error) {
      console.error("Error calculating reaction:", error)
      playSoundEffect("error")
    } finally {
      setLoading(false)
      setShowParticles(false)
    }
  }

  // Reset the lab
  const resetLab = () => {
    setSelectedChemicals([])
    setResult(null)
  }

  // Remove a chemical from the selection
  const removeChemical = (index: number) => {
    setSelectedChemicals((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Lab Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Flask className="w-6 h-6 text-cyan-400" />
              <span>Virtual Chemistry Lab</span>
            </h2>
            <p className="text-slate-400 text-sm">Mix chemicals and observe reactions in a safe environment</p>
          </div>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetLab}
                    className="bg-slate-800/50 border-slate-700/50 text-slate-300"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all chemicals</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-800/50 border-slate-700/50 text-slate-300"
                    onClick={() => setActiveTab(activeTab === "lab" ? "notebook" : "lab")}
                  >
                    {activeTab === "lab" ? (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Notebook
                      </>
                    ) : (
                      <>
                        <Beaker className="w-4 h-4 mr-2" />
                        Lab
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{activeTab === "lab" ? "View reaction history" : "Return to lab"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export reaction data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lab information and help</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="lab" className="mt-0">
            {/* Chemical Selector */}
            <ChemicalSelector onSelect={fetchChemicalData} />

            {/* Lab Workbench */}
            <div
              ref={workbenchRef}
              className="lab-workbench mt-8 min-h-[500px] rounded-xl p-8 relative
                bg-gradient-to-b from-slate-800/70 to-slate-900/70 backdrop-blur-md
                border border-slate-700/30 shadow-2xl overflow-hidden"
            >
              {/* 3D Lab Table Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0,transparent_70%)]" />
              <div className="absolute inset-0 bg-[url('/textures/lab-table.png')] opacity-10 bg-cover mix-blend-overlay" />

              {/* Grid Lines */}
              <div
                className="absolute inset-0 
                [background-size:50px_50px] 
                [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
                [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
              />

              {/* Reaction Area */}
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-8 justify-center">
                  <AnimatePresence>
                    {selectedChemicals.map((chemical, index) => (
                      <TestTube key={`selected-${index}`} chemical={chemical} onRemove={() => removeChemical(index)} />
                    ))}
                  </AnimatePresence>

                  {selectedChemicals.length > 0 && (
                    <motion.div
                      className="relative flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        onClick={performReaction}
                        disabled={loading || selectedChemicals.length < 1}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white 
                          px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed
                          shadow-lg shadow-cyan-500/10 border border-cyan-400/20
                          flex items-center gap-2 relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                            <span>Reacting...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Mix Chemicals ({selectedChemicals.length})</span>
                          </>
                        )}
                      </motion.button>

                      {/* Glow effect behind button */}
                      <div
                        className="absolute inset-0 -z-10 blur-xl opacity-30 
                        bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                      />
                    </motion.div>
                  )}

                  {/* Particle effects container */}
                  {showParticles && (
                    <ParticleEffect active={showParticles} color={selectedChemicals[0]?.color || "#00ffff"} />
                  )}

                  {/* Result display */}
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <TestTube chemical={result} isResult />
                      <motion.div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 
                          bg-gradient-to-r from-yellow-400 to-amber-500 text-white 
                          px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        initial={{ y: -10 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          repeatType: "reverse",
                        }}
                      >
                        Reaction Result!
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Empty state */}
              {selectedChemicals.length === 0 && !result && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <Beaker className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg">Add chemicals to begin experimenting</p>
                  <p className="text-sm">Use the selector above to add chemicals to your workbench</p>
                </div>
              )}
            </div>

            {/* Periodic Table Reference (Simplified) */}
            <div className="mt-8 bg-slate-900/70 backdrop-blur-md rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Atom className="w-5 h-5 text-cyan-400" />
                <span>Periodic Table Reference</span>
              </h3>

              <div className="grid grid-cols-9 gap-2 max-w-3xl mx-auto">
                <PeriodicElement symbol="H" name="Hydrogen" number={1} category="nonmetal" />
                <div className="col-span-7"></div>
                <PeriodicElement symbol="He" name="Helium" number={2} category="noble-gas" />

                <PeriodicElement symbol="Li" name="Lithium" number={3} category="alkali-metal" />
                <PeriodicElement symbol="Be" name="Beryllium" number={4} category="alkaline-earth" />
                <div className="col-span-5"></div>
                <PeriodicElement symbol="B" name="Boron" number={5} category="metalloid" />
                <PeriodicElement symbol="C" name="Carbon" number={6} category="nonmetal" />

                <PeriodicElement symbol="N" name="Nitrogen" number={7} category="nonmetal" />
                <PeriodicElement symbol="O" name="Oxygen" number={8} category="nonmetal" />
                <PeriodicElement symbol="F" name="Fluorine" number={9} category="halogen" />
                <PeriodicElement symbol="Ne" name="Neon" number={10} category="noble-gas" />

                <PeriodicElement symbol="Na" name="Sodium" number={11} category="alkali-metal" />
                <PeriodicElement symbol="Mg" name="Magnesium" number={12} category="alkaline-earth" />
                <div className="col-span-5"></div>
                <PeriodicElement symbol="Al" name="Aluminum" number={13} category="post-transition" />
                <PeriodicElement symbol="Si" name="Silicon" number={14} category="metalloid" />

                <PeriodicElement symbol="P" name="Phosphorus" number={15} category="nonmetal" />
                <PeriodicElement symbol="S" name="Sulfur" number={16} category="nonmetal" />
                <PeriodicElement symbol="Cl" name="Chlorine" number={17} category="halogen" />
                <PeriodicElement symbol="Ar" name="Argon" number={18} category="noble-gas" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notebook" className="mt-0">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Lab Notebook</span>
              </h3>

              <LabNotebook reactions={reactions} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Lab Safety Information */}
        <div className="mt-8 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-400 font-medium">Safety Information</h3>
              <p className="text-amber-200/70 text-sm">
                This is a simulated environment. Always follow proper safety protocols in real laboratory settings.
                Chemical reactions may behave differently in real-world conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

