const getNodesWithNoOutgoing = (nodes, edges) => {
  const targetNodeIds = new Set(edges.map((edge) => edge.target));
  return nodes.filter((node) => !targetNodeIds.has(node.id));
};

export const validateBeforeSave = (nodes, edges) => {
  const nodesWithNoOutgoing = getNodesWithNoOutgoing(nodes, edges);

  if (nodes.length > 1 && nodesWithNoOutgoing.length > 1) {
    return {
      valid: false,
      error: "❌ Error: More than one node has no outgoing connections.",
    };
  }

  return { valid: true };
};
