import React from "react";
import { Card, Tree, Drawer, Input, Typography } from "antd";
import { Hierarchy, Parts, TreeNode } from "./types";
import { filterHierarchy } from "./hierarchy";
import { createTree } from "./tree";
import AutoSizer from "react-virtualized-auto-sizer";
import PartTypeChip from "./PartTypeChip";
import Highlighter from "react-highlight-words";

type ComponentsTreeProps = {
  search: string;
  height: number;
  hierarchy: Hierarchy;
  components: Parts;
};

const ComponentsTree = ({
  hierarchy,
  components,
  search,
  height,
}: ComponentsTreeProps) => {
  let componentKeys = Object.keys(components);
  if (search) {
    componentKeys = componentKeys.filter((key) => {
      const component = components[key];
      return component.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  const [filteredHierarchy, extraLeafs] = filterHierarchy(
    hierarchy,
    componentKeys
  );
  const componentsTree = createTree(filteredHierarchy, () => ({}));

  return (
    <Tree
      autoExpandParent
      expandedKeys={search ? componentKeys : []}
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
  components: Parts;
};

export default function ComponentsFilter({
  value,
  onChange,
  hierarchy,
  components,
}: Props) {
  const [visible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // const deferredSearch = React.useDeferredValue(search);

  return (
    <>
      <Card onClick={() => setVisible(true)}>1234</Card>
      <Drawer
        width={600}
        visible={visible}
        onClose={() => setVisible(false)}
        placement="left"
      >
        <Input.Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AutoSizer disableWidth>
          {({ height }) => (
            <ComponentsTree
              height={height}
              hierarchy={hierarchy}
              components={components}
              search={search}
            />
          )}
        </AutoSizer>
      </Drawer>
    </>
  );
}
