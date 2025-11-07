import React, { useEffect } from 'react';
import Graph from './components/Graph';
import ContextPanel from './components/ContextPanel';
import AiTutor from './components/AiTutor';
import AiGraphExpander from './components/AiGraphExpander';
import GraphControls from './components/GraphControls';
import Timeline from './components/Timeline';
import DocumentImporter from './components/DocumentImporter';
import { useGraphStore } from './services/useGraphStore';
import { GRAPH_DATA } from './constants';

const App: React.FC = () => {
  const { allNodes, initializeGraph } = useGraphStore();
  
  // SOTA: Seed the store from constants.ts on first load if localStorage is empty
  useEffect(() => {
    if (allNodes.length === 0) {
      initializeGraph(GRAPH_DATA.nodes, GRAPH_DATA.edges);
    }
  }, [allNodes.length, initializeGraph]);

  return (
    <div className="h-screen w-screen p-4 sm:p-6 lg:p-8 flex flex-col bg-amber-50">
      <header className="mb-4 flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Polish National Democracy (Endecja)</h1>
        <p className="text-md text-gray-600">The Living Archive: An interactive knowledge graph powered by the Gemini 2.5 Suite.</p>
      </header>

      <div className="flex-shrink-0">
        <GraphControls />
      </div>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left Column: Graph and Timeline */}
        <div className="lg:col-span-2 h-full flex flex-col gap-4">
          <div className="flex-grow-[3] min-h-0">
            <Graph />
          </div>
          <div className="flex-grow-[1] min-h-0">
            <Timeline />
          </div>
        </div>

        {/* Right Column: Context and AI Tools */}
        <div className="h-full flex flex-col gap-6 overflow-y-auto">
            <div className="flex-shrink-0 bg-white rounded-lg shadow-md">
                 <ContextPanel />
            </div>
            <div className="flex-shrink-0">
                <AiGraphExpander />
            </div>
            <div className="flex-shrink-0">
                <DocumentImporter />
            </div>
            <div className="flex-1 min-h-0">
                <AiTutor />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;