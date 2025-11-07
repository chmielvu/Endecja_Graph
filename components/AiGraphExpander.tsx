import React, { useState } from 'react';
import { proposeNewGraphData } from '../services/geminiService';
import { Node, Edge } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const AiGraphExpander: React.FC = () => {
  const { getNodesMap, addNode, addEdges } = useGraphStore();
  
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [proposedData, setProposedData] = useState<string | null>(null);

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
    try {
      const data = JSON.parse(proposedData);
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else if (data.newNode && data.newEdges) {
        // Use Zustand actions to add data
        addNode(data.newNode as Node);
        addEdges(data.newEdges as Edge[]);
        
        setProposedData(null);
        setTopic('');
      } else {
        alert("Invalid data structure received from AI.");
      }
    } catch (e) {
      alert("Failed to parse AI response as JSON.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
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
          <div className="flex gap-2 mt-2">
            <button onClick={handleConfirm} className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              Confirm & Add
            </button>
            <button onClick={() => setProposedData(null)} className="flex-1 px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiGraphExpander;