import React, { useEffect, useRef } from 'react';
import { DataSet, DataView } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge, LayoutType, GraphDataView } from '../types';

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
  // These refs will be initialized in the setup effect
  const nodesRef = useRef<DataSet<any>>(new DataSet<any>());
  const edgesRef = useRef<DataSet<any>>(new DataSet<any>());
  const dataViewRef = useRef<GraphDataView | null>(null);

  // Use a ref to hold the current filter group, so the filter function in DataView doesn't become stale.
  const filterGroupRef = useRef(filterGroup);
  filterGroupRef.current = filterGroup;


  // Base options shared by both layouts
  const baseOptions = {
      nodes: {
          shape: 'circularImage',
          borderWidth: 3,
          font: { size: 16, face: 'Source Sans Pro', color: '#1f2937' },
          brokenImage: "https://i.ibb.co/g7pMXX5/image-missing.png",
          // SOTA: Refined shadow for a subtle "engraving" lift
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
            // SOTA: Subtler default edges, strong highlight
            color: '#d1d5db', // gray-300
            highlight: '#1f2937', // gray-800
            hover: '#4b5563', // gray-600
          },
          font: { size: 11, face: 'Source Sans Pro', color: '#4b5563' },
          arrows: { to: { enabled: true, scaleFactor: 0.7 } },
          dashes: false, // Default: no dashes
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
      // Thematic Color Palette: Patriotic, Catholic, Academic
      groups: {
          // SOTA: 'people' nodes use circularImage (their portrait)
          ideologue: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 40 },
          thinker: { color: { border: '#374151', background: '#f3f4f6', highlight: { border: '#1d4ed8', background: '#e0e7ff' }, hover: { border: '#2563eb', background: '#dbeafe' } }, size: 30 },
          modern_nd: { color: { border: '#0f766e', background: '#ccfbf1', highlight: { border: '#0d9488', background: '#99f6e4' }, hover: { border: '#0d9488', background: '#99f6e4' } }, size: 30 },
          leader: { color: { border: '#166534', background: '#dcfce7', highlight: { border: '#15803d', background: '#bbf7d0' }, hover: { border: '#15803d', background: '#bbf7d0' } }, size: 35 },
          clergy: { color: { border: '#b45309', background: '#fef9c3', highlight: { border: '#d97706', background: '#fef08a' }, hover: { border: '#d97706', background: '#fef08a' } }, size: 30 },

          // SOTA: 'abstract' nodes use thematic icons
          organization: { 
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf132', size: 40, color: '#991b1b' }, // Shield
              color: { border: '#991b1b', background: '#fee2e2' }
          },
          event: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf133', size: 35, color: '#92400e' }, // Calendar
              color: { border: '#92400e', background: '#fef3c7' }
          },
          publication: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf1ea', size: 35, color: '#92400e' }, // Newspaper
              color: { border: '#92400e', background: '#fef3c7' }
          },
          city: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf19c', size: 30, color: '#4b5563' }, // University/Landmark
              color: { border: '#4b5563', background: '#e5e7eb' }
          },
          antagonist: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf057', size: 35, color: '#1f2937' }, // Times-Circle
              color: { border: '#1f2937', background: '#d1d5db' }
          }
      }
  };

  const physicsLayoutOptions = {
      edges: { ...baseOptions.edges, smooth: { type: 'cubicBezier', forceDirection: 'none', roundness: 0.1 }, font: {align: 'top'} },
      physics: {
          enabled: true,
          solver: 'barnesHut',
          // SOTA: Tuned physics for a more stable, "academic" layout
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
  
    // NEW: Function for Neighbourhood Highlight (Fading)
   const handleNodeClick = (params: any) => {
     const allNodes = nodesRef.current.get({ returnType: 'Object' });
     if (params.nodes.length > 0) {
       const selectedNodeId = params.nodes[0];
       onNodeClick(selectedNodeId);
       networkRef.current?.focus(selectedNodeId, { scale: 1.2, animation: true });
 
       const connectedNodes = networkRef.current?.getConnectedNodes(selectedNodeId) as string[];
       connectedNodes.push(selectedNodeId); // Add the selected node itself
 
       const nodesToUpdate = Object.values(allNodes).map((node: any) => {
         const isConnected = connectedNodes.includes(node.id);
         node.color = { ...baseOptions.groups[node.group]?.color }; // Reset to base
         if (!isConnected) {
           node.color.background = '#f9fafb'; // Fade background
           node.color.border = '#e5e7eb'; // Fade border
         }
         return node;
       });
       nodesRef.current.update(nodesToUpdate);
 
     } else {
       resetAllNodeOpacities();
       onNodeClick(null);
     }
   };
 
   // NEW: Function to reset fading
   const resetAllNodeOpacities = () => {
     const allNodes = nodesRef.current.get({ returnType: 'Object' });
     const nodesToUpdate = Object.values(allNodes).map((node: any) => {
       // Reset color to its group default
       node.color = { ...baseOptions.groups[node.group]?.color };
       return node;
     });
     nodesRef.current.update(nodesToUpdate);
   };

  // Initialize network instance ONCE on mount
  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
        // DataView is created here, linked to the DataSet refs
        dataViewRef.current = new DataView(nodesRef.current, {
          // The filter now reads from the mutable ref, which is always up-to-date.
          filter: (node) => filterGroupRef.current === 'all' || node.group === filterGroupRef.current
        });

        const data = { nodes: dataViewRef.current, edges: edgesRef.current };
        const initialOptions = layout === 'physics' ? physicsLayoutOptions : hierarchicalLayoutOptions;
        
        const mergedOptions = { ...baseOptions, ...initialOptions };

        const network = new Network(containerRef.current, data, mergedOptions);
        networkRef.current = network;

        // Attach event listeners
        network.on('click', handleNodeClick);
        network.on("deselectNode", () => {
             resetAllNodeOpacities();
             onNodeClick(null);
        });
        network.on("stabilizationIterationsDone", () => network.fit());
    }

    // Cleanup on unmount
    return () => {
        if (networkRef.current) {
            networkRef.current.destroy();
            networkRef.current = null;
        }
    };
  }, []); // Empty dependency array ensures this runs only once.

  // SOTA: Update data robustly when props change using DataSet.update()
  useEffect(() => {
    // networkRef check ensures we only update after initialization
    if (networkRef.current) {
        // .update() will add, update, and remove nodes/edges to match the arrays
        nodesRef.current.update(nodes.map(n => ({...n, title: n.description})));
        edgesRef.current.update(edges); // This requires edges to have stable IDs
    }
  }, [nodes, edges]);


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

  // SOTA: Update node filtering using DataView
  useEffect(() => {
    if (dataViewRef.current) {
      // With the ref-based filter, we only need to refresh the view
      // when the filter criteria change.
      dataViewRef.current.refresh();
    }
  }, [filterGroup]);

  return <div ref={containerRef} className="h-full w-full bg-gray-50 border border-gray-300 rounded-lg" />;
};

export default Graph;