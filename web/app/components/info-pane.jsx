"use client";
import React from 'react';

export default function InfoPane({ definitions, isLoading, error }) {
    return (
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Definitions</h2>

            {isLoading && <div className="text-gray-500">Searching...</div>}
            {error && <div className="text-red-500">{error}</div>}

            <div className="space-y-4">
                {definitions?.map((definition, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 mb-2">{definition.text}</p>
                        <button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(definition.text);
                                    alert('Copied to clipboard!'); 
                                } catch (err) {
                                    alert('Failed to copy');
                                }
                            }}
                        >
                            Copy to Board
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}