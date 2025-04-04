"use client"
import { BookOpen } from "lucide-react"
import { Reaction } from "./types"

export const LabNotebook = ({ reactions }: { reactions: Reaction[] }) => {
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