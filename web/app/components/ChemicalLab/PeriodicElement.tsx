"use client"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const PeriodicElement = ({
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
  