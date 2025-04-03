import React, { useState } from 'react'
import { 
  Bold, Italic, Underline, Heading1, Link, ChevronDown, TextIcon, 
  Heading2, Heading3, List, AlignLeft, AlignCenter, AlignRight, 
  AlignJustify, Quote, Code, Strikethrough, ListOrdered
} from 'lucide-react'

interface BubbleBarProps {
  onFormat: (formatType: string, value?: string) => void;
}

function BubbleBar({ onFormat }: BubbleBarProps) {
  const [dropdownLabel, setDropdownLabel] = useState('Text');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlignDropdownOpen, setIsAlignDropdownOpen] = useState(false);

  const handleFormatClick = (formatType: string, value: string, label: string) => {
    onFormat(formatType, value);
    setDropdownLabel(label);
    setIsDropdownOpen(false);
  };

  return (
    <div className='bg-white border rounded-lg shadow-md p-2 flex gap-2 absolute top-[-14] left-60 transform -translate-x-1/2 -translate-y-1/2 flex-wrap w-auto font-poppins'
    onMouseDown={(e) => e.preventDefault()}>
      
      {/* Basic Formatting */}
      <div className="flex gap-1 border-r pr-1">
        {/* Bold */}
        <button 
          onClick={() => onFormat('bold')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Bold'
        >
          <Bold size={14} />
        </button>

        {/* Italics */}
        <button 
          onClick={() => onFormat('italic')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Italic'
        >
          <Italic size={14} />
        </button>

        {/* Underline */}
        <button 
          onClick={() => onFormat('underline')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Underline'
        >
          <Underline size={14} />
        </button>

        {/* Strikethrough */}
        <button 
          onClick={() => onFormat('strikethrough')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Strikethrough'
        >
          <Strikethrough size={14} />
        </button>
      </div>


      {/* Alignment Options */}
      <div className="flex gap-1 border-r pr-1">
        <button 
          onClick={() => onFormat('justifyLeft')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Align Left'
        >
          <AlignLeft size={14} />
        </button>
        <button 
          onClick={() => onFormat('justifyCenter')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Center'
        >
          <AlignCenter size={14} />
        </button>
        <button 
          onClick={() => onFormat('justifyRight')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Align Right'
        >
          <AlignRight size={14} />
        </button>
        <button 
          onClick={() => onFormat('justifyFull')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Justify'
        >
          <AlignJustify size={14} />
        </button>
      </div>

      {/* List Options */}
      <div className="flex gap-1 border-r pr-1">
        <button 
          onClick={() => onFormat('insertUnorderedList')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Bullet List'
        >
          <List size={14} />
        </button>
        <button 
          onClick={() => onFormat('insertOrderedList')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Numbered List'
        >
          <ListOrdered size={14} />
        </button>
      </div>

      {/* Special Formatting */}
      <div className="flex gap-1 border-r pr-1">
        <button 
          onClick={() => onFormat('formatBlock', 'blockquote')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Quote'
        >
          <Quote size={14} />
        </button>
        <button 
          onClick={() => onFormat('formatBlock', 'pre')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Code Block'
        >
          <Code size={14} />
        </button>
      </div>

      {/* dropdown styled for block format */}
      <div className="relative inline-block">
        <div
          className="border border-gray-300 rounded-md p-1 bg-slate-100 text-sm flex items-center justify-between w-32 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="ml-1">{dropdownLabel}</span>
          <ChevronDown size={14} className="ml-1" />
        </div>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full z-10">
            <ul className="py-1">
              <li 
                className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleFormatClick('formatBlock', 'p', 'Text')}
              >
                <TextIcon size={16} />
                Text
              </li>
              <li 
                className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2" 
                onClick={() => handleFormatClick('formatBlock', 'h1', 'Heading 1')}
              >
                <Heading1 size={16} />
                Heading 1
              </li>
              <li 
                className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleFormatClick('formatBlock', 'h2', 'Heading 2')}
              >
                <Heading2 size={16} />
                Heading 2
              </li>
              <li 
                className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleFormatClick('formatBlock', 'h3', 'Heading 3')}
              >
                <Heading3 size={16} />
                Heading 3
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Link Button */}
      <button 
          onClick={() => onFormat('createLink')}
          className='lg:tooltip hover:bg-slate-200 p-2 rounded-sm' data-tip='Create Link'
        >
          <Link size={14} />
        </button>

    </div>
  )
}

export default BubbleBar
