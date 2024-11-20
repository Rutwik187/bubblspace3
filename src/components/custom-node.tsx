import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import { RoadmapNode } from "@/types/timecapsules";

const CustomNode = ({ data }: { data: RoadmapNode }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-foreground max-w-xs relative">
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold text-primary text-center">
          {data.title}
        </div>
        <div className="text-sm text-gray-500 text-center mt-1">
          {data.description}
        </div>
        <div className="flex flex-wrap justify-center mt-2">
          {data.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="m-1">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-red-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-red-500"
      />
    </div>
  );
};

export default memo(CustomNode);
