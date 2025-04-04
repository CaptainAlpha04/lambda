"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"
import { generateResponse } from "../lib/gemini"
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion"
import { ChemicalSelector } from "./ChemicalLab/ChemicalSelector"
import { TestTube } from "./ChemicalLab/TestTube"
import { ParticleEffect } from "./ChemicalLab/ParticleEffect"
import { LabHelp } from "./ChemicalLab/LabHelp";
import { ExportData } from "./ChemicalLab/ExportData";
import { LabNotebook } from "./ChemicalLab/LabNotebook"
import { PeriodicElement } from "./ChemicalLab/PeriodicElement"
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
import { Chemical } from "./ChemicalLab/types"
import { Reaction } from "./ChemicalLab/types"
import { playSoundEffect } from "./ChemicalLab/utils"


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
                  <ExportData reactions={reactions} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export reaction data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <LabHelp />
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
              <div className="absolute inset-0 bg-[url('/textures/lab-table.jpeg')] opacity-10 bg-cover mix-blend-overlay" />

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
                      className="relative flex flex-col items-center"
                    >
                      <TestTube chemical={result} isResult />

                      {/* Reaction result label below the TestTube */}
                      <motion.div
                        className="mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white 
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

