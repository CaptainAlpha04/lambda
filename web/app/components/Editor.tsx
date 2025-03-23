import React, { useState, useRef, useEffect } from 'react'
import { PlusCircle } from 'lucide-react'
import Block from './Block'
function Editor() {
  // Use an array of IDs instead of ReactNodes for better control
  const [blockIds, setBlockIds] = useState<string[]>(['block-0'])
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const [blockContent, setBlockContent] = useState<{[key: string]: string}>({})
  
  // Use refs to access and manage block elements
  const blockRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement | null>}>({})
  
  // Initialize the first block ref
  useEffect(() => {
    blockIds.forEach(id => {
      if (!blockRefs.current[id]) {
        blockRefs.current[id] = React.createRef()
      }
    })
  }, [])
  
  // Focus the last block when focusIndex changes
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
    
    // Update block contents
    if (initialContent) {
      // Add the initial content to the new block
      console.log('initialContent', initialContent)
      
      const updatedBlockContent = {
        ...blockContent,
        [newId]: initialContent
      }
      
      // Set the state with the new object
      setBlockContent(updatedBlockContent)
    }

    setBlockIds(newBlocks)

    // Set focus to the new block
    setFocusIndex(index + 1)
  }

  const deleteBlock = (index: number) => {
    if (blockIds.length === 1) return
    const newBlocks = [...blockIds]
    newBlocks.splice(index, 1)
    setBlockIds(newBlocks)
    setFocusIndex(index - 1)
  }

  return (
    <section className='p-4'>
      {blockIds.map((id, index) => (
        <div key={id} ref={blockRefs.current[id]}>
          <Block 
            id={id}
            createNewBlock={(initialContent) => addBlock(index, initialContent)}
            initialContent={blockContent[id] || ''}
            deletePreviousBlock={() => deleteBlock(index)}
          />
        </div>
      ))}
      
      <button 
        onClick={() => addBlock(blockIds.length - 1, '')}
        className='btn mt-4'
      >
        <PlusCircle size={20}/>
        Add block
      </button>


    </section>
  )
}

export default Editor
