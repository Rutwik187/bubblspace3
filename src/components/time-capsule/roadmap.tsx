"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import customNode from "@/components/custom-node";
import ReactMarkdown from "react-markdown";

interface RoadmapNodeData extends Record<string, unknown> {
  title: string;
  description: string;
  skills: string[];
  content: string;
}

interface RoadmapNode extends Node<RoadmapNodeData> {}

interface Roadmap {
  title: string;
  nodes: RoadmapNode[];
  edges: Edge[];
}

const nodeTypes = {
  custom: customNode,
};

export default function Roadmap({ roadmap }: { roadmap: Roadmap }) {
  // State management for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(
    roadmap.nodes as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(roadmap.edges);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as RoadmapNode);
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-blue-50"
      >
        <Controls />

        <Background gap={12} size={1} />
      </ReactFlow>

      <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <SheetContent className="w-[900px]">
          <SheetHeader>
            <SheetTitle>{selectedNode?.data.title}</SheetTitle>
            <SheetDescription>
              {selectedNode?.data.description}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNode?.data.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Description:</h3>

                <ReactMarkdown className="text-sm text-gray-600">
                  {selectedNode?.data.content}
                </ReactMarkdown>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Resources:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Online courses: Coursera, edX, Udacity</li>
                  <li>
                    Books: &quot;Pattern Recognition and Machine Learning&quot;
                    by Christopher Bishop
                  </li>
                  <li>
                    Tutorials: Towards Data Science, Machine Learning Mastery
                  </li>
                  <li>Practice: Kaggle competitions, GitHub projects</li>
                </ul>
              </div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/qYNweeDHiyU?si=XWWldNtw7jqnIwmn&amp;controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
