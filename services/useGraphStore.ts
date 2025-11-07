import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Edge, LayoutType } from '../types';

// Helper to ensure edges have unique IDs for vis-data DataSet
const ensureEdgeIds = (edges: Edge[]): Edge[] => {
  return edges.map(edge => ({
    ...edge,
    id: edge.id || `${edge.from}-${edge.to}-${edge.label}`
  }));
};

interface GraphState {
  allNodes: Node[];
  allEdges: Edge[];
  selectedNodeId: string | null;
  layout: LayoutType;
  activeFilter: string;
  clusterMode: boolean;
  nodePositions: { [key: string]: { x: number, y: number } };
  
  // Actions
  initializeGraph: (nodes: Node[], edges: Edge[]) => void;
  setSelectedNodeId: (id: string | null) => void;
  setLayout: (layout: LayoutType) => void;
  setFilter: (filter: string) => void;
  addNode: (node: Node) => void;
  addEdges: (edges: Edge[]) => void;
  toggleClusterMode: () => void;
  setNodePositions: (positions: { [key: string]: { x: number, y: number } }) => void;

  // Computed (getters)
  getSelectedNode: () => Node | null;
  getNodesMap: () => Map<string, Node>;
}

export const useGraphStore = create<GraphState>()(
  persist(
    (set, get) => ({
      // State
      allNodes: [],
      allEdges: [],
      selectedNodeId: null,
      layout: 'physics',
      activeFilter: 'all',
      clusterMode: false,
      nodePositions: {},

      // Actions
      initializeGraph: (nodes, edges) => set({ allNodes: nodes, allEdges: ensureEdgeIds(edges) }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setLayout: (layout) => set({ layout }),
      setFilter: (filter) => set({ activeFilter: filter }),
      addNode: (node) => {
        const nodesMap = get().getNodesMap();
        if (!nodesMap.has(node.id)) {
          set(state => ({ allNodes: [...state.allNodes, node] }));
        } else {
            // Optionally handle update logic or alerts here
            console.warn(`Node with id ${node.id} already exists.`);
        }
      },
      addEdges: (edges) => {
        const newEdgesWithIds = ensureEdgeIds(edges);
        const currentEdgeIds = new Set(get().allEdges.map(e => e.id));
        const uniqueNewEdges = newEdgesWithIds.filter(e => e.id && !currentEdgeIds.has(e.id));
        if (uniqueNewEdges.length > 0) {
          set(state => ({ allEdges: [...state.allEdges, ...uniqueNewEdges] }));
        }
      },
      toggleClusterMode: () => set(state => ({ clusterMode: !state.clusterMode })),
      setNodePositions: (positions) => set({ nodePositions: positions }),
      
      // Getters for computed state
      getSelectedNode: () => {
        const { allNodes, selectedNodeId } = get();
        if (!selectedNodeId) return null;
        return allNodes.find(node => node.id === selectedNodeId) || null;
      },
      getNodesMap: () => {
        const { allNodes } = get();
        return new Map(allNodes.map(node => [node.id, node]));
      }
    }),
    {
      name: 'endecja-knowledge-graph-storage', // name of the item in the storage (must be unique)
    }
  )
);
