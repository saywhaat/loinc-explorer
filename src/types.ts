export type HierarchyNode = {
  code: string;
  parentCode: string;
  text: string;
  path: string;
};

export type Hierarchy = { [code: string]: HierarchyNode };

export type PartNode = {
  code: string;
  status: string;
  name: string;
};

export type Parts = { [code: string]: PartNode };

export type PartGroups = {
  components: Parts;
  suffixes: Parts;
  challenges: Parts;
  adjustments: Parts;
  properties: Parts;
  timeAspects: Parts;
  systems: Parts;
  scales: Parts;
  methods: Parts;
};

export type TermNode = {
  code: string;
};

export type Terms = { [code: string]: TermNode };

export type TreeNode<T = {}> = {
  key: string;
  title: string;
  children: TreeNode<T>[];
  parentCode: string;
} & T;

type Component = {
  path: string[];
  mainPart: string;
  suffixCode: string;
  challengeCode: string;
  adjustmentCode: string;
};

type System = {
  path: string[];
  mainPart: string;
  superSystemCode: string;
};

type Class = {
  path: string[];
};

export type LoincItem = {
  code: string;
  component: Component;
  propertyCode: string;
  timeCode: string;
  system: System;
  scaleCode: string;
  methodCode: string | null;
  class: Class;
  status: string;
};
