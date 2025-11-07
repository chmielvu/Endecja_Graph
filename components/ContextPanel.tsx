
import React from 'react';
import { Node } from '../types';

interface ContextPanelProps {
  node: Node | null;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ node }) => {
  if (!node) {
    return (
      <div className="p-6 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Select a Node</h2>
        <p className="text-gray-600">Click on any item in the graph to see more details here, or use the AI Tutor to ask a question.</p>
      </div>
    );
  }
  
  const groupColors: { [key: string]: string } = {
    ideologue: '#be185d',
    thinker: '#1d4ed8',
    modern_nd: '#0d9488',
    leader: '#16a34a',
    publication: '#ca8a04',
    organization: '#d97706',
    city: '#4b5563',
  }

  const borderColor = groupColors[node.group] || '#d1d5db';

  return (
    <div className="p-6 h-full overflow-y-auto">
       <img 
          src={node.image} 
          alt={node.label} 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 shadow-md"
          style={{ borderColor }}
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/100/100'; }}
        />
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{node.label}</h2>
        <p className="text-sm text-gray-500 text-center uppercase font-semibold mb-6" style={{ color: borderColor }}>{node.group}</p>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{node.description}</p>
    </div>
  );
};

export default ContextPanel;
