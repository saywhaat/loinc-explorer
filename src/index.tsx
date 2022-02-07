import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { Tree, Radio } from "antd";
import { Hierarchy, Parts, TreeNode, Terms } from "./types";
import AutoSizer from "react-virtualized-auto-sizer";
// import LeafTypeChip from "./LeafTypeChip";
import { fetchTerms, fetchHierarchy, fetchParts } from "./dataProviders";
import App from "./App";

/*
function createTree(hierarchy: Hierarchy, parts: Parts): TreeNode[] {
  const result: TreeNode[] = [];
  const entries: { [code: string]: number } = {};
  const nodes: TreeNode[] = [];
  let i = 0;
  for (let code in hierarchy) {
    entries[code] = i;
    nodes[i] = {
      key: code,
      parentCode: hierarchy[code].parentCode,
      children: [],
      title: hierarchy[code].text,
      type: parts[code]?.type,
      payload: 0,
    };
    i++;
  }
  for (i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.parentCode) {
      nodes[entries[node.parentCode]].children.push(node);
    } else {
      result.push(node);
    }
  }
  return result;
}
*/

// function fillTree(
//   tree: TreeNode[],
//   includeLeaf: (node: TreeNode) => boolean
// ): void {
//   const calcPayload = (node: TreeNode) => {
//     let result = 0;
//     node.children.forEach((childNode) => {
//       result += calcPayload(childNode);
//     });
//     node.payload = result;
//     if (includeLeaf(node)) {
//       result++;
//     }
//     return result;
//   };

//   tree.forEach((node) => {
//     calcPayload(node);
//   });
// }

/*
function getLeafsByType(
  parts: Parts,
  terms: Terms,
  leafType: string
): Set<string> {
  const result = new Set<string>();
  if (leafType === "TERM") {
    for (let code in terms) {
      result.add(code);
    }
  } else {
    for (let code in parts) {
      if (parts[code].type === leafType) {
        result.add(code);
      }
    }
  }
  return result;
}
*/

type AppProps = {
  terms: Terms;
  hierarchy: Hierarchy;
  parts: Parts;
};

const Qq = ({ terms, hierarchy, parts }: AppProps) => {
  const [leafType, setLeafType] = React.useState("TERM");
  // const leafs = getLeafsByType(parts, terms, leafType);
  // const [filteredHierarchy, extraLeafs] = filterHierarchy(hierarchy, leafs);

  // filteredHierarchy.UNSORTED = {
  //   code: "UNSORTED",
  //   parentCode: "",
  //   text: "UNSORTED",
  //   path: "",
  // };
  // for (let i = 0; i < extraLeafs.length; i++) {
  //   const leaf = extraLeafs[i];
  //   filteredHierarchy[leaf] = {
  //     code: leaf,
  //     parentCode: "UNSORTED",
  //     text: parts[leaf].name,
  //     path: "",
  //   };
  // }

  /*
  const tree = createTree(filteredHierarchy, parts);

  fillTree(tree, (node) => leafs.has(node.key));

  return (
    <div style={{ height: "100vh" }}>
      <Radio.Group
        size="small"
        optionType="button"
        options={["TERM", "COMPONENT", "CLASS", "SYSTEM"]}
        onChange={(e) => setLeafType(e.target.value)}
        value={leafType}
      />
      <AutoSizer disableWidth>
        {({ height }) => (
          <Tree
            treeData={tree}
            selectable={false}
            height={height}
            titleRender={(node) => {
              return (
                <span>
                  {node.title}
                  {node.payload ? <strong>&ensp;{node.payload}</strong> : null}
                  <LeafTypeChip node={node} />
                </span>
              );
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
  */
  return null;
};

(async () => {
  const [terms, hierarchy, partGroups] = await Promise.all([
    fetchTerms(),
    fetchHierarchy(),
    fetchParts(),
  ]);

  const container = document.getElementById("root");
  if (!container) return;
  const root = ReactDOM.createRoot(container);
  root.render(
    <App terms={terms} hierarchy={hierarchy} partGroups={partGroups} />
  );
})();
