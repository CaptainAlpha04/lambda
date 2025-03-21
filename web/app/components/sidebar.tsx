"use client"
import { useState } from "react"
import { Pen, Eraser, Square, Circle, Image, Undo, Redo } from "lucide-react"

const tools = [
  { name: "Pen", icon: Pen },
  { name: "Eraser", icon: Eraser },
  { name: "Square", icon: Square },
  { name: "Circle", icon: Circle },
  { name: "Image", icon: Image },
]

interface SidebarProps {
  setSelectedTool: (tool: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedTool }) => {
  const [activeTool, setActiveTool] = useState("Pen")

  const handleToolClick = (tool: string) => {
    setActiveTool(tool)
    setSelectedTool(tool)
  }

  return (
    <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 space-y-4">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`p-2 rounded-lg transition-colors ${
            activeTool === tool.name ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          title={tool.name}
          onClick={() => handleToolClick(tool.name)}
        >
          <tool.icon className="w-6 h-6 text-gray-600" />
        </button>
      ))}
      <div className="border-t border-gray-200 w-full my-2"></div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
        <Undo className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Redo">
        <Redo className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  )
}

export default Sidebar
