import { useState, useRef, useCallback, useEffect } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import { useStore } from "../stores/store";
import { shallow } from "zustand/shallow";
import MessageNode from "./nodes/MessageNode";


import "@xyflow/react/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  messageNode: MessageNode,
};

const FlowEditor = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = useStore((state) => state.nodes, shallow);
  const edges = useStore((state) => state.edges, shallow);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = (nodeID, type, label, content) => ({
    id: nodeID,
    nodeType: type,
    label: label ?? "", // fallback
    content: content ?? ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("chatbot-flow");
    if (saved) {
      const { nodes, edges, nodeIDs } = JSON.parse(saved);
      useStore.setState({ nodes, edges, nodeIDs });
    }
  }, []);
  
  

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const { nodeType, label, content } = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        let type = nodeType
        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }


        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type ,label ,content),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#fffff" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowEditor