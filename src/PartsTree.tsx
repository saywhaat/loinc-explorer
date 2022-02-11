import React from "react";
import { Hierarchy, Parts, PartNode, PartGroups } from "./types";
import { filterHierarchy } from "./hierarchy";
import { createTree } from "./tree";
import { Tree, Typography } from "antd";
import PartTypeChip from "./PartTypeChip";
import Highlighter from "react-highlight-words";

function createFilteredTree(
  hierarchy: Hierarchy,
  filteredPartCodes: string[],
  parts: Parts
) {
  const [filteredHierarchy, extraLeafs] = filterHierarchy(
    hierarchy,
    filteredPartCodes
  );
  filteredHierarchy.UNCATEGORIZED = {
    code: "UNCATEGORIZED",
    parentCode: "",
    // text: "UNCATEGORIZED",
    path: "",
  };
  for (let i = 0; i < extraLeafs.length; i++) {
    const leaf = extraLeafs[i];
    filteredHierarchy[leaf] = {
      code: leaf,
      parentCode: "UNCATEGORIZED",
      // text: parts[leaf].name,
      path: "",
    };
  }

  return createTree(filteredHierarchy);
}

type Props = {
  search: string;
  height: number;
  hierarchy: Hierarchy;
  filteredPartCodes: string[];
  parts: Parts;
  partGroups: PartGroups;
  selectedPart: string | null;
  onSelectPart: (part: string | null) => void;
};

export default function PartsTree({
  search,
  hierarchy,
  filteredPartCodes,
  parts,
  height,
  partGroups,
  selectedPart,
  onSelectPart,
}: Props) {
  const [autoExpandParent, setAutoExpandParent] = React.useState(true);
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);

  const tree = React.useMemo(
    () => createFilteredTree(hierarchy, filteredPartCodes, parts),
    [hierarchy, filteredPartCodes, parts]
  );

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  React.useEffect(() => {
    if (search) {
      setExpandedKeys(filteredPartCodes);
      setAutoExpandParent(true);
    } else {
      setExpandedKeys([]);
      setAutoExpandParent(false);
    }
  }, [search]);

  return (
    <Tree
      selectedKeys={selectedPart ? [selectedPart] : []}
      onSelect={([selectedKey]) =>
        onSelectPart(selectedKey ? selectedKey.toString() : null)
      }
      autoExpandParent={autoExpandParent}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      treeData={tree}
      height={height}
      titleRender={(node) => {
        let partType = null;
        let title = "!!!!!!!";
        if (partGroups.classes[node.key]) {
          partType = "class";
          title = partGroups.classes[node.key].displayName;
        } else if (partGroups.components[node.key]) {
          partType = "component";
          title = partGroups.components[node.key].displayName;
        }
        return (
          <>
            <Highlighter
              highlightTag={({ children }) => (
                <Typography.Text mark>{children}</Typography.Text>
              )}
              searchWords={[search]}
              autoEscape={true}
              textToHighlight={title}
            />
            {partType ? <PartTypeChip type={partType} /> : null}
          </>
        );
      }}
    />
  );
}
