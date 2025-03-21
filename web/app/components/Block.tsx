import React, {useState, useEffect, useRef, forwardRef} from 'react'
import BubbleBar from './BubbleBar';

interface BlockProps {
  id: string;
  createNewBlock: () => void;
}

function Block({id, createNewBlock}: BlockProps) {
    const [contentTag, setContenTag] = useState<string>('p')
    const [bubbleBar, setBubbleBar] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const contentRef = useRef<HTMLDivElement>(null);

    type ValidHTMLTags = 'p' | 'h1' | 'h2' | 'h3' | 'div';
    const DynamicTag = contentTag as ValidHTMLTags;

    const handleFormat = (formatType: string, value?: string) => {
        if (formatType === 'formatBlock') {
            setContenTag(value!)
        }

        if (formatType === 'bold') {
            document.execCommand('bold')
        }

        if (formatType === 'italic') {
            document.execCommand('italic')
        }

        if (formatType === 'underline') {
            document.execCommand('underline')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            // Store cursor position/selection for potential content split
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            
            // Call function to create new block
            createNewBlock();
        }
    }

    return (
        <div className="relative mb-2">
            {bubbleBar && <BubbleBar onFormat={handleFormat} />}
            <DynamicTag 
                className='p-2 bg-slate-50 focus:bg-gray-100 min-h-10'
                contentEditable={true}
                ref={contentRef}
                onSelect={() => setBubbleBar(true)}
                onKeyDown={handleKeyDown}
                data-block-id={id}
                />
        </div>
    )
}

export default Block
