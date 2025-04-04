"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { playSoundEffect } from "./utils"
import { Chemical } from "./types"

export const ChemicalSelector = ({ onSelect }: { onSelect: (name: string) => Promise<Chemical> }) => {
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
  