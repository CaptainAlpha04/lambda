import React, { useRef, useEffect } from 'react'
import { 
  Heading1, Heading2, Heading3, List, ListOrdered, 
  TextIcon, Code, Minus, Image
} from 'lucide-react'

interface BlockTypeMenuProps {
  position: {
    top: number
    left: number
  }
  onSelect: (blockType: string) => void
  onClose: () => void
}

const BlockTypeMenu: React.FC<BlockTypeMenuProps> = ({ position, onSelect, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Handle outside clicks to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div 
      ref={menuRef}
      className="absolute bg-white border rounded-lg shadow-lg p-2 w-64 z-10"
      style={{ top: position.top + 100, left: position.left }}
    >
      <div className="text-sm font-medium text-gray-700 mb-2 p-2">
        BASIC BLOCKS
      </div>
      
      <div className="grid grid-cols-1 gap-1">
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('text')}
        >
          <TextIcon size={18} />
          <div>
            <div className="font-medium">Text</div>
            <div className="text-xs text-gray-500">Just start writing with plain text</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('heading1')}
        >
          <Heading1 size={18} />
          <div>
            <div className="font-medium">Heading 1</div>
            <div className="text-xs text-gray-500">Large section heading</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('heading2')}
        >
          <Heading2 size={18} />
          <div>
            <div className="font-medium">Heading 2</div>
            <div className="text-xs text-gray-500">Medium section heading</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('heading3')}
        >
          <Heading3 size={18} />
          <div>
            <div className="font-medium">Heading 3</div>
            <div className="text-xs text-gray-500">Small section heading</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('bulletList')}
        >
          <List size={18} />
          <div>
            <div className="font-medium">Bullet List</div>
            <div className="text-xs text-gray-500">Create a simple bullet list</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('numberedList')}
        >
          <ListOrdered size={18} />
          <div>
            <div className="font-medium">Numbered List</div>
            <div className="text-xs text-gray-500">Create a list with numbering</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('hr')}
        >
          <Minus size={18} />
          <div>
            <div className="font-medium">Divider</div>
            <div className="text-xs text-gray-500">Visually divide blocks with a line</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('code')}
        >
          <Code size={18} />
          <div>
            <div className="font-medium">Code</div>
            <div className="text-xs text-gray-500">Add a code snippet</div>
          </div>
        </button>
        
        <button 
          className="flex items-center gap-2 p-2 text-left hover:bg-slate-100 rounded-md"
          onClick={() => onSelect('image')}
        >
          <Image size={18} />
          <div>
            <div className="font-medium">Image</div>
            <div className="text-xs text-gray-500">Upload or embed an image</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default BlockTypeMenu