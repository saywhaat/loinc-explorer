import axios from "axios";
import { parse } from "papaparse";
import { Hierarchy, Parts, Terms, PartNode, PartGroups } from "./types";

export async function fetchHierarchy(): Promise<Hierarchy> {
  const response = await axios.get("/data/MultiAxialHierarchy.csv");
  const result: Hierarchy = {};
  await new Promise((complete) => {
    parse<any>(response.data, {
      header: true,
      worker: true,
      step({ data }) {
        const { CODE, PATH_TO_ROOT, CODE_TEXT, IMMEDIATE_PARENT } = data;
        if (!result[CODE] || result[CODE].path.length < PATH_TO_ROOT.length) {
          result[CODE] = {
            code: CODE,
            parentCode: IMMEDIATE_PARENT,
            // text: CODE_TEXT,
            path: PATH_TO_ROOT,
          };
        }
      },
      complete,
    });
  });
  return result;
}

export async function fetchParts(): Promise<PartGroups> {
  const response = await axios.get("/data/Part.csv");
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
  await new Promise((complete) => {
    parse<any>(response.data, {
      header: true,
      worker: true,
      step({ data }) {
        const { PartNumber, PartDisplayName, PartTypeName, Status } = data;
        const getParts = partTypeNameMapping[PartTypeName];
        if (getParts) {
          const parts = getParts(result);
          if (!parts[PartNumber]) {
            parts[PartNumber] = {
              code: PartNumber,
              status: Status,
              name: PartDisplayName,
            };
          } else {
            console.log("0-0001", PartTypeName, PartNumber);
          }
        } else {
          console.log("0-0000", PartTypeName);
        }
      },
      complete,
    });
  });

  return result;
}

export async function fetchTerms(): Promise<Terms> {
  const response = await axios.get("/data/LoincTableCore.csv");
  const result: Terms = {};
  await new Promise((complete) => {
    parse<any>(response.data, {
      header: true,
      worker: true,
      step({ data }) {
        const { LOINC_NUM } = data;
        result[LOINC_NUM] = {
          code: LOINC_NUM,
        };
      },
      complete,
    });
  });
  return result;
}
