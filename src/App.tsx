import React from "react";
import { Hierarchy, PartGroups, TreeNode, Terms } from "./types";
import { filterHierarchy } from "./hierarchy";
import { TreeSelect } from "antd";
import { createTree } from "./tree";
import ComponentsFilter from "./ComponentsFilter";

type AppProps = {
  terms: Terms;
  hierarchy: Hierarchy;
  partGroups: PartGroups;
};

export default function App({ terms, hierarchy, partGroups }: AppProps) {
  return (
    <ComponentsFilter
      value=""
      onChange={() => {}}
      hierarchy={hierarchy}
      partGroups={partGroups}
    />
  );
}
