import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge, GraphDataView } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const Graph: React.FC = () => {
  const { allNodes, allEdges, layout, activeFilter, setSelectedNodeId } = useGraphStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesRef = useRef(new DataSet<Node>());
  const edgesRef = useRef(new DataSet<Edge>());

  // Base options shared by both layouts
  const baseOptions = {
      nodes: {
          shape: 'circularImage',
          borderWidth: 3,
          font: { size: 16, face: 'Source Sans Pro', color: '#1f2937' },
          brokenImage: "https://i.ibb.co/g7pMXX5/image-missing.png",
          shadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.15)',
            size: 5,
            x: 2,
            y: 2
          },
      },
      edges: {
          width: 1.5,
          color: {
            color: '#d1d5db',
            highlight: '#1f2937',
            hover: '#4b5563',
          },
          font: { size: 11, face: 'Source Sans Pro', color: '#4b5563' },
          arrows: { to: { enabled: true, scaleFactor: 0.7 } },
          dashes: false,
          smooth: {
            type: 'cubicBezier',
            forceDirection: 'none',
            roundness: 0.1
          }
      },
      interaction: {
          hover: true,
          tooltipDelay: 200,
          navigationButtons: true,
          hoverConnectedEdges: true,
      },
      groups: {
          ideologue: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 40 },
          thinker: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 30 },
          modern_nd: { color: { border: '#0f766e', background: '#ccfbf1', highlight: { border: '#0d9488', background: '#99f6e4' }, hover: { border: '#0d9488', background: '#99f6e4' } }, size: 30 },
          leader: { color: { border: '#166534', background: '#dcfce7', highlight: { border: '#15803d', background: '#bbf7d0' }, hover: { border: '#15803d', background: '#bbf7d0' } }, size: 35 },
          clergy: { color: { border: '#b45309', background: '#fef9c3', highlight: { border: '#d97706', background: '#fef08a' }, hover: { border: '#d97706', background: '#fef08a' } }, size: 30 },
          organization: { 
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf132', size: 40, color: '#991b1b' },
              color: { border: '#991b1b', background: '#fee2e2' }
          },
          event: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf133', size: 35, color: '#92400e' },
              color: { border: '#92400e', background: '#fef3c7' }
          },
          publication: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf1ea', size: 35, color: '#92400e' },
              color: { border: '#92400e', background: '#fef3c7' }
          },
          city: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf19c', size: 30, color: '#4b5563' },
              color: { border: '#4b5563', background: '#e5e7eb' }
          },
          antagonist: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf057', size: 35, color: '#1f2937' },
              color: { border: '#1f2937', background: '#d1d5db' }
          }
      }
  };

  const physicsLayoutOptions = {
      edges: { ...baseOptions.edges, smooth: { type: 'cubicBezier', forceDirection: 'none', roundness: 0.1 }, font: {align: 'top'} },
      physics: {
          enabled: true,
          solver: 'barnesHut',
          barnesHut: { gravitationalConstant: -15000, centralGravity: 0.05, springLength: 200, avoidOverlap: 0.8 },
          stabilization: { iterations: 1500, fit: true },
      },
      layout: { hierarchical: false }
  };

  const hierarchicalLayoutOptions = {
      edges: { ...baseOptions.edges, smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }, font: {align: 'middle'} },
      physics: { enabled: false },
      layout: {
          hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 300, nodeSpacing: 150 }
      }
  };
  
   const handleNodeClick = (params: any) => {
     const allNodes = nodesRef.current.get({ returnType: 'Object' });
     if (params.nodes.length > 0) {
       const selectedNodeId = params.nodes[0];
       setSelectedNodeId(selectedNodeId);
       networkRef.current?.focus(selectedNodeId, { scale: 1.2, animation: true });
 
       const connectedNodes = networkRef.current?.getConnectedNodes(selectedNodeId) as string[];
       connectedNodes.push(selectedNodeId);
 
       const nodesToUpdate = Object.values(allNodes).map((node: any) => {
         const isConnected = connectedNodes.includes(node.id);
         node.color = { ...baseOptions.groups[node.group]?.color };
         if (!isConnected) {
           node.color.background = '#f9fafb';
           node.color.border = '#e5e7eb';
         }
         return node;
       });
       nodesRef.current.update(nodesToUpdate);
 
     } else {
       resetAllNodeColors();
       setSelectedNodeId(null);
     }
   };
 
   const resetAllNodeColors = () => {
     const allNodes = nodesRef.current.get({ returnType: 'Object' });
     const nodesToUpdate = Object.values(allNodes).map((node: any) => {
       node.color = { ...baseOptions.groups[node.group]?.color };
       return node;
     });
     nodesRef.current.update(nodesToUpdate);
   };

  // Initialize network instance ONCE on mount
  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
        const data = { nodes: nodesRef.current, edges: edgesRef.current };
        const initialOptions = layout === 'physics' ? physicsLayoutOptions : hierarchicalLayoutOptions;
        const mergedOptions = { ...baseOptions, ...initialOptions };

        const network = new Network(containerRef.current, data, mergedOptions);
        networkRef.current = network;

        network.on('click', handleNodeClick);
        network.on("deselectNode", () => {
             resetAllNodeColors();
             setSelectedNodeId(null);
        });
        network.on("stabilizationIterationsDone", () => network.fit());
    }

    return () => {
        if (networkRef.current) {
            networkRef.current.destroy();
            networkRef.current = null;
        }
    };
  }, []);

  // Update data when store changes
  useEffect(() => {
    if (networkRef.current) {
        const filteredNodes = activeFilter === 'all' 
            ? allNodes 
            : allNodes.filter(n => n.group === activeFilter);
        
        // Add titles for tooltips
        const nodesWithTitles = filteredNodes.map(n => ({...n, title: n.description}));

        nodesRef.current.clear();
        nodesRef.current.add(nodesWithTitles);
        
        // Only show edges connected to visible nodes
        const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
        const filteredEdges = allEdges.filter(e => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to));
        
        edgesRef.current.clear();
        edgesRef.current.add(filteredEdges);
    }
  }, [allNodes, allEdges, activeFilter]);


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

  return <div ref={containerRef} className="h-full w-full bg-gray-50 border border-gray-300 rounded-lg" />;
};

export default Graph;