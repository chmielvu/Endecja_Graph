import React, { useState } from 'react';
import { useGraphStore } from '../services/useGraphStore';
import { analyzeImage } from '../services/geminiService';

const ContextPanel: React.FC = () => {
  const selectedNode = useGraphStore(state => state.getSelectedNode());
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedNode?.image) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeImage(selectedNode.image);
      setAnalysis(result);
    } catch (e) {
      setAnalysis("An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!selectedNode) {
    return (
      <div className="p-6 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Select a Node</h2>
        <p className="text-gray-600">Click on any item in the graph to see more details here, or use the AI Tutor to ask a question.</p>
      </div>
    );
  }
  
  const groupColors: { [key: string]: string } = {
      ideologue: '#2563EB', thinker: '#2563EB', modern_nd: '#0d9488',
      leader: '#16a34a', antagonist: '#4B5563', organization: '#DC2626',
      event: '#D97706', publication: '#D97706', clergy: '#FBBF24',
      city: '#4b5563',
  }
  const borderColor = groupColors[selectedNode.group] || '#d1d5db';

  return (
    <div className="p-6 h-full overflow-y-auto">
       <img 
          src={selectedNode.image} 
          alt={selectedNode.label} 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 shadow-md"
          style={{ borderColor }}
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://i.ibb.co/g7pMXX5/image-missing.png'; }}
        />
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{selectedNode.label}</h2>
        <p className="text-sm text-gray-500 text-center uppercase font-semibold mb-6" style={{ color: borderColor }}>{selectedNode.group}</p>
        
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{selectedNode.description}</p>
            </div>
            
            <div>
              <button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="w-full text-center px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Portrait'}
              </button>
            </div>

            {isAnalyzing && (
                 <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                     <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                     </div>
                </div>
            )}
            {analysis && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Multimodal Analysis</h3>
                <p className="text-gray-700 leading-relaxed text-sm bg-gray-100 p-3 rounded-md" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
              </div>
            )}

            {selectedNode.link && (
                 <a href={selectedNode.link} target="_blank" rel="noopener noreferrer" 
                    className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                     Learn More
                 </a>
            )}
        </div>
    </div>
  );
};

export default ContextPanel;