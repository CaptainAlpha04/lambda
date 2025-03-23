import React, {useState, useEffect, useRef, forwardRef} from 'react'
import BubbleBar from './BubbleBar' 

interface BlockProps {
    id: string 
    createNewBlock: (initialContent?: string) => void 
    deletePreviousBlock: () => void 
    initialContent?: string 
}

function Block({id, createNewBlock, deletePreviousBlock, initialContent = ''}: BlockProps) {
    const [contentTag, setContenTag] = useState<string>('p')
    const [bubbleBar, setBubbleBar] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [isBubbleBarHovered, setIsBubbleBarHovered] = useState<boolean>(false)
    const contentRef = useRef<HTMLDivElement>(null) 
    const bubbleBarRef = useRef<HTMLDivElement>(null) 

    type ValidHTMLTags = 'p' | 'h1' | 'h2' | 'h3' | 'div' 
    const DynamicTag = contentTag as ValidHTMLTags 

    useEffect(() => {
        contentRef.current!.innerHTML = `<${contentTag}>${content}</${contentTag}>`
    }, [contentTag, content])
    
    useEffect(() => {
        if (initialContent) {
            contentRef.current!.innerHTML = initialContent
        }
    }, [])

    const handleFormat = (formatType: string, value?: string) => {
        if (formatType === 'formatBlock') {
            setContent(contentRef.current!.innerHTML)
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
            e.preventDefault() 
            
            // if the block is empty do nothing
            if (!contentRef.current?.textContent) {
                return 
            }

            // if the block is a list item, go to the next line and create a new list item
            if (contentTag === 'ol' || contentTag === 'ul') {
                document.execCommand('insertHTML', false, '<li><br/></li>') 
                return 
            }

            // Store cursor position/selection for potential content split
            const selection = window.getSelection() 
            const range = selection?.getRangeAt(0) 

            // Split the content into two block
            const content = contentRef.current.innerHTML 
            const contentBeforeCaret = content.substring(0, range?.startOffset!) 
            const contentAfterCaret = content.substring(range?.startOffset!) 

            // Update the current block with the content before the caret
            contentRef.current.innerHTML = contentBeforeCaret 

            if (contentAfterCaret) {
                // Create a new block with the content after the caret
                initialContent = contentAfterCaret 
                createNewBlock(initialContent) 
                return 
            }
            
            // Call function to create new block
            createNewBlock() 
        }


        // if the user presses backspace on an empty block, delete the block and focus on the previous one
        if (e.key === 'Backspace' && !contentRef.current?.textContent) {
            e.preventDefault() 
            deletePreviousBlock() 
        }
    }

    // Function to manage bubbleBar
    const hideBubbleBar = () => {
        if (!isBubbleBarHovered) {
            setBubbleBar(false) 
        }
    }

    return (
        <div className="relative mb-2">
            {bubbleBar && (
                <div 
                    ref={bubbleBarRef}
                    onMouseEnter={() => setIsBubbleBarHovered(true)}
                    onMouseLeave={() => setIsBubbleBarHovered(false)}
                >
                    <BubbleBar onFormat={handleFormat} />
                </div>
            )}
            <DynamicTag 
                className='p-2 focus:bg-slate-50 min-h-10'
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={contentRef}
                onKeyDown={handleKeyDown}
                onSelect={() => {
                    const selection = window.getSelection() 
                    if (selection && selection.toString().length > 0) {
                        setBubbleBar(true) 
                    }
                }}
                onBlur={() => {
                    setTimeout(() => setBubbleBar(false), 200) 
                }}
                data-block-id={id}
                />
        </div>
    )
}

export default Block
