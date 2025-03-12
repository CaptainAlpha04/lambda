"use client";
import { useState } from 'react';
import Whiteboard from '../components/whiteboard';
import Sidebar from '../components/sidebar';
import SearchBar from '../components/search-bar';
import InfoPane from '../components/info-pane';
import { generateDefinition } from '../lib/gemini';

export default function WhiteboardPage() {
  const [selectedTool, setSelectedTool] = useState("pen");
  const [definitions, setDefinitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) return;
    
    console.log("Search initiated for:", query); // Add this
    setIsLoading(true);
    setError(null);
    
    try {
      const definitionText = await generateDefinition(query);
      console.log("API Response:", definitionText);
      setDefinitions([{ text: definitionText }, ...definitions]);
    } catch (err) {
      console.error("Search error:", err); 
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setSelectedTool={setSelectedTool} />
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <SearchBar onSearch={handleSearch} />
          <Whiteboard selectedTool={selectedTool} />
        </main>
        <InfoPane 
          definitions={definitions} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
}