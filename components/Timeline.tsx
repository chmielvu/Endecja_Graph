import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/peer';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { useGraphStore } from '../services/useGraphStore';
import { Node } from '../types';

const Timeline: React.FC = () => {
    const { allNodes, selectedNodeId, setSelectedNodeId } = useGraphStore();
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineInstanceRef = useRef<VisTimeline | null>(null);
    const timelineItemsRef = useRef(new DataSet());
    
    // Initialize Timeline instance
    useEffect(() => {
        if (timelineRef.current && !timelineInstanceRef.current) {
            const options = {
                stack: false,
                maxHeight: '100%',
                margin: {
                    item: 10,
                },
                zoomMin: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
            };
            const instance = new VisTimeline(timelineRef.current, timelineItemsRef.current, options);
            instance.on('select', (properties) => {
                const selectedId = properties.items[0];
                if (selectedId && selectedId !== selectedNodeId) {
                    setSelectedNodeId(selectedId);
                }
            });
            timelineInstanceRef.current = instance;
        }

        return () => {
            if (timelineInstanceRef.current) {
                timelineInstanceRef.current.destroy();
                timelineInstanceRef.current = null;
            }
        };
    }, []);

    // Update timeline data when nodes change
    useEffect(() => {
        const items = allNodes
            .filter(node => node.start)
            .map(node => ({
                id: node.id,
                content: node.label,
                start: node.start,
                end: node.end, // Can be undefined
                title: node.title || node.label,
            }));
        timelineItemsRef.current.clear();
        timelineItemsRef.current.add(items);
        timelineInstanceRef.current?.fit();
    }, [allNodes]);

    // Sync timeline selection with graph selection
    useEffect(() => {
        if (timelineInstanceRef.current) {
            if (selectedNodeId) {
                timelineInstanceRef.current.setSelection(selectedNodeId, { focus: true, animation: true });
            } else {
                timelineInstanceRef.current.setSelection([]);
            }
        }
    }, [selectedNodeId]);


    return <div ref={timelineRef} className="h-full w-full" />;
};

export default Timeline;
