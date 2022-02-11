import React from "react";
import { Card, Tree, Drawer, Input } from "antd";
import { Hierarchy, Parts, PartNode, PartGroups } from "./types";
import AutoSizer from "react-virtualized-auto-sizer";
import PartsTree from "./PartsTree";
import { sortBy } from "lodash";

function getFilteredComponentCodes(parts: Parts, search: string): string[] {
  const result: string[] = [];
  for (let code in parts) {
    const part = parts[code];
    if (search) {
      if (!part.name.toLowerCase().includes(search.toLowerCase())) {
        continue;
      }
    }
    result.push(code);
  }
  return result;
}

type Props = {
  selectedPart: string | null;
  onSelectPart: (part: string | null) => void;
  hierarchy: Hierarchy;
  partGroups: PartGroups;
};

export default function ComponentList({
  selectedPart,
  onSelectPart,
  hierarchy,
  partGroups,
}: Props) {
  const [search, setSearch] = React.useState("");

  const filteredComponentCodes = getFilteredComponentCodes(
    partGroups.components,
    search
  );

  return (
    <>
      <Input.Search
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AutoSizer disableWidth>
        {({ height }) => (
          <PartsTree
            selectedPart={selectedPart}
            onSelectPart={onSelectPart}
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
