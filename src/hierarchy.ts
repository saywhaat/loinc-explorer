import { Hierarchy } from "./types";

export function filterHierarchy(
  hierarchy: Hierarchy,
  leafs: string[]
): [Hierarchy, string[]] {
  const filteredHierarchy: Hierarchy = {};
  const extraLeafs: string[] = [];
  leafs.forEach((leaf) => {
    let currentCode = leaf;
    while (currentCode) {
      const hierarchyNode = hierarchy[currentCode];
      if (hierarchyNode) {
        filteredHierarchy[currentCode] = hierarchyNode;
        currentCode = hierarchyNode.parentCode;
      } else {
        extraLeafs.push(currentCode);
        break;
      }
    }
  });
  return [filteredHierarchy, extraLeafs];
}
