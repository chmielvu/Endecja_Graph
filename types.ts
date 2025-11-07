import { DataView } from 'vis-data/peer';

export interface Node {
  id: string;
  label: string;
  group: string;
  description: string;
  image: string;
  level?: number;
  title?: string; // For vis.js tooltip
  link?: string;
}

export interface Edge {
  id?: string;
  from: string;
  to: string;
  label: string;
  color?: { color: string };
  // FIX: Added optional 'dashes' property to support dashed lines for edges.
  dashes?: boolean;
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

export type LayoutType = 'physics' | 'hierarchical';
export type GraphDataView = DataView<Node, any>;