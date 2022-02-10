import React from "react";
import { Card, Tree, Drawer, Input, Typography, Row, Col, Select } from "antd";
import { Hierarchy, Parts, PartNode, PartGroups } from "./types";
import { filterHierarchy } from "./hierarchy";
import { createTree } from "./tree";
import AutoSizer from "react-virtualized-auto-sizer";
import PartTypeChip from "./PartTypeChip";
import Highlighter from "react-highlight-words";
import { useWindowWidth } from "@react-hook/window-size";
import PartsTree from "./PartsTree";

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
  const [search, setSearch] = React.useState("");

  const filteredComponents = Object.values(partGroups.components).filter(
    (component) => {
      if (search) {
        return component.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    }
  );
  const filteredComponentCodes = filteredComponents.map((d) => d.code);
  // console.log(Object.values(partGroups.suffixes));
  // const deferredSearch = React.useDeferredValue(search);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          {/* <Select
            style={{ width: "100%" }}
            options={new Array(1).fill("qqqq").map((d) => ({
              value: d,
              label: d,
            }))}
          /> */}
        </Col>
        <Col span={6}>
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

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
    </>
  );
}
