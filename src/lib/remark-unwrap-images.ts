type MdastNode = {
  type: string;
  children?: MdastNode[];
};

/** 将单独占段的 markdown 图片从 <p> 中提出，避免块级内容嵌在 p 内 */
export function remarkUnwrapImages() {
  return (tree: MdastNode) => {
    if (tree.children) visitParents(tree);
  };
}

function visitParents(node: MdastNode) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const paraChildren = child.children;

    if (
      child.type === "paragraph" &&
      paraChildren?.length === 1 &&
      paraChildren[0].type === "image"
    ) {
      children[i] = paraChildren[0];
      continue;
    }

    if (child.children) {
      visitParents(child);
    }
  }
}
