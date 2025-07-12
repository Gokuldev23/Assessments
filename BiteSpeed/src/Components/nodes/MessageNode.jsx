import React from "react";
import { Handle, Position } from "@xyflow/react";

const MessageNode = ({ data }) => {
  return (
    <div className="border border-blue-600 rounded-xl min-w-xs overflow-clip">
      {/* Left handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />

      {/* Display the message */}
      <div className="text-blue-200 text-xl py-1 px-4 font-semibold bg-blue-500">
        {data?.label || "Message..."}
      </div>
      <div className="text-black p-2 bg-white">
        {data?.content || "Message..."}
      </div>

      {/* Right handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#007acc" }}
      />
    </div>
  );
};

export default MessageNode;
