import React from 'react';
import { LayoutType } from '../types';

interface GraphControlsProps {
    layout: LayoutType;
    onLayoutChange: (layout: LayoutType) => void;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const FilterButton: React.FC<{ filter: string, activeFilter: string, onClick: (filter: string) => void, children: React.ReactNode }> = ({ filter, activeFilter, onClick, children }) => {
    const isActive = filter === activeFilter;
    return (
        <button
            onClick={() => onClick(filter)}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' : 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 border border-gray-300'}`}
        >
            {children}
        </button>
    );
};


const GraphControls: React.FC<GraphControlsProps> = ({ layout, onLayoutChange, activeFilter, onFilterChange }) => {
    const toggleLayout = () => {
        onLayoutChange(layout === 'physics' ? 'hierarchical' : 'physics');
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
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    {/* Placeholder for future search bar */}
                </div>
                 <div className="flex items-center justify-start md:justify-end">
                    <button 
                        onClick={toggleLayout} 
                        className="px-3 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                    >
                        {layout === 'physics' ? 'Switch to Hierarchical Layout' : 'Switch to Physics Layout'}
                    </button>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 items-center">
                <span className="text-sm font-semibold text-gray-700 self-center mr-2">Filter by Group:</span>
                {filters.map(f => (
                    <FilterButton key={f.id} filter={f.id} activeFilter={activeFilter} onClick={onFilterChange}>
                        {f.label}
                    </FilterButton>
                ))}
            </div>
        </div>
    );
};

export default GraphControls;
