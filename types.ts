
export interface Node {
  id: string;
  label: string;
  group: string;
  description: string;
  image: string;
  level?: number;
  title?: string; // For vis.js tooltip
}

export interface Edge {
  from: string;
  to: string;
  label: string;
  color?: { color: string };
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export enum ChatMode {
  Chat = 'Chat',
  Grounded = 'Grounded',
  Thinking = 'Thinking',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string, title: string }[];
}
