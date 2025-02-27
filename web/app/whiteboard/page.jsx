import React from 'react';
import Whiteboard from '../components/whiteboard';
import Sidebar from '../components/sidebar';
import SearchBar from '../components/search-bar';


export default function WhiteboardPage() {
    return (
        <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <SearchBar />
        <Whiteboard />
      </main>
    </div>
    );
}
