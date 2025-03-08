"use client";
import { useState } from 'react';
import { generateResponse } from "../lib/gemini";
import { motion, AnimatePresence } from 'framer-motion';

interface Chemical {
  name: string;
  color: string;
  formula?: string;
  state_at_room_temp?: string;
  safety_info?: string;
}

const ChemicalSelector = ({ onSelect }: { 
  onSelect: (name: string) => Promise<Chemical> 
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await onSelect(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg shadow-xl">
      <div className="flex gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter chemical name (e.g., Sodium Chloride)"
          className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-cyan-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          Add Chemical
        </button>
      </div>
    </form>
  );
};

interface TestTubeProps {
    chemical: Chemical;
    isResult?: boolean;
  }
  
  const TestTube = ({ chemical, isResult = false }: TestTubeProps) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="test-tube-container relative w-32 h-64 group"
    >
      <div className="relative w-full h-full">
        {/* Hover Card */}
        <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-64 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl 
            shadow-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-6 rounded-full" style={{ backgroundColor: chemical.color }} />
              {chemical.name}
            </h3>
            
            <div className="space-y-2">
              {chemical.formula && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">⚗️</span>
                  <p className="text-sm text-gray-300">
                    Formula: <span className="font-mono text-blue-300">{chemical.formula}</span>
                  </p>
                </div>
              )}
  
              {chemical.state_at_room_temp && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">🌡</span>
                  <p className="text-sm text-gray-300">
                    State: {chemical.state_at_room_temp}
                  </p>
                </div>
              )}
  
              {chemical.safety_info && (
                <div className="mt-3 p-3 bg-red-900/30 rounded-lg">
                  <div className="flex items-center gap-2 text-red-400">
                    <span className="text-lg">⚠️</span>
                    <p className="text-sm font-medium">{chemical.safety_info}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Test Tube Visualization */}
        <div
          className={`absolute bottom-0 w-full h-4/5 rounded-b-xl 
            opacity-90 transition-all duration-300 shadow-lg
            ${isResult ? 'border-4 border-yellow-400 animate-pulse' : ''}`}
          style={{ 
            backgroundColor: chemical.color,
            backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))`
          }}
        />
        <div className="tube-neck absolute top-0 w-1/3 h-1/5 bg-gray-200/30 
          left-1/3 rounded-t-xl backdrop-blur-sm"/>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-center 
          text-white font-bold bg-gray-800 px-3 py-1 rounded-full text-sm shadow-md">
          {chemical.formula || chemical.name}
        </span>
      </div>
    </motion.div>
  );

export default function ChemicalLab() {
  const [selectedChemicals, setSelectedChemicals] = useState<Chemical[]>([]);
  const [result, setResult] = useState<Chemical | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchChemicalData = async (chemicalName: string) => {
    const prompt = `Provide JSON data for ${chemicalName} with these properties: 
      common_name, chemical_formula, state_at_room_temp, color (hex code), safety_info. 
      Return in format: {name: string, formula: string, color: string, 
      state_at_room_temp: string, safety_info: string};`;

    try {
      const response = await generateResponse(prompt);
      const chemical = JSON.parse(response);
      setSelectedChemicals(prev => [...prev, chemical]);
      return chemical;
    } catch (error) {
      console.error('Error fetching chemical data:', error);
      return null;
    }
  };

  const performReaction = async () => {
    if (selectedChemicals.length < 1) return;
    
    setLoading(true);
    const chemicalsList = selectedChemicals.map(c => c.formula || c.name).join(', ');
    
    const reactionPrompt = `What is the product when ${chemicalsList} are mixed?
      Provide JSON response with: product_name, product_formula, 
      reaction_type, color (hex code), safety_info. Use format:
      {name: string, formula: string, color: string, safety_info: string};`;

    try {
      const reactionResult = await generateResponse(reactionPrompt);
      setResult(JSON.parse(reactionResult));
    } catch (error) {
      console.error('Error calculating reaction:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
          🧪 Virtual Chemistry Laboratory
        </h1>

        <ChemicalSelector onSelect={fetchChemicalData} />

        <div className="reaction-area min-h-[400px] bg-gray-900/50 rounded-xl p-8 mt-8 
          border border-gray-700 shadow-2xl">
          <div className="flex flex-wrap items-center gap-8 justify-center relative">
            <AnimatePresence>
              {selectedChemicals.map((chemical, index) => (
                <TestTube key={index} chemical={chemical} />
              ))}
            </AnimatePresence>

            <motion.button 
              onClick={performReaction}
              disabled={loading || selectedChemicals.length < 1}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                px-8 py-4 rounded-xl hover:scale-105 transition-transform
                disabled:opacity-50 disabled:hover:scale-100 shadow-xl
                flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white rounded-full animate-spin" />
                  Reacting...
                </>
              ) : (
                <>
                  <span className="text-xl">⚗️</span>
                  Mix Chemicals ({selectedChemicals.length})
                </>
              )}
            </motion.button>

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <TestTube chemical={result} isResult />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 
                  bg-green-500 text-white px-4 py-2 rounded-full mb-4 text-sm
                  font-bold animate-bounce">
                  Reaction Result!
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}