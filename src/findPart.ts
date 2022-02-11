import { PartGroups, PartNode } from "./types";

export function findPartByCode(
  partGroups: PartGroups,
  code: string
): (PartNode & { type: string }) | null {
  let type: keyof PartGroups;
  for (type in partGroups) {
    const partNode = partGroups[type][code];
    if (partNode) {
      return { ...partNode, type };
    }
  }
  return null;
}
