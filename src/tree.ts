import { Hierarchy, TreeNode } from "./types";

export function createTree<T>(
  hierarchy: Hierarchy,
  getProps: any = () => ({})
): TreeNode<T>[] {
  const result: TreeNode<T>[] = [];
  const entries: { [code: string]: number } = {};
  const nodes: TreeNode<T>[] = [];
  let i = 0;
  for (let code in hierarchy) {
    const props = getProps(code);
    entries[code] = i;
    nodes[i] = {
      key: code,
      parentCode: hierarchy[code].parentCode,
      children: [],
      // title: hierarchy[code].text,
      ...props,
    };
    i++;
  }
  for (i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.parentCode) {
      nodes[entries[node.parentCode]].children.push(node);
    } else {
      result.push(node);
    }
  }
  return result;
}
