import React from "react";
import { Card, Tree, Drawer, Input, Typography } from "antd";
import { Hierarchy, Parts, PartNode, PartGroups } from "./types";
import { filterHierarchy } from "./hierarchy";
import { createTree } from "./tree";
import AutoSizer from "react-virtualized-auto-sizer";
import PartTypeChip from "./PartTypeChip";
import Highlighter from "react-highlight-words";
import { useWindowWidth } from "@react-hook/window-size";
import PartsTree from "./PartsTree";

type ComponentsTreeProps = {
  search: string;
  height: number;
  hierarchy: Hierarchy;
  components: PartNode[];
};

const ComponentsTree = ({
  hierarchy,
  components,
  search,
  height,
}: ComponentsTreeProps) => {
  const [autoExpandParent, setAutoExpandParent] = React.useState(true);
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);

  const filteredComponents = components.filter((component) => {
    if (search) {
      return component.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });
  const filteredComponentCodes = filteredComponents.map((d) => d.code);

  const [filteredHierarchy, extraLeafs] = filterHierarchy(
    hierarchy,
    filteredComponentCodes
  );
  const componentsTree = createTree(filteredHierarchy, () => ({}));
  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  React.useEffect(() => {
    if (search) {
      setExpandedKeys(filteredComponentCodes);
      setAutoExpandParent(true);
    }
  }, [search]);

  return (
    <Tree
      autoExpandParent={autoExpandParent}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      treeData={componentsTree}
      selectable={false}
      height={height}
      titleRender={(node) => {
        return (
          <>
            <Highlighter
              highlightTag={({ children }) => (
                <Typography.Text mark>{children}</Typography.Text>
              )}
              searchWords={[search]}
              autoEscape={true}
              textToHighlight={node.title}
            />
            <PartTypeChip type="component" />
          </>
        );
      }}
    />
  );
};

type Props = {
  value: string;
  onChange: () => void;
  hierarchy: Hierarchy;
  partGroups: PartGroups;
};

export default function ComponentsFilter({
  value,
  onChange,
  hierarchy,
  partGroups,
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const windowWidth = useWindowWidth();

  const filteredComponents = Object.values(partGroups.components).filter(
    (component) => {
      if (search) {
        return component.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    }
  );
  const filteredComponentCodes = filteredComponents.map((d) => d.code);

  // const deferredSearch = React.useDeferredValue(search);

  return (
    <>
      <Card onClick={() => setVisible(true)}>1234</Card>
      <Drawer
        width={windowWidth - 200}
        visible={visible}
        closable={false}
        onClose={() => setVisible(false)}
        placement="left"
      >
        <Input.Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AutoSizer disableWidth>
          {({ height }) => (
            <PartsTree
              height={height - 8}
              hierarchy={hierarchy}
              filteredPartCodes={filteredComponentCodes}
              parts={partGroups.components}
              partGroups={partGroups}
              search={search}
            />
          )}
        </AutoSizer>
      </Drawer>
    </>
  );
}
