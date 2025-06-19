import React, { useState, useRef, useEffect } from 'react'
import { PlusCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Block from './Block'
import BlockTypeMenu from './BlockTypeMenu'

function Editor() {
  // Use an array of IDs instead of ReactNodes for better control
  const [blockIds, setBlockIds] = useState<string[]>(['block-0'])
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const [blockContent, setBlockContent] = useState<{[key: string]: string}>({})
  const [showBlockTypeMenu, setShowBlockTypeMenu] = useState<boolean>(false)
  const [blockMenuPosition, setBlockMenuPosition] = useState<{top: number, left: number}>({top: 0, left: 0})
  const [contentTag, setContentTag] = useState<string>('p')

  // Use refs to access and manage block elements
  const blockRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement | null>}>({})
  const addBlockButtonRef = useRef<HTMLButtonElement>(null)
  
  // Initialize the first block ref
  useEffect(() => {
    blockIds.forEach(id => {
      if (!blockRefs.current[id]) {
        blockRefs.current[id] = React.createRef()
      }
    })
  }, [])
  
  // Focus the block when focusIndex changes
  useEffect(() => {
    if (focusIndex >= 0 && blockIds[focusIndex]) {
      const id = blockIds[focusIndex]
      const blockRef = blockRefs.current[id]
      
      if (blockRef && blockRef.current) {
        // Focus the contentEditable element inside the block
        const editableElement = blockRef.current.querySelector('[contenteditable=true]')
        if (editableElement) {
          setTimeout(() => {
            // Use setTimeout to ensure DOM is updated
            (editableElement as HTMLElement).focus()
            
            // Move cursor to the end of the content
            const selection = window.getSelection()
            const range = document.createRange()
            
            if (selection && (editableElement as HTMLElement).firstChild) {
              const textNode = (editableElement as HTMLElement).firstChild?.firstChild
              if (textNode) {
                const length = textNode.textContent?.length || 0
                range.setStart(textNode, length)
                range.setEnd(textNode, length)
                selection.removeAllRanges()
                selection.addRange(range)
              }
            }
          }, 0)
        }
      }
    }
  }, [focusIndex, blockIds])

  useEffect(() => {
    console.log('blockContent', blockContent)
  },[blockContent])

  const addBlock = (index: number, initialContent: string = '') => {
    const newId = `block-${Date.now()}`
    
    // Create a new ref for the new block
    blockRefs.current[newId] = React.createRef()
    
    // Insert the new block after the one that triggered the action
    const newBlocks = [...blockIds]
    newBlocks.splice(index + 1, 0, newId)
    
    // IMPORTANT: Always initialize block content, even if empty
    const updatedBlockContent = {
      ...blockContent,
      [newId]: initialContent || ''  // Ensure it's at least an empty string
    }
    
    // Set the state with the new object
    setBlockContent(updatedBlockContent)
    setBlockIds(newBlocks)
    
    // Set focus to the new block
    setFocusIndex(index + 1)
  }

  const deleteBlock = (index: number) => {
    if (blockIds.length === 1) return
    
    // Set focus to previous block before deleting
    const targetIndex = index - 1
    
    // Delete block and update state
    const newBlocks = [...blockIds]
    newBlocks.splice(index, 1)
    setBlockIds(newBlocks)
    
    // Focus on the previous block with cursor at the end
    setFocusIndex(targetIndex)
    
    // Position cursor explicitly at the end of the previous block's content
    setTimeout(() => {
      const blockId = blockIds[targetIndex]
      const blockRef = blockRefs.current[blockId]
      
      if (blockRef && blockRef.current) {
        const editableElement = blockRef.current.querySelector('[contenteditable=true]')
        if (editableElement) {
          (editableElement as HTMLElement).focus()
          
          // Position cursor at the very end of the content
          const selection = window.getSelection()
          if (selection && editableElement.firstChild) {
            // Create a new range at the end of content
            const range = document.createRange()
            
            // Find the last text node to position at its end
            let lastNode = editableElement.firstChild
            while (lastNode.lastChild) {
              lastNode = lastNode.lastChild
            }
            
            const length = lastNode.textContent?.length || 0
            range.setStart(lastNode, length)
            range.setEnd(lastNode, length)
            
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }
    }, 10)
  }

  const updateBlockContent = (index: number, content: string, placeCursorAtEnd: boolean = false) => {
    const id = blockIds[index]
    setBlockContent(prev => ({
      ...prev,
      [id]: content
    }))

    // Focus the updated block
    setFocusIndex(index)
    
    // If placeCursorAtEnd is true, we'll specifically position cursor at the end in the useEffect
    if (placeCursorAtEnd) {
      // This will trigger the useEffect that handles cursor positioning
      setTimeout(() => {
        const blockRef = blockRefs.current[id]
        if (blockRef && blockRef.current) {
          const editableElement = blockRef.current.querySelector('[contenteditable=true]')
          if (editableElement) {
            (editableElement as HTMLElement).focus()
            
            // Position cursor at the very end
            const selection = window.getSelection()
            if (selection && editableElement.firstChild) {
              const range = document.createRange()
              
              // Move to the end of the content
              range.selectNodeContents(editableElement.firstChild)
              range.collapse(false) // Collapse to end
              
              selection.removeAllRanges()
              selection.addRange(range)
            }
          }
        }
      }, 10)
    }
  }

  // Handle navigation between blocks with arrow keys
  const navigateBlocks = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' 
      ? Math.max(0, index - 1)
      : Math.min(blockIds.length - 1, index + 1)
    
    if (newIndex !== index) {
      setFocusIndex(newIndex)
      
      // Additional logic for cursor positioning at start or end based on direction
      setTimeout(() => {
        const blockRef = blockRefs.current[blockIds[newIndex]]
        if (blockRef && blockRef.current) {
          const editableElement = blockRef.current.querySelector('[contenteditable=true]')
          if (editableElement) {
            (editableElement as HTMLElement).focus()
            
            // Position cursor at the very end when moving up or beginning when moving down
            const selection = window.getSelection()
            if (selection) {
              // Create a new range
              const range = document.createRange()
              
              if (direction === 'up') {
                // When moving up, place cursor at the end of content
                // Find the deepest last child to position the cursor correctly at the end
                if (editableElement.firstChild) {
                  let lastNode = editableElement.firstChild
                  while (lastNode.lastChild) {
                    lastNode = lastNode.lastChild
                  }
                  
                  const length = lastNode.textContent?.length || 0
                  range.setStart(lastNode, length)
                  range.setEnd(lastNode, length)
                } else {
                  // Fallback if no content
                  range.selectNodeContents(editableElement)
                  range.collapse(false)
                }
              } else {
                // When moving down, place cursor at the beginning of content
                if (editableElement.firstChild) {
                  let firstNode = editableElement.firstChild
                  while (firstNode.firstChild && firstNode.firstChild.nodeType === Node.TEXT_NODE) {
                    firstNode = firstNode.firstChild
                  }
                  
                  range.setStart(firstNode, 0)
                  range.setEnd(firstNode, 0)
                } else {
                  // Fallback if no content
                  range.selectNodeContents(editableElement)
                  range.collapse(true)
                }
              }
              
              selection.removeAllRanges()
              selection.addRange(range)
            }
          }
        }
      }, 10)
    }
  }

  // Handle moving blocks up/down
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === blockIds.length - 1)
    ) {
      return; // Can't move past the boundaries
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Get the IDs of the blocks being swapped
    const currentBlockId = blockIds[index];
    const targetBlockId = blockIds[newIndex];

    // Create new arrays to update state
    const newBlockIds = [...blockIds];
    
    // Log the content before swapping for debugging
    console.log('Before swap - current block content:', blockContent[currentBlockId]);
    console.log('Before swap - target block content:', blockContent[targetBlockId]);

    // Swap the block IDs in the array
    [newBlockIds[index], newBlockIds[newIndex]] = [newBlockIds[newIndex], newBlockIds[index]];
    
    // Update the block order first to ensure React updates the DOM
    setBlockIds(newBlockIds);
    
    // Focus on the moved block in its new position - do this after state updates
    setTimeout(() => {
      setFocusIndex(newIndex);
    }, 10);
  };

  const handleShowBlockTypeMenu = () => {
    if (addBlockButtonRef.current) {
      const rect = addBlockButtonRef.current.getBoundingClientRect()
      setBlockMenuPosition({
        top: rect.top - 250, // Position above the button
        left: rect.left
      })
    }
    setShowBlockTypeMenu(true)
  }

  const handleBlockTypeSelect = (blockType: string) => {
    
    switch (blockType) {
      case 'heading1':
        setContentTag('h1')
        break
      case 'heading2':
        setContentTag('h2')
        break
      case 'heading3':
        setContentTag('h3')
        break
      case 'bulletList':
        setContentTag('ul')
        break
      case 'numberedList':
        setContentTag('ol')
        break
      case 'hr':
        setContentTag('hr')
        break
      case 'code':
        setContentTag('pre')
        break
      default:
        setContentTag('p')
        break
    }
    
    addBlock(blockIds.length - 1, '')
    setShowBlockTypeMenu(false)
  }

  return (
    <section className='p-4'>
      {blockIds.map((id, index) => (
        <div 
          key={id} 
          ref={blockRefs.current[id]}
        >
          <Block 
            id={id}
            createNewBlock={(initialContent) => addBlock(index, initialContent)}
            initialContent={blockContent[id] || ''}  // Ensure empty string fallback
            deletePreviousBlock={() => deleteBlock(index)}
            previousBlockContent={index > 0 ? blockContent[blockIds[index - 1]] || '' : ''}
            updatePreviousBlockContent={index > 0 ? 
              (content, placeCursorAtEnd = false) => {
                console.log(`Updating block ${blockIds[index-1]} with content:`, content);
                updateBlockContent(index - 1, content, placeCursorAtEnd);
              } : undefined}
            isPreviousBlock={index > 0}
            focusOnBlock={(direction) => navigateBlocks(index, direction)}
            blockTag={id === blockIds[0] ? contentTag : 'p'}  // Only apply tag to first block
            onDelete={() => deleteBlock(index)}
            onMoveUp={index > 0 ? () => moveBlock(index, 'up') : undefined}
            onMoveDown={index < blockIds.length - 1 ? () => moveBlock(index, 'down') : undefined}
            onContentChange={(content) => {
              console.log(`Block ${id} content changed:`, content);
              setBlockContent(prev => ({
                ...prev,
                [id]: content
              }));
            }}
          />
        </div>
      ))}
      
      <button 
        ref={addBlockButtonRef}
        onClick={handleShowBlockTypeMenu}
        className='btn mt-4 flex items-center gap-2'
      >
        <PlusCircle size={20}/>
        Add block
        <ChevronDown size={16} />
      </button>

      {showBlockTypeMenu && (
        <BlockTypeMenu 
          position={blockMenuPosition}
          onSelect={handleBlockTypeSelect}
          onClose={() => setShowBlockTypeMenu(false)}
        />
      )}
    </section>
  )
}

export default Editor
