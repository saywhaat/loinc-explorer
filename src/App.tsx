import React from "react";
import { Hierarchy, PartGroups, TreeNode, Terms } from "./types";
import { filterHierarchy } from "./hierarchy";
import { Layout, Menu, Drawer, Select } from "antd";
import { createTree } from "./tree";
import ComponentsFilter from "./ComponentsFilter";

type AppProps = {
  terms: Terms;
  hierarchy: Hierarchy;
  partGroups: PartGroups;
};

export default function App({ terms, hierarchy, partGroups }: AppProps) {
  const [selectedPart, setSelectedPart] = React.useState<string | null>(null);
  /*
   <ComponentsFilter
      value=""
      onChange={() => {}}
      hierarchy={hierarchy}
      partGroups={partGroups}
    />
  */

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Sider>
        <Menu
          selectedKeys={selectedPart ? [selectedPart] : []}
          onSelect={({ key }) => setSelectedPart(key)}
        >
          <Menu.Item key="components">Components</Menu.Item>
          <Menu.Item key="classes">Classes</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ position: "relative" }}>
        <Drawer
          title="Basic Drawer"
          width={800}
          placement="left"
          closable={false}
          visible
          getContainer={false}
          style={{ position: "absolute" }}
        >
          <ComponentsFilter
            value=""
            onChange={() => {}}
            hierarchy={hierarchy}
            partGroups={partGroups}
          />
        </Drawer>
      </Layout.Content>
    </Layout>
  );
}
