import NewNode from "./NewNode";
import { validateBeforeSave } from "../js/utils";
import { useStore } from "../stores/store";

export default function NodePanel() {
  // This hook will only work if the component it's used in is a child of a
  // <ReactFlowProvider />.
  const handleManualSave = () => {
    const { nodes, edges, nodeIDs } = useStore.getState();
  
    const { valid, error } = validateBeforeSave(nodes, edges);
  
    if (!valid) {
      alert(error); // or show custom UI
      return;
    }
  
    localStorage.setItem(
      "chatbot-flow",
      JSON.stringify({ nodes, edges, nodeIDs })
    );
  
    alert("✅ Flow saved successfully!");
  };

  return (
    <aside style={{ width: "400px", height: "100vh" }} className="p-4 border border-t-0">
      <div className="bg-gray-200 py-2 mb-4">
        <button onClick={handleManualSave} className="px-10 font-medium cursor-pointer py-2 rounded-xl border mx-auto block bg-white border-blue-500">
          Save flow
        </button>
      </div>
      <div className="nodes">
        <NewNode
          nodeType="messageNode"
          label="Message"
          content="Test Message"
        />
      </div>
    </aside>
  );
}
