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
  
  // Thematic Color Palette: Patriotic, Catholic, Academic
  const groupColors: { [key: string]: string } = {
      ideologue: '#2563EB', // Marian Blue
      thinker: '#2563EB', // Marian Blue
      modern_nd: '#0d9488', // Teal
      leader: '#16a34a', // Green
      antagonist: '#4B5563', // Stark Gray
      organization: '#DC2626', // National Red
      event: '#D97706', // Papal Gold
      publication: '#D97706', // Papal Gold
      clergy: '#FBBF24', // Papal Gold variant
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
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100/e2e8f0/718096?text=Image+Missing'; }}
        />
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{node.label}</h2>
        <p className="text-sm text-gray-500 text-center uppercase font-semibold mb-6" style={{ color: borderColor }}>{node.group}</p>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">{node.description}</p>

        {node.link && (
             <a href={node.link} target="_blank" rel="noopener noreferrer" 
                className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                 Learn More
             </a>
        )}
    </div>
  );
};

export default ContextPanel;
