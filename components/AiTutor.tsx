import React, { useState, useRef, useEffect } from 'react';
import { runChat } from '../services/geminiService';
import { ChatMessage, ChatMode } from '../types';
import { useGraphStore } from '../services/useGraphStore';

const AiTutor: React.FC = () => {
  const { allNodes, allEdges, getSelectedNode } = useGraphStore();
  const selectedNode = getSelectedNode();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>(ChatMode.Chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const graphContext = {
      nodes: allNodes,
      edges: allEdges,
      selectedNode,
    };

    try {
      const modelResponse = await runChat(messages, input, mode, graphContext);
      setMessages(prev => [...prev, modelResponse]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "An error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const ModeButton: React.FC<{ value: ChatMode, label: string, icon: React.ReactElement }> = ({ value, label, icon }) => (
    <button
      onClick={() => setMode(value)}
      className={`flex-1 flex items-center justify-center p-2 text-xs rounded-md transition-colors ${mode === value ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      title={label}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">AI Tutor</h2>
        <div className="flex gap-2 mt-3">
          <ModeButton value={ChatMode.Chat} label="Chat" icon={<ChatBubbleIcon />} />
          <ModeButton value={ChatMode.Grounded} label="Web Search" icon={<SearchIcon />} />
          <ModeButton value={ChatMode.Thinking} label="Deep Analysis" icon={<BrainIcon />} />
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-sm md:max-w-md ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                {msg.sources && (
                  <div className="mt-3 pt-2 border-t border-gray-300">
                    <h4 className="text-xs font-bold mb-1">Sources:</h4>
                    <ul className="text-xs space-y-1">
                      {msg.sources.map((source, i) => (
                        <li key={i}>
                          <a href={source.uri} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 break-all">
                            {source.title || source.uri}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
                 <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the graph..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-blue-300">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

export default AiTutor;