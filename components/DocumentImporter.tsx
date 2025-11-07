import React, { useState } from 'react';
import { ingestDocument } from '../services/geminiService';
import { Node, Edge } from '../types';
import { useGraphStore } from '../services/useGraphStore';

interface Proposal {
    newNode: Node;
    newEdges: Edge[];
}

const DocumentImporter: React.FC = () => {
    const { getNodesMap, addNode, addEdges } = useGraphStore();
    const [isLoading, setIsLoading] = useState(false);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setProposals([]);
        setFileName(file.name);

        try {
            const content = await file.text();
            const existingIds: string[] = Array.from(getNodesMap().keys());
            const jsonString = await ingestDocument(content, existingIds);
            const data = JSON.parse(jsonString);
            
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else if (data.proposals) {
                setProposals(data.proposals);
            } else {
                alert("Invalid data structure received from AI.");
            }

        } catch (e) {
            console.error(e);
            alert("An error occurred while processing the document.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = (proposal: Proposal, index: number) => {
        addNode(proposal.newNode);
        addEdges(proposal.newEdges);
        // Remove confirmed proposal from the list
        setProposals(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Document Importer (KGOT)</h3>
            <p className="text-xs text-gray-500 mb-3">Drop a .txt file (e.g., a biography) to auto-extract new entities.</p>
            
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isLoading ? 'opacity-50' : ''}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isLoading ? (
                            <p className="text-sm text-gray-500">Processing "{fileName}"...</p>
                        ) : (
                           <>
                            <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                           </>
                        )}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} disabled={isLoading} accept=".txt,.md" />
                </label>
            </div> 

            {proposals.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">AI Proposals (Validate & Confirm):</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {proposals.map((p, i) => (
                            <div key={i} className="p-2 bg-gray-100 rounded">
                                <p className="text-sm font-bold">{p.newNode.label}</p>
                                <p className="text-xs text-gray-600 mb-2">{p.newNode.description}</p>
                                <button onClick={() => handleConfirm(p, i)} className="w-full px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                                    Add to Graph
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentImporter;
