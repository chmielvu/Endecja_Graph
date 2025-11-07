import { GoogleGenAI, GenerateContentResponse, GroundingChunk, Part } from "@google/genai";
import { GEMINI_FLASH, GEMINI_PRO } from '../constants';
import { ChatMessage, ChatMode, Node, Edge } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- SOTA: "In-Memory GraphRAG" Helper ---
const findNeighbors = (nodeId: string, nodes: Node[], edges: Edge[], depth: number = 1): string => {
    const nodesMap = new Map(nodes.map(n => [n.id, n]));
    const neighbors = new Set<string>();
    const queue: [string, number][] = [[nodeId, 0]];
    const visited = new Set<string>([nodeId]);

    while(queue.length > 0) {
        const [currentId, currentDepth] = queue.shift()!;
        
        if (currentDepth >= depth) continue;

        const connectedEdges = edges.filter(e => e.from === currentId || e.to === currentId);
        for (const edge of connectedEdges) {
            const neighborId = edge.from === currentId ? edge.to : edge.from;
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                neighbors.add(neighborId);
                queue.push([neighborId, currentDepth + 1]);
            }
        }
    }

    let context = "";
    neighbors.forEach(id => {
        const node = nodesMap.get(id);
        if (node) {
            context += `- ${node.label} (${node.group}): ${node.description}\n`;
        }
    });
    return context;
};


const processApiResponse = (response: GenerateContentResponse): ChatMessage => {
  const modelResponse: ChatMessage = {
    role: 'model',
    text: response.text.trim(),
  };

  const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
  if (groundingMetadata?.groundingChunks) {
    const sources = (groundingMetadata.groundingChunks as GroundingChunk[])
      .filter(chunk => chunk.web?.uri)
      .map(chunk => ({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri,
      }));
    if (sources.length > 0) {
      modelResponse.sources = sources;
    }
  }
  return modelResponse;
};

// --- SOTA: Refactored Agentic Chat Service ---
export const runChat = async (history: ChatMessage[], message: string, mode: ChatMode, graphContext: { nodes: Node[], edges: Edge[], selectedNode: Node | null }): Promise<ChatMessage> => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    let systemInstruction = "You are an AI Tutor specializing in Polish history. Be concise, helpful, and accurate.";
    
    // In-Memory GraphRAG logic
    let localContext = "General knowledge about the Polish National Democracy movement.";
    if (graphContext.selectedNode) {
        localContext = `The user has pre-selected the node "${graphContext.selectedNode.label}". Its description is: "${graphContext.selectedNode.description}".\n`;
        const neighborContext = findNeighbors(graphContext.selectedNode.id, graphContext.nodes, graphContext.edges);
        if (neighborContext) {
            localContext += `\nRelated entities:\n${neighborContext}`;
        }
    }
    systemInstruction += `\n\nUse the following context from the knowledge graph to answer the user's question:\nCONTEXT:\n${localContext}`;

    const contents = [...chatHistory, { role: 'user', parts: [{ text: message }] }];

    switch (mode) {
      case ChatMode.Grounded:
        const groundedResult = await ai.models.generateContent({
          model: GEMINI_FLASH,
          contents,
          config: { systemInstruction, tools: [{googleSearch: {}}] }
        });
        return processApiResponse(groundedResult);

      case ChatMode.Thinking:
        const proResult = await ai.models.generateContent({
          model: GEMINI_PRO,
          contents,
          config: { systemInstruction, thinkingConfig: { thinkingBudget: 32768 } }
        });
        return processApiResponse(proResult);
      
      case ChatMode.Chat:
      default:
        const chatResult = await ai.models.generateContent({
            model: GEMINI_FLASH,
            contents,
            config: { systemInstruction }
        });
        return processApiResponse(chatResult);
    }
  } catch (error) {
    console.error("Error running chat with Gemini:", error);
    return { role: 'model', text: "Sorry, I encountered an error. Please try again." };
  }
};

export const proposeNewGraphData = async (topic: string, existingNodeIds: string[]): Promise<string> => {
  const systemInstruction = `You are a historical data formatting agent. You return *ONLY* a valid JSON object matching this structure:
{
  "newNode": { "id": "string", "label": "string", "group": "string", "description": "string", "image": "URL_string", "level": number, "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
  "newEdges": [ { "from": "new_node_id", "to": "existing_node_id", "label": "string" } ]
}
RULES:
1. "newNode.id" *MUST* be new, unique, lowercase. It *CANNOT* be any of these: ${existingNodeIds.join(', ')}
2. "newNode.image" *MUST* be a real, direct image URL.
3. "newEdges[].from" *MUST* match "newNode.id".
4. "newEdges[].to" *MUST* be one of the existing node IDs provided.
5. "start" and "end" dates are optional but preferred.
6. Do not include any text, markdown, or apologies before or after the JSON object.`;

  const contents = [{ role: 'user', parts: [{ text: `Research "${topic}" and its relationship to the Polish Endecja movement. Generate the JSON object.` }] }];

  try {
    const result = await ai.models.generateContent({
      model: GEMINI_PRO,
      contents: contents,
      config: { systemInstruction, tools: [{googleSearch: {}}] },
    });
    return result.text;
  } catch (error) {
    console.error("Error proposing new graph data:", error);
    return JSON.stringify({ "error": "Failed to generate data." });
  }
};

// --- SOTA: Multimodal Analysis Service ---
export const analyzeImage = async (imageUrl: string): Promise<string> => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const blob = await response.blob();
        const reader = new FileReader();
        const base64Data = await new Promise<string>((resolve, reject) => {
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        const imagePart: Part = {
            inlineData: {
                mimeType: blob.type,
                data: base64Data,
            },
        };
        const textPart: Part = { text: "Analyze the tone, setting, clothing, and implied status from this historical portrait. Be insightful and detailed." };

        const result = await ai.models.generateContent({
            model: GEMINI_PRO, // multimodal model
            contents: { parts: [imagePart, textPart] },
        });

        return result.text;
    } catch (error) {
        console.error("Error analyzing image:", error);
        return "Failed to analyze the image. Please check if the URL is valid and allows direct access.";
    }
};

// --- SOTA: Mass-Context KGOT Service ---
export const ingestDocument = async (fileContent: string, existingNodeIds: string[]): Promise<string> => {
    const systemInstruction = `You are a Knowledge Graph Offload Task (KGOT) agent. Your task is to read the entire provided document and extract new entities relevant to Polish history and the Endecja movement.
You must return *ONLY* a valid JSON object containing a list of proposed new nodes and edges.
The JSON object *MUST* match this exact structure:
{
  "proposals": [
    {
      "newNode": { "id": "string", "label": "string", "group": "string", "description": "string", "image": "URL_string", "level": number, "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" },
      "newEdges": [ { "from": "new_node_id", "to": "existing_node_id", "label": "string" } ]
    }
  ]
}
RULES:
1.  For each new entity found, create a complete 'proposal' object.
2.  The "newNode.id" for each proposal *MUST* be a new, unique, lowercase string. It *CANNOT* be any of these existing IDs: ${existingNodeIds.join(', ')}
3.  The "newNode.description" must be a concise summary derived *from the document*.
4.  The "newEdges[].to" *MUST* be one of the existing node IDs provided.
5.  Do research to find a valid direct image URL for each "newNode.image".
6.  If no new entities are found, return { "proposals": [] }.
7.  Do not include any text, markdown, or apologies before or after the JSON object.`;

    const contents = [
        { role: 'user', parts: [{ text: "Here is the document. Please process it and generate the KGOT JSON object." }, {text: fileContent}] }
    ];

    try {
        const result = await ai.models.generateContent({
            model: GEMINI_PRO,
            contents: contents,
            config: { systemInstruction, tools: [{googleSearch: {}}] },
        });
        return result.text;
    } catch (error) {
        console.error("Error ingesting document:", error);
        return JSON.stringify({ "error": "Failed to process document." });
    }
};
