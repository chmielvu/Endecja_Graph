
import React, { useState, useMemo } from 'react';
import Graph from './components/Graph';
import ContextPanel from './components/ContextPanel';
import AiTutor from './components/AiTutor';
import { GRAPH_DATA } from './constants';
import { Node } from './types';

const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const allNodes = useMemo(() => new Map(GRAPH_DATA.nodes.map(node => [node.id, node])), []);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return allNodes.get(selectedNodeId) || null;
  }, [selectedNodeId, allNodes]);


  return (
    <div className="h-screen w-screen p-4 sm:p-6 lg:p-8 flex flex-col">
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">The Prompting Bible: A Framework for Generative Orchestration</h1>
        <p className="text-md text-gray-600">Interactive Knowledge Graph of the Polish National Democracy (Endecja)</p>
      </header>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
        <div className="lg:col-span-2 h-full">
          <Graph 
            nodes={GRAPH_DATA.nodes}
            edges={GRAPH_DATA.edges}
            onNodeClick={setSelectedNodeId}
          />
        </div>

        <div className="h-full flex flex-col gap-6">
            <div className="flex-1 h-1/2 bg-white rounded-lg shadow-md">
                 <ContextPanel node={selectedNode} />
            </div>
            <div className="flex-1 h-1/2">
                <AiTutor selectedNode={selectedNode} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
