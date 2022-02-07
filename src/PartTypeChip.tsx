import React from "react";

const LEAF_TYPE_COLORS: any = {
  component: "dodgerblue",
  class: "seagreen",
  system: "salmon",
};

type LeafTypeChipProps = {
  type: "component" | "class" | "system";
};

export default function PartTypeChip({ type }: LeafTypeChipProps) {
  return (
    <span
      className="part-type-chip"
      style={{ background: LEAF_TYPE_COLORS[type] }}
    >
      {type}
    </span>
  );
}
