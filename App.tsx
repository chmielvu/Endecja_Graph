import React, { useState, useMemo, useEffect } from 'react';
import Graph from './components/Graph';
import ContextPanel from './components/ContextPanel';
import AiTutor from './components/AiTutor';
import AiGraphExpander from './components/AiGraphExpander';
import GraphControls from './components/GraphControls';
import { GRAPH_DATA } from './constants';
import { Node, Edge, LayoutType } from './types';

// Helper to ensure edges have unique IDs for vis-data DataSet
const ensureEdgeIds = (edges: Edge[]): Edge[] => {
  return edges.map(edge => ({
    ...edge,
    id: edge.id || `${edge.from}-${edge.to}-${edge.label}`
  }));
};


const App: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [layout, setLayout] = useState<LayoutType>('physics');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // SOTA: Hold graph data in state, initializing from localStorage or constants
  const [allNodes, setAllNodes] = useState<Node[]>(() => {
    try {
      const savedNodes = localStorage.getItem('endecja_graph_nodes');
      return savedNodes ? JSON.parse(savedNodes) : GRAPH_DATA.nodes;
    } catch (e) {
      console.error("Failed to parse nodes from localStorage", e);
      return GRAPH_DATA.nodes;
    }
  });
  const [allEdges, setAllEdges] = useState<Edge[]>(() => {
    try {
      const savedEdges = localStorage.getItem('endecja_graph_edges');
      const parsedEdges = savedEdges ? JSON.parse(savedEdges) : GRAPH_DATA.edges;
      return ensureEdgeIds(parsedEdges);
    } catch (e) {
      console.error("Failed to parse edges from localStorage", e);
      return ensureEdgeIds(GRAPH_DATA.edges);
    }
  });

  // SOTA: Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem('endecja_graph_nodes', JSON.stringify(allNodes));
  }, [allNodes]);

  useEffect(() => {
    localStorage.setItem('endecja_graph_edges', JSON.stringify(allEdges));
  }, [allEdges]);

  const allNodesMap = useMemo(() => new Map(allNodes.map(node => [node.id, node])), [allNodes]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return allNodesMap.get(selectedNodeId) || null;
  }, [selectedNodeId, allNodesMap]);

  // SOTA: Callback function to add new data from the AI, now with duplicate edge prevention
  const handleAddData = (newNode: Node, newEdges: Edge[]) => {
    // Check for duplicate node ID
    if (allNodesMap.has(newNode.id)) {
      alert("Error: A node with this ID already exists.");
      return;
    }
    
    // Ensure new edges have IDs and filter out any that already exist
    const newEdgesWithIds = ensureEdgeIds(newEdges);
    const currentEdgeIds = new Set(allEdges.map(e => e.id));
    const uniqueNewEdges = newEdgesWithIds.filter(e => e.id && !currentEdgeIds.has(e.id));

    setAllNodes(prev => [...prev, newNode]);
    if (uniqueNewEdges.length > 0) {
      setAllEdges(prev => [...prev, ...uniqueNewEdges]);
    }
  };

  return (
    <div className="h-screen w-screen p-4 sm:p-6 lg:p-8 flex flex-col bg-amber-50">
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Polish National Democracy (Endecja)</h1>
        <p className="text-md text-gray-600">An interactive knowledge graph of its key thinkers, leaders, and historical context.</p>
      </header>

      <GraphControls 
        layout={layout}
        onLayoutChange={setLayout}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <div className="lg:col-span-2 h-full">
          <Graph 
            nodes={allNodes}
            edges={allEdges}
            onNodeClick={setSelectedNodeId}
            layout={layout}
            filterGroup={activeFilter}
          />
        </div>

        <div className="h-full flex flex-col gap-6 overflow-y-auto">
            <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md">
                 <ContextPanel node={selectedNode} />
            </div>
            <div className="flex-shrink-0">
                <AiGraphExpander onAddData={handleAddData} allNodesMap={allNodesMap} />
            </div>
            <div className="flex-1 min-h-0">
                <AiTutor selectedNode={selectedNode} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;