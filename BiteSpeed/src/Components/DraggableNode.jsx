export const DraggableNode = ({ type, label, content, onClick }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType, label, content };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "#1C2536",
        justifyContent: "center",
        flexDirection: "column",
      }}
      draggable
      onClick={onClick}
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </div>
  );
};
