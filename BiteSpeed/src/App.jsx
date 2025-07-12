import "./App.css"
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./Components/FlowEditor";
import NodePanel from "./Components/NodePanel";

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{display:"flex"}}>
        <FlowEditor />
        <NodePanel/>
      </div>
    </ReactFlowProvider>
  );
}

