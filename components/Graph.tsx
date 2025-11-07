import React, { useEffect, useRef } from 'react';
import { DataSet, DataView } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge, GraphDataView } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const Graph: React.FC = () => {
  const { allNodes, allEdges, layout, activeFilter, setSelectedNodeId } = useGraphStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  // These are the master datasets
  const nodesRef = useRef(new DataSet<Node>());
  const edgesRef = useRef(new DataSet<Edge>());
  // This is the new high-performance view
  const dataViewRef = useRef<GraphDataView | null>(null);


  // Base options shared by both layouts
  const baseOptions = {
      nodes: {
          shape: 'circularImage',
          borderWidth: 3,
          borderWidthSelected: 8, // Thicker border for clear selection
          font: { size: 16, face: 'Merriweather', color: '#1f2937' }, // Serif font
          brokenImage: "[https://i.ibb.co/g7pMXX5/image-missing.png](https://i.ibb.co/g7pMXX5/image-missing.png)",
          shadow: {
            enabled: true,
            color: 'rgba(87, 56, 24, 0.25)', // Sepia shadow
            size: 8,
            x: 3,
            y: 3
          },
      },
      edges: {
          width: 2.5,
          color: {
            color: '#6b4f34', // Dark Sepia "Ink"
            highlight: '#3a2b1f', // Darkest Brown
            hover: '#503c2a',
            opacity: 0.8
          },
          font: { 
            size: 13, 
            face: 'Merriweather', // Serif font
            color: '#3a2b1f', // Darkest Brown
            align: 'middle', 
            background: '#FBF9F4', // Parchment background
            strokeWidth: 0
          },
          arrows: { to: { enabled: true, scaleFactor: 0.7 } },
          dashes: false,
          smooth: {
            type: 'dynamic',
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
      // --- NEW "ENDECJA VIBE" GROUP COLORS ---
      groups: {
          // Deep, academic blue for thinkers
          ideologue: { color: { border: '#3730a3', background: '#e0e7ff', highlight: { border: '#3730a3', background: '#c7d2fe' }, hover: { border: '#3730a3', background: '#c7d2fe' } }, size: 40 },
          thinker: { color: { border: '#3730a3', background: '#e0e7ff', highlight: { border: '#3730a3', background: '#c7d2fe' }, hover: { border: '#3730a3', background: '#c7d2fe' } }, size: 30 },
          
          // Modern ND: Muted, cool gray
          modern_nd: { color: { border: '#4b5563', background: '#e5e7eb', highlight: { border: '#1f2937', background: '#d1d5db' }, hover: { border: '#1f2937', background: '#d1d5db' } }, size: 30 },
          
          // Allies/Rivals: Deep forest green
          leader: { color: { border: '#14532d', background: '#dcfce7', highlight: { border: '#14532d', background: '#bbf7d0' }, hover: { border: '#14532d', background: '#bbf7d0' } }, size: 35 },
          
          // Clergy: Rich, ecclesiastical gold
          clergy: { color: { border: '#b45309', background: '#fef9c3', highlight: { border: '#b45309', background: '#fef08a' }, hover: { border: '#b45309', background: '#fef08a' } }, size: 30 },
          
          // Organizations: Deep "Claret" Red
          organization: { 
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf132', size: 40, color: '#9f1239' }, // rose-800
              color: { border: '#9f1239', background: '#ffe4e6' }
          },
          // Events/Publications: Dark, archival orange
          event: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf133', size: 35, color: '#9a3412' }, // orange-800
              color: { border: '#9a3412', background: '#fff7ed' }
          },
          publication: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf1ea', size: 35, color: '#9a3412' }, // orange-800
              color: { border: '#9a3412', background: '#fff7ed' }
          },
          // Cities: Neutral stone
          city: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf19c', size: 30, color: '#57534e' }, // stone-600
              color: { border: '#57534e', background: '#e7e5e4' }
          },
          // Antagonists: Stark charcoal
          antagonist: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf057', size: 35, color: '#171717' }, // neutral-900
              color: { border: '#171717', background: '#d6d3d1' }
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
        // Create the DataView for high-performance filtering
        dataViewRef.current = new DataView(nodesRef.current, {
          filter: (node) => {
            // Get the *current* filter from the store
            const filter = useGraphStore.getState().activeFilter;
            return filter === 'all' || node.group === filter;
          }
        });

        // Pass the DataView (not the DataSet) to the Network
        const data = { nodes: dataViewRef.current, edges: edgesRef.current };
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

  // EFFECT 1: This just updates the master list if the store's data changes
  useEffect(() => {
    nodesRef.current.clear();
    nodesRef.current.add(allNodes.map(n => ({...n, title: n.description || n.label}))); // Add title for tooltip
    
    edgesRef.current.clear();
    edgesRef.current.add(allEdges);
  }, [allNodes, allEdges]);

  // EFFECT 2: This just re-runs the filter when activeFilter changes
  useEffect(() => {
    if (dataViewRef.current) {
      dataViewRef.current.refresh(); // This is the high-performance part
    }
    
    // We must still manually filter edges
    const visibleNodeIds = new Set(dataViewRef.current ? dataViewRef.current.getIds() : allNodes.map(n => n.id));
    const filteredEdges = allEdges.filter(e => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to));
    edgesRef.current.clear();
    edgesRef.current.add(filteredEdges);
  }, [activeFilter, allEdges]); // allEdges is needed to re-filter edges


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

  return <div ref={containerRef} className="h-full w-full bg-[#FBF9F4] border border-stone-300 rounded-lg" />;
};

export default Graph;