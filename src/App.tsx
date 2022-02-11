import React from "react";
import { Hierarchy, PartGroups, TreeNode, Terms } from "./types";
import { filterHierarchy } from "./hierarchy";
import { Layout, Menu, Drawer, Divider } from "antd";
import { createTree } from "./tree";
import ComponentList from "./ComponentList";
import PartInfo from "./PartInfo";

type AppProps = {
  terms: Terms;
  hierarchy: Hierarchy;
  partGroups: PartGroups;
};

export default function App({ terms, hierarchy, partGroups }: AppProps) {
  const [selectedPartType, setSelectedPartType] = React.useState<string | null>(
    null
  );
  const [selectedPart, setSelectedPart] = React.useState<string | null>(null);

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Sider>
        <Menu
          selectedKeys={selectedPartType ? [selectedPartType] : []}
          onSelect={({ key }) => setSelectedPartType(key)}
        >
          <Menu.Item key="components">Components</Menu.Item>
          <Menu.Item key="classes">Classes</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ position: "relative" }}>
        <Drawer
          title="Basic Drawer"
          width={1000}
          placement="left"
          closable={false}
          visible
          getContainer={false}
          style={{ position: "absolute" }}
          bodyStyle={{ display: "flex" }}
        >
          <div style={{ width: 500 }}>
            <ComponentList
              selectedPart={selectedPart}
              onSelectPart={setSelectedPart}
              hierarchy={hierarchy}
              partGroups={partGroups}
            />
          </div>

          <div>
            <PartInfo code={selectedPart} partGroups={partGroups} />
          </div>
        </Drawer>
      </Layout.Content>
    </Layout>
  );
}
