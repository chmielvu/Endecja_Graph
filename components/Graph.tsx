import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge, LayoutType } from '../types';

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  onNodeClick: (nodeId: string | null) => void;
  layout: LayoutType;
  filterGroup: string;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, onNodeClick, layout, filterGroup }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesRef = useRef(new DataSet<any>(nodes.map(n => ({...n, title: n.description}))));
  const edgesRef = useRef(new DataSet<any>(edges));


  // Base options shared by both layouts
  const baseOptions = {
      nodes: {
          shape: 'circularImage',
          borderWidth: 3,
          font: { size: 16, face: 'Source Sans Pro', color: '#1f2937' },
          brokenImage: "https://i.ibb.co/g7pMXX5/image-missing.png",
          shadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.25)',
            size: 8,
            x: 3,
            y: 3
          },
      },
      edges: {
          width: 1.5,
          color: {
            color: '#a1a1aa',
            highlight: '#1f2937',
            hover: '#4b5563',
          },
          font: { size: 11, face: 'Source Sans Pro', color: '#4b5563' },
          arrows: { to: { enabled: true, scaleFactor: 0.7 } },
      },
      interaction: {
          hover: true,
          tooltipDelay: 200,
          navigationButtons: true,
          hoverConnectedEdges: true,
      },
      // Thematic Color Palette: Patriotic, Catholic, Academic
      groups: {
          ideologue: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 40 },
          thinker: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 30 },
          modern_nd: { color: { border: '#0f766e', background: '#ccfbf1', highlight: { border: '#0d9488', background: '#99f6e4' }, hover: { border: '#0d9488', background: '#99f6e4' } }, size: 30 },
          leader: { color: { border: '#166534', background: '#dcfce7', highlight: { border: '#15803d', background: '#bbf7d0' }, hover: { border: '#15803d', background: '#bbf7d0' } }, size: 35 },
          antagonist: { color: { border: '#1f2937', background: '#d1d5db', highlight: { border: '#000000', background: '#e5e7eb' }, hover: { border: '#000000', background: '#e5e7eb' } }, size: 35, shape: 'box' },
          organization: { color: { border: '#991b1b', background: '#fee2e2', highlight: { border: '#b91c1c', background: '#fecaca' }, hover: { border: '#b91c1c', background: '#fecaca' } }, size: 30, shape: 'database' },
          event: { color: { border: '#92400e', background: '#fef3c7', highlight: { border: '#b45309', background: '#fde68a' }, hover: { border: '#b45309', background: '#fde68a' } }, size: 30, shape: 'diamond' },
          publication: { color: { border: '#92400e', background: '#fef3c7', highlight: { border: '#b45309', background: '#fde68a' }, hover: { border: '#b45309', background: '#fde68a' } }, size: 25, shape: 'box' },
          clergy: { color: { border: '#b45309', background: '#fef9c3', highlight: { border: '#d97706', background: '#fef08a' }, hover: { border: '#d97706', background: '#fef08a' } }, size: 30, shape: 'dot' },
          city: { color: { border: '#4b5563', background: '#e5e7eb', highlight: { border: '#374151', background: '#d1d5db' }, hover: { border: '#374151', background: '#d1d5db' } }, size: 20, shape: 'ellipse' },
      }
  };

  const physicsLayoutOptions = {
      edges: { smooth: { type: 'cubicBezier', forceDirection: 'none', roundness: 0.1 }, font: {align: 'top'} },
      physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: { gravitationalConstant: -30000, centralGravity: 0.1, springLength: 300, avoidOverlap: 0.5 },
          stabilization: { iterations: 1500, fit: true },
      },
      layout: { hierarchical: false }
  };

  const hierarchicalLayoutOptions = {
      edges: { smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }, font: {align: 'middle'} },
      physics: { enabled: false },
      layout: {
          hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 300, nodeSpacing: 150 }
      }
  };

  // Initialize network
  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
        const data = { nodes: nodesRef.current, edges: edgesRef.current };
        const initialOptions = layout === 'physics' ? physicsLayoutOptions : hierarchicalLayoutOptions;
        
        const mergedOptions = { ...baseOptions, ...initialOptions };

        const network = new Network(containerRef.current, data, mergedOptions);
        networkRef.current = network;

        network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                onNodeClick(nodeId);
                network.focus(nodeId, { scale: 1.2, animation: true });
            } else {
                onNodeClick(null);
            }
        });

        network.on("stabilizationIterationsDone", () => network.fit());
    }
  }, []); // Only run once on mount

  // Update layout when prop changes
  useEffect(() => {
    if (networkRef.current) {
      const optionsToApply = layout === 'physics' ? physicsLayoutOptions : hierarchicalLayoutOptions;
      networkRef.current.setOptions(optionsToApply);
      if(layout === 'physics') {
        networkRef.current.stabilize(1500);
      }
    }
  }, [layout]);

  // Update node filtering when prop changes
  useEffect(() => {
    if (nodesRef.current) {
      const allNodeIds = nodesRef.current.getIds();
      const nodesToUpdate = allNodeIds.map(id => {
        const node = nodesRef.current.get(id);
        const isVisible = filterGroup === 'all' || node.group === filterGroup;
        return { id: id, hidden: !isVisible };
      });
      nodesRef.current.update(nodesToUpdate);
    }
  }, [filterGroup]);

  return <div ref={containerRef} className="h-full w-full bg-gray-50 border border-gray-300 rounded-lg" />;
};

export default Graph;