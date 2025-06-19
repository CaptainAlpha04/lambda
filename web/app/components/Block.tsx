import React, {useState, useEffect, useRef, forwardRef} from 'react'
import BubbleBar from './BubbleBar' 
import { GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

interface BlockProps {
    id: string 
    createNewBlock: (initialContent?: string) => void 
    deletePreviousBlock: () => void 
    initialContent?: string 
    blockTag?: string
    setBlockTag?: (tag: string) => void
    previousBlockContent?: string
    updatePreviousBlockContent?: (content: string, placeCursorAtEnd?: boolean) => void
    isPreviousBlock?: boolean
    focusOnBlock?: (direction: 'up' | 'down') => void
    onDelete?: () => void
    onMoveUp?: () => void
    onMoveDown?: () => void
    // Add this new prop
    onContentChange?: (content: string) => void
}

function Block({
    id, 
    createNewBlock, 
    deletePreviousBlock, 
    initialContent = '', 
    previousBlockContent = '',
    updatePreviousBlockContent,
    blockTag = 'p',
    setBlockTag,
    isPreviousBlock = false,
    focusOnBlock,
    onDelete,
    onMoveUp,
    onMoveDown
}: BlockProps) {
    const [contentTag, setContenTag] = useState<string>(blockTag)
    const [bubbleBar, setBubbleBar] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [isBubbleBarHovered, setIsBubbleBarHovered] = useState<boolean>(false)
    const [dragHandlerHovered, setDragHandlerHovered] = useState<boolean>(false)
    const contentRef = useRef<HTMLDivElement>(null) 
    const bubbleBarRef = useRef<HTMLDivElement>(null) 

    type ValidHTMLTags = 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'ul' | 'ol'
    const DynamicTag = contentTag as ValidHTMLTags 

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerHTML = `<${contentTag}>${content}</${contentTag}>`
            // Ensure text direction is always left-to-right
            contentRef.current.style.direction = 'ltr'
            contentRef.current.style.textAlign = 'left'
        }
    }, [contentTag, content])
    
    useEffect(() => {
        if (initialContent && contentRef.current) {
            contentRef.current.innerHTML = initialContent
            // Ensure text direction is always left-to-right
            contentRef.current.style.direction = 'ltr'
            contentRef.current.style.textAlign = 'left'
            
            // Extract content tag from initialContent if it exists
            const match = initialContent.match(/<([a-z0-9]+)[^>]*>(.*?)<\/\1>/i)
            if (match && match[1]) {
                setContenTag(match[1].toLowerCase())
            }
        }
    }, [initialContent])

    const handleFormat = (formatType: string, value?: string) => {
        if (formatType === 'formatBlock') {
            if (contentRef.current) {
                setContent(contentRef.current.innerHTML)
            }
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

        if (formatType === 'strikethrough') {
            document.execCommand('strikethrough')
        }

        if (formatType === 'justifyLeft' || 
            formatType === 'justifyCenter' || 
            formatType === 'justifyRight' || 
            formatType === 'justifyFull') {
            document.execCommand(formatType)
        }

        if (formatType === 'insertUnorderedList' || 
            formatType === 'insertOrderedList') {
            document.execCommand(formatType)
        }

        if (formatType === 'createLink') {
            const url = prompt('Enter the URL:')
            if (url) {
                document.execCommand('createLink', false, url)
            }
        }

        if (formatType === 'insertHorizontalRule') {
            // Create a horizontal rule in the next block
            createNewBlock('<hr />')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        // Handle up/down arrow key navigation between blocks
        if (e.key === 'ArrowUp') {
            const selection = window.getSelection()
            const range = selection?.getRangeAt(0)
            
            // Check if cursor is at the beginning of the content (first line)
            const isAtFirstLine = range?.startOffset === 0 && 
                                  range?.startContainer === contentRef.current?.firstChild?.firstChild
            
            if (isAtFirstLine && focusOnBlock) {
                e.preventDefault()
                focusOnBlock('up')
                return
            }
        }
        
        if (e.key === 'ArrowDown') {
            const selection = window.getSelection()
            const range = selection?.getRangeAt(0)
            
            // Get the text node where the cursor is
            const textNode = range?.startContainer
            const textContent = textNode?.textContent || ''
            
            // Check if cursor is at the end of content (last line)
            const isAtLastLine = range?.startOffset === textContent.length &&
                                !range?.startContainer.nextSibling
            
            if (isAtLastLine && focusOnBlock) {
                e.preventDefault()
                focusOnBlock('down')
                return
            }
        }
        
        // Handle backspace at the beginning of a block to merge with previous block
        if (e.key === 'Backspace') {
            const selection = window.getSelection()
            const range = selection?.getRangeAt(0)
            
            // Check if cursor is at the beginning of the block
            const isAtStart = range?.startOffset === 0 && 
                              range?.startContainer === contentRef.current?.firstChild?.firstChild

            // If at start and there's a previous block, merge content
            if (isAtStart && updatePreviousBlockContent) {
                e.preventDefault()
                
                // Get current block's content
                const currentContent = contentRef.current?.innerHTML || ''

                // Merge with previous block's content and update
                updatePreviousBlockContent(previousBlockContent + currentContent, true)
                
                // Delete current block
                deletePreviousBlock()
                return
            }
            
            // Handle empty block deletion
            if (!contentRef.current?.textContent?.trim()) {
                e.preventDefault()
                deletePreviousBlock()
                return
            }
        }

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
            if (!selection || selection.rangeCount === 0) return
            
            const range = selection.getRangeAt(0)
            
            // Check if cursor is at the end of the content
            const isAtEnd = range.startOffset === (range.startContainer.textContent?.length || 0) && 
                         !range.startContainer.nextSibling

            if (isAtEnd && 
                (range.startContainer === contentRef.current.firstChild?.firstChild ||
                 range.startContainer === contentRef.current.firstChild)) {
                // At the end of content, create a new empty block
                createNewBlock()
                return
            }
            
            // Handle splitting styled content properly
            if (contentRef.current) {
                // Save current HTML content
                const currentHTML = contentRef.current.innerHTML
                
                // Create temporary element to manipulate the HTML
                const tempElement = document.createElement('div')
                tempElement.innerHTML = currentHTML
                
                // Create marker at cursor position
                const marker = '{{CURSOR_POSITION}}'
                document.execCommand('insertHTML', false, marker)
                
                // Get HTML with marker
                const htmlWithMarker = contentRef.current.innerHTML
                
                // Split HTML at marker
                const parts = htmlWithMarker.split(marker)
                const beforeCursor = parts[0]
                const afterCursor = parts[1] || ''
                
                // Update current block with content before cursor
                contentRef.current.innerHTML = beforeCursor
                
                // Create new block with content after cursor
                if (afterCursor.trim()) {
                    let newBlockContent
                    
                    // For headings, convert to paragraph in new block
                    if (contentTag === 'h1' || contentTag === 'h2' || 'h3') {
                        // Extract text content from the HTML
                        tempElement.innerHTML = afterCursor
                        
                        // Create new block as paragraph
                        newBlockContent = `<p>${afterCursor}</p>`
                    } else {
                        // Keep the same formatting for all other block types
                        newBlockContent = `<${contentTag}>${afterCursor}</${contentTag}>`
                    }
                    
                    createNewBlock(newBlockContent)
                } else {
                    // Just create an empty new block
                    createNewBlock()
                }
            }
        }
    }

    // Add this handler to your Block component
    const handleContentChange = () => {
        if (contentRef.current) {
            // Update the parent component's state with the current content
            const currentHTML = contentRef.current.innerHTML;
            setContent(currentHTML);
        }
    };

    // Function to manage bubbleBar
    const hideBubbleBar = () => {
        if (!isBubbleBarHovered) {
            setBubbleBar(false) 
        }
    }

    return (
        <div className="relative mb-2 flex group">
            {/* Drag handler on the left */}
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <button 
                    className="p-1 cursor-pointer hover:bg-slate-100 rounded" 
                    onClick={() => setBubbleBar(true)}
                    title="Show formatting options"
                >
                    <GripVertical size={16} />
                </button>

                <button 
                    className="p-1 cursor-pointer hover:bg-red-100 rounded text-red-500 ml-1" 
                    onClick={onDelete}
                    title="Delete block"
                >
                    <Trash2 size={16} />
                </button>

            </div>
            <div className="flex-grow">
                {bubbleBar && (
                    <div 
                        ref={bubbleBarRef}
                        onMouseEnter={() => setIsBubbleBarHovered(true)}
                        onMouseLeave={() => setIsBubbleBarHovered(false)}
                    >
                        <BubbleBar onFormat={handleFormat} />
                    </div>
                )}
                <div
                    className='p-2 focus:bg-slate-50 min-h-10'
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    ref={contentRef}
                    onKeyDown={handleKeyDown}
                    // Add these event handlers
                    onInput={handleContentChange}
                    onBlur={handleContentChange}
                    onSelect={() => {
                        const selection = window.getSelection() 
                        if (selection && selection.toString().length > 0) {
                            setBubbleBar(true) 
                        }
                    }}

                        
                    data-block-id={id}
                />
            </div>
            
            {/* Control buttons in a row on the right */}
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                
                {onMoveUp && (
                    <button 
                        className="p-1 cursor-pointer hover:bg-slate-100 rounded text-slate-500 ml-1" 
                        onClick={onMoveUp}
                        title="Move block up"
                    >
                        <ChevronUp size={16} />
                    </button>
                )}
                
                {onMoveDown && (
                    <button 
                        className="p-1 cursor-pointer hover:bg-slate-100 rounded text-slate-500 ml-1" 
                        onClick={onMoveDown}
                        title="Move block down"
                    >
                        <ChevronDown size={16} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Block
