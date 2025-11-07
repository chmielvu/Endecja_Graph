import React, { useState } from 'react';
import { ingestDocument } from '../services/geminiService';
import { Node, Edge } from '../types';
import { useGraphStore } from '../services/useGraphStore';

interface Proposal {
    newNode: Node;
    newEdges: Edge[];
}

// Add this helper function
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const DocumentImporter: React.FC = () => {
    const { getNodesMap, addNode, addEdges } = useGraphStore();
    const [isLoading, setIsLoading] = useState(false);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);

    // --- NEW STATE ---
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setProposals([]);
        setFileName(file.name);
        setSelectedProposal(null); // Clear any previous selection
        setImageBase64(null);

        try {
            const content = await file.text();
            const existingIds: string[] = Array.from(getNodesMap().keys());
            // Use the service that *doesn't* ask for an image
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

    // --- NEW FUNCTION (Step 1) ---
    const handleSelectProposal = (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setImageBase64(null); // Clear any old image
    };

    // --- NEW FUNCTION (Step 2) ---
    const handleAddNodeWithImage = () => {
        if (!selectedProposal || !imageBase64) {
            alert("An image is required to add the node.");
            return;
        }

        const finalNode = {
            ...selectedProposal.newNode,
            image: imageBase64
        };

        addNode(finalNode);
        addEdges(selectedProposal.newEdges);
        setProposals(prev => prev.filter(p => p.newNode.id !== selectedProposal.newNode.id));

        // Reset the state
        setSelectedProposal(null);
        setImageBase64(null);
    };

    return (
        <div className="p-4 bg-stone-50 rounded-lg shadow-lg">
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

            {/* --- NEW CONDITIONAL UI --- */}

            {/* 1. If a proposal is selected, show the image upload UI */}
            {selectedProposal && (
                <div className="mt-4">
                    <h4 className="text-sm font-semibold">Step 2: Upload Image for:</h4>
                    <p className="text-lg font-bold text-gray-800 mb-2">{selectedProposal.newNode.label}</p>
                    
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Portrait (Required)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const base64String = await fileToBase64(e.target.files[0]);
                          setImageBase64(base64String);
                        }
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                        <button 
                          onClick={handleAddNodeWithImage} 
                          disabled={!imageBase64}
                          className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400">
                            Confirm & Add to Graph
                        </button>
                        <button 
                          onClick={() => { setSelectedProposal(null); setImageBase64(null); }} 
                          className="flex-1 px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* 2. If no proposal is selected, show the list of proposals */}
            {proposals.length > 0 && !selectedProposal && (
                <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Step 1: Select a Proposal to Add:</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {proposals.map((p, i) => (
                            <div key={i} className="p-2 bg-gray-100 rounded">
                                <p className="text-sm font-bold">{p.newNode.label}</p>
                                <p className="text-xs text-gray-600 mb-2">{p.newNode.description}</p>
                                <button 
                                  onClick={() => handleSelectProposal(p)} 
                                  className="w-full px-3 py-1 text-xs bg-indigo-700 text-white rounded hover:bg-indigo-800">
                                    Add Image...
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