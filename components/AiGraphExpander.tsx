import React, { useState } from 'react';
import { proposeNewGraphData } from '../services/geminiService';
import { Node, Edge } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const AiGraphExpander: React.FC = () => {
  const { getNodesMap, addNode, addEdges } = useGraphStore();
  
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [proposedData, setProposedData] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null); // <-- ADD THIS

  const handlePropose = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setProposedData(null);
    try {
      const existingIds: string[] = Array.from(getNodesMap().keys());
      const jsonString = await proposeNewGraphData(topic, existingIds);
      setProposedData(jsonString);
    } catch (e) {
      console.error(e);
      setProposedData(JSON.stringify({ "error": "An error occurred." }));
    }
    setIsLoading(false);
  };

  const handleConfirm = () => {
    if (!proposedData) return;

    if (!imageBase64) { // <-- ADD THIS CHECK
      alert("Please upload an image for the new node.");
      return;
    }

    try {
      const data = JSON.parse(proposedData);
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else if (data.newNode && data.newEdges) {
        
        // --- MERGE THE IMAGE DATA ---
        const newNodeWithText = data.newNode as Node;
        newNodeWithText.image = imageBase64; // <-- ADD THE IMAGE
        // --- END MERGE ---

        addNode(newNodeWithText); // Add the complete node
        addEdges(data.newEdges as Edge[]);
        
        setProposedData(null);
        setImageBase64(null); // <-- Reset image state
        setTopic('');
      } else {
        alert("Invalid data structure received from AI.");
      }
    } catch (e) {
      alert("Failed to parse AI response as JSON.");
    }
  };

  return (
    <div className="p-4 bg-stone-50 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-2">AI Graph Expander</h3>
      <p className="text-xs text-gray-500 mb-3">Propose a new person, event, or topic to add to the graph.</p>
      <div className="flex">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'Władysław Anders'"
          className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button onClick={handlePropose} disabled={isLoading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-blue-300">
          {isLoading ? '...' : 'Propose'}
        </button>
      </div>
      {proposedData && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold">AI Proposal (Validate & Confirm):</h4>
          <pre className="text-xs p-2 bg-gray-100 rounded overflow-auto max-h-40">
            {JSON.stringify(JSON.parse(proposedData), null, 2)}
          </pre>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Portrait (Required)
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const base64String = await fileToBase64(e.target.files[0]);
                  setImageBase64(base64String);
                }
              }}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={handleConfirm} className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              Confirm & Add
            </button>
            <button onClick={() => { setProposedData(null); setImageBase64(null); }} className="flex-1 px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiGraphExpander;