
import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge } from '../types';

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  onNodeClick: (nodeId: string | null) => void;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
      const visNodes = new DataSet<any>(nodes.map(n => ({...n, title: n.description})));
      const visEdges = new DataSet<any>(edges);

      const data = {
        nodes: visNodes,
        edges: visEdges,
      };

      const options = {
        nodes: {
          shape: 'circularImage',
          borderWidth: 4,
          font: { size: 16, face: 'Source Sans Pro', color: '#1f2937' },
          brokenImage: "https://picsum.photos/seed/error/100/100",
        },
        edges: {
          width: 2,
          font: { size: 12, face: 'Source Sans Pro', color: '#4b5563', align: 'top' },
          arrows: { to: { enabled: true, scaleFactor: 0.7 } },
          smooth: { type: 'cubicBezier', forceDirection: 'none', roundness: 0.1 },
        },
        physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: {
            gravitationalConstant: -20000,
            centralGravity: 0.1,
            springLength: 250,
          },
          stabilization: { iterations: 1000 },
        },
        interaction: {
          hover: true,
          tooltipDelay: 200,
          navigationButtons: true,
        },
        groups: {
          ideologue: { color: { border: '#be185d', background: '#fce7f3' }, size: 40 },
          thinker: { color: { border: '#1d4ed8', background: '#dbeafe' }, size: 30 },
          modern_nd: { color: { border: '#0d9488', background: '#ccfbf1' }, size: 30 },
          leader: { color: { border: '#16a34a', background: '#dcfce7' }, size: 35 },
          publication: { color: { border: '#ca8a04', background: '#fef9c3' }, size: 25, shape: 'box' },
          organization: { color: { border: '#d97706', background: '#fef3c7' }, size: 30, shape: 'database' },
          city: { color: { border: '#4b5563', background: '#e5e7eb' }, size: 20, shape: 'ellipse' },
        }
      };

      const network = new Network(containerRef.current, data, options);
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
    }
  }, [nodes, edges, onNodeClick]);

  return <div ref={containerRef} className="h-full w-full bg-gray-50 border border-gray-300 rounded-lg" />;
};

export default Graph;
