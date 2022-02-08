import axios from "axios";
// @ts-ignore
import { parse } from "csv-parse/dist/esm/sync";
import { Hierarchy, Parts, Terms, PartNode, PartGroups } from "./types";

export async function fetchHierarchy(): Promise<Hierarchy> {
  const response = await axios.get("/data/MultiAxialHierarchy.csv");
  const items = parse(response.data, { columns: true });
  const result: Hierarchy = {};
  for (let i = 0; i < items.length; i++) {
    const { CODE, PATH_TO_ROOT, CODE_TEXT, IMMEDIATE_PARENT } = items[i];
    if (!result[CODE] || result[CODE].path.length < PATH_TO_ROOT.length) {
      result[CODE] = {
        code: CODE,
        parentCode: IMMEDIATE_PARENT,
        text: CODE_TEXT,
        path: PATH_TO_ROOT,
      };
    }
  }
  return result;
}

export async function fetchParts(): Promise<PartGroups> {
  const response = await axios.get("/data/Part.csv");
  const items = parse(response.data, { columns: true });

  const result: PartGroups = {
    components: {},
    suffixes: {},
    challenges: {},
    adjustments: {},
    properties: {},
    timeAspects: {},
    systems: {},
    scales: {},
    methods: {},
    classes: {},
  };
  const partTypeNameMapping: {
    [key: string]: (partsGroups: PartGroups) => Parts;
  } = {
    ADJUSTMENT: (d) => d.adjustments,
    CHALLENGE: (d) => d.challenges,
    COMPONENT: (d) => d.components,
    METHOD: (d) => d.methods,
    PROPERTY: (d) => d.properties,
    SCALE: (d) => d.scales,
    SUFFIX: (d) => d.suffixes,
    SYSTEM: (d) => d.systems,
    TIME: (d) => d.timeAspects,
    CLASS: (d) => d.classes,
  };
  for (let i = 0; i < items.length; i++) {
    const { PartNumber, PartName, PartTypeName, Status } = items[i];
    const getParts = partTypeNameMapping[PartTypeName];
    if (getParts) {
      const parts = getParts(result);
      if (!parts[PartNumber]) {
        parts[PartNumber] = {
          code: PartNumber,
          status: Status,
          name: PartName,
        };
      } else {
        console.log("0-0001", PartTypeName, PartNumber);
      }
    } else {
      console.log("0-0000", PartTypeName);
    }
  }
  return result;
}

export async function fetchTerms(): Promise<Terms> {
  const response = await axios.get("/data/LoincTableCore.csv");
  const items = parse(response.data, { columns: true });
  const result: Terms = {};
  for (let i = 0; i < items.length; i++) {
    const { LOINC_NUM } = items[i];
    result[LOINC_NUM] = {
      code: LOINC_NUM,
    };
  }
  return result;
}
