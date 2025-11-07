import React from 'react';
import { useGraphStore } from '../services/useGraphStore';

const FilterButton: React.FC<{ filter: string, activeFilter: string, onClick: (filter: string) => void, children: React.ReactNode }> = ({ filter, activeFilter, onClick, children }) => {
    const isActive = filter === activeFilter;
    return (
        <button
            onClick={() => onClick(filter)}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ${isActive ? 'bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-500' : 'bg-white text-gray-700 hover:bg-stone-100 focus:ring-indigo-500 border border-stone-300'}`}
        >
            {children}
        </button>
    );
};

const GraphControls: React.FC = () => {
    const { layout, setLayout, activeFilter, setFilter, clusterMode, toggleClusterMode } = useGraphStore();

    const toggleLayout = () => {
        setLayout(layout === 'physics' ? 'hierarchical' : 'physics');
    };

    const filters = [
        { id: 'all', label: 'Show All' },
        { id: 'ideologue', label: 'Ideologues' },
        { id: 'thinker', label: 'Thinkers' },
        { id: 'clergy', label: 'Clergy' },
        { id: 'organization', label: 'Organizations' },
        { id: 'publication', label: 'Publications' },
        { id: 'leader', label: 'Allies & Rivals' },
        { id: 'antagonist', label: 'Antagonists' },
        { id: 'modern_nd', label: 'Modern ND' },
        { id: 'event', label: 'Events' },
        { id: 'city', label: 'Cities' },
    ];

    return (
        <div className="bg-stone-50 p-4 rounded-lg shadow-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    {/* Placeholder for future search bar */}
                </div>
                 <div className="flex items-center justify-start md:justify-end">
                    <button 
                        onClick={toggleLayout} 
                        className="px-3 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                    >
                        {layout === 'physics' ? 'Switch to Temporal Layout' : 'Switch to Physics Layout'}
                    </button>
                    <button 
                        onClick={toggleClusterMode} 
                        className="ml-4 px-3 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                    >
                        {clusterMode ? 'Uncluster Nodes' : 'Cluster by Group'}
                    </button>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 items-center">
                <span className="text-sm font-semibold text-gray-700 self-center mr-2">Filter by Group:</span>
                {filters.map(f => (
                    <FilterButton key={f.id} filter={f.id} activeFilter={activeFilter} onClick={setFilter}>
                        {f.label}
                    </FilterButton>
                ))}
            </div>
        </div>
    );
};

export default GraphControls;