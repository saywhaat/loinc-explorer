import React from "react";
import { Descriptions } from "antd";
import { PartGroups } from "./types";
import { findPartByCode } from "./findPart";

type Props = {
  code: string | null;
  partGroups: PartGroups;
};

export default function PartInfo({ code, partGroups }: Props) {
  if (!code) {
    return null;
  }

  const part = findPartByCode(partGroups, code);

  if (!part) {
    return null;
  }

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Code">
        <a target="_blank" href={`https://loinc.org/${code}`}>
          {code}
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="Name">{part.name}</Descriptions.Item>
      <Descriptions.Item label="Display name">
        {part.displayName}
      </Descriptions.Item>
    </Descriptions>
  );
}
