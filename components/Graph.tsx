import React, { useEffect, useRef } from 'react';
import { DataSet, DataView } from 'vis-data/peer';
import { Network } from 'vis-network';
import { Node, Edge, GraphDataView } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const Graph: React.FC = () => {
  const { allNodes, allEdges, layout, activeFilter, setSelectedNodeId, clusterMode, nodePositions, setNodePositions } = useGraphStore();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  // SOTA: Use Refs for master DataSets and high-performance DataViews
  const nodesRef = useRef(new DataSet<Node>());
  const edgesRef = useRef(new DataSet<Edge>());
  const nodeViewRef = useRef<GraphDataView | null>(null);
  const edgeViewRef = useRef<GraphDataView | null>(null);

  // SOTA: This is the "Endecja Vibe" baseOptions, which we are keeping
  const baseOptions = {
      nodes: {
          shape: 'circularImage',
          borderWidth: 3,
          borderWidthSelected: 8, // Thicker border for clear selection
          font: { size: 16, face: 'Merriweather', color: '#1f2937' }, // Serif font
          brokenImage: "https://i.ibb.co/g7pMXX5/image-missing.png", // Corrected link
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
      groups: {
          ideologue: { color: { border: '#3730a3', background: '#e0e7ff', highlight: { border: '#3730a3', background: '#c7d2fe' }, hover: { border: '#3730a3', background: '#c7d2fe' } }, size: 40 },
          thinker: { color: { border: '#3730a3', background: '#e0e7ff', highlight: { border: '#3730a3', background: '#c7d2fe' }, hover: { border: '#3730a3', background: '#c7d2fe' } }, size: 30 },
          modern_nd: { color: { border: '#4b5563', background: '#e5e7eb', highlight: { border: '#1f2937', background: '#d1d5db' }, hover: { border: '#1f2937', background: '#d1d5db' } }, size: 30 },
          leader: { color: { border: '#14532d', background: '#dcfce7', highlight: { border: '#14532d', background: '#bbf7d0' }, hover: { border: '#14532d', background: '#bbf7d0' } }, size: 35 },
          clergy: { color: { border: '#b45309', background: '#fef9c3', highlight: { border: '#b45309', background: '#fef08a' }, hover: { border: '#b45309', background: '#fef08a' } }, size: 30 },
          organization: { 
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf132', size: 40, color: '#9f1239' }, // rose-800
              color: { border: '#9f1239', background: '#ffe4e6' }
          },
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
          city: {
              shape: 'icon',
              icon: { face: '"Font Awesome 6 Free"', code: '\uf19c', size: 30, color: '#57534e' }, // stone-600
              color: { border: '#57534e', background: '#e7e5e4' }
          },
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
          barnesHut: { gravitationalConstant: -15000, centralGravity: 0.05, springLength: 200, avoidOverlap: 1 }, // Set avoidOverlap to 1
          stabilization: { iterations: 1500, fit: true },
      },
      layout: { hierarchical: false }
  };

  const hierarchicalLayoutOptions = {
      edges: { ...baseOptions.edges, smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }, font: {align: 'middle'} },
      physics: { enabled: false },
      layout: {
          hierarchical: { 
              enabled: true, 
              direction: 'UD', // SOTA CHANGE: Up-Down layout
              sortMethod: 'directed', // This uses the 'level' property we just defined
              levelSeparation: 250, // More vertical space between eras
              nodeSpacing: 160,     // Space between nodes in the same era
              treeSpacing: 200      // Space between different trees
          }
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
         node.color = { ...baseOptions.groups[node.group]?.color }; // Use original group color
         if (!isConnected) {
           node.color.background = '#fbf9f4'; // Parchment fade
           node.color.border = '#e7e5e4'; // Stone border fade
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

    const clusterByGroup = () => {
        if (!networkRef.current) return;
        networkRef.current.cluster({
            joinCondition: (nodeOptions) => nodeOptions.group === activeFilter,
            clusterNodeProperties: {
                id: `cluster:${activeFilter}`,
                label: `${activeFilter.toUpperCase()}S`,
                group: activeFilter,
                shape: 'ellipse',
                allowSingleNodeCluster: true,
            },
        });
    };

  // SOTA FIX: Initialize network instance ONCE on mount
  useEffect(() => {
    if (containerRef.current && !networkRef.current) {
        
        // SOTA: Create two DataViews, one for nodes and one for edges
        nodeViewRef.current = new DataView(nodesRef.current, {
          filter: (node) => {
            const filter = useGraphStore.getState().activeFilter;
            return filter === 'all' || node.group === filter;
          }
        });

        edgeViewRef.current = new DataView(edgesRef.current, {
          filter: (edge) => {
            const nodeView = nodeViewRef.current;
            if (!nodeView) return true;
            // Only show edges where BOTH nodes are visible
            return nodeView.get(edge.from) && nodeView.get(edge.to);
          }
        });

        // Pass the DataViews (not the DataSets) to the Network
        const data = { nodes: nodeViewRef.current, edges: edgeViewRef.current };
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
  }, []); // Empty dependency array is correct

  // SOTA FIX: This effect updates the *master* data when the store changes
  useEffect(() => {
    // Add titles for tooltips
    const nodesWithTitles = allNodes.map(n => {
        const position = nodePositions[n.id];
        return {
          ...n,
          title: n.description || n.label,
          x: position?.x, // Load X position
          y: position?.y, // Load Y position
        };
    });
    
    nodesRef.current.clear();
    nodesRef.current.add(nodesWithTitles);
    edgesRef.current.clear();
    edgesRef.current.add(allEdges);
    
    // DataViews will auto-refresh, but we need to trigger the edgeView filter
    if (edgeViewRef.current) {
        edgeViewRef.current.refresh();
    }
  }, [allNodes, allEdges]);

  // SOTA FIX: This effect *only* handles filter changes by refreshing the views
  useEffect(() => {
    if (nodeViewRef.current) {
      nodeViewRef.current.refresh();
    }
    // We must refresh edgeView *after* nodeView so it can filter correctly
    if (edgeViewRef.current) {
      edgeViewRef.current.refresh();
    }
    // If we are in cluster mode, re-cluster when filter changes
    if (clusterMode) {
        clusterByGroup();
    }
  }, [activeFilter]);

  // SOTA FIX: This effect handles layout changes
  useEffect(() => {
    if (networkRef.current) {
        // If positions are already stored, don't use physics
        const usePhysics = Object.keys(nodePositions).length === 0;

        const optionsToApply = layout === 'physics' ? 
            { ...physicsLayoutOptions, physics: { enabled: usePhysics } } : 
            hierarchicalLayoutOptions;

        networkRef.current.setOptions(optionsToApply);

        if (usePhysics && layout === 'physics') {
            // After stabilizing, store positions
            networkRef.current.once("stabilizationIterationsDone", () => {
                networkRef.current.storePositions();
                const positions = networkRef.current.getPositions();
                setNodePositions(positions);
                // Turn physics off now that we are stable
                networkRef.current.setOptions({ physics: false });
            });
        }
    }
  }, [layout, nodePositions, setNodePositions]);

  // SOTA FIX: Add a new effect just for clustering
    useEffect(() => {
        if (clusterMode && activeFilter !== 'all') {
            clusterByGroup();
        } else {
            networkRef.current?.setData({ nodes: nodeViewRef.current, edges: edgeViewRef.current }); // Resets all clusters
        }
    }, [clusterMode]);

  return <div ref={containerRef} className="h-full w-full bg-[#FBF9F4] border border-stone-300 rounded-lg" />;
};

export default Graph;