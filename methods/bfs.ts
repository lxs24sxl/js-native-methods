function bfs (tree, ope) {
  const walk = (tree, depth = 1) => {
    const queue = [];
    ope(tree.name, depth);
    if (tree.children) {
      queue.push({
        nodes: tree.children,
        depth: depth + 1
      });
    }

    while(queue.length) {
      const item = queue.pop();
      item.nodes && item.nodes.forEach(node => {
        ope(node.name, item.depth);
        if (node.children) {
          queue.push({
            nodes: node.children,
            depth: item.depth + 1
          });
        }
      });
    }
  }
  walk(tree);
}