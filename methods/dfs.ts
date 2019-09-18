function dfs (tree, ope) {
  const walk = (tree, depth = 1) => {
    ope(tree.text, depth);

    if (tree.children) {
      tree.children.forEach(node => {
        walk(node, depth + 1);
      });
    }
  };
  
  walk(tree);
}