//TODO - Break this structure into NodeInfo and NodeData
// export interface NodeI {
//   label: string;
//   expanded?: boolean;
//   children?: NodeIArray;

//   // TODO: checked could also be a number for intermediary state
//   checked?: boolean;
//   //TODO: this should be calculated from the value of checked - rather than a field
//   indeterminate?: boolean;

//   style?: string;
//   class?: string;
// }

export class NodeI {
  label: string = $state('');
  nodeData: NodeD;
  expanded: boolean = $state(false);
  parent: NodeI | null = $state(null);
  children: NodeIArray = $state([]);
  level: number = $state(0);
  hidden: boolean = $state(false);
  // 0 mean just part of children checked, number allows for intermediary states
  checked: boolean = $state(false);
  indeterminate: boolean = $state(false);
  //null mean inherit parent
  //null mean inherit parent
  style: string | null = $state(null);
  class: string | null = $state(null);

  constructor(o?: PartialNodeI) {
    this.nodeData = o?.nodeData || null;
    this.expanded = o?.expanded || false;
    this.parent = o?.parent || null;
    this.children = o?.children || [];
    this.level = o?.level || 0;
    this.hidden = o?.hidden || false;
    this.checked = o?.checked || false;
    this.indeterminate = o?.indeterminate || false;

    this.style = o?.style || null;
    this.class = o?.class || null;
  }
}

export interface PartialNodeI extends Partial<NodeI> {}

export type OnToggleFn = (node: NodeI) => void;

export type NodeIArray = NodeI[];

export type NodeIDico = { [k: string]: NodeI };

export type NodeD = any;

// from TreeProcessor.svelte.ts
// public init() {
//   if (!this.initialized) {
//     this.initialized = true;
//     console.log('TreeProcessor.init() called');
//     const childrenKey = this.options.childrenKey;

//     const td = new hp.TreeData([] as NodeInfo[]);
//     this._infosMap = new Map();
//     hp.walkTreeData(
//       this.nodeData,
//       (nodeData, index, parent, path) => {
//         const nodeInfo = this.options.infoHandler(
//           new NodeInfo({
//             nodeData: nodeData,
//             expended: Boolean(this.options.defaultOpen),
//             parent: td.getParent(path),
//             children: [],
//             level: path.length
//           })
//         );
//         this._infosMap!.set(nodeData, nodeInfo);
//         td.set(path, nodeInfo);
//       },
//       { childrenKey }
//     );

//     console.log('td', td);

//     this.nodeInfos = this.options.infoNodesHandler(td.rootChildren);

//     // nodeInfosFlat = this.options.InfoNodesFlatHandler(flat)
//     const flat: typeof td.rootChildren = [];
//     td.walk(nodeInfo => {
//       flat.push(nodeInfo);
//     });

//     console.log('rootChildren', td.rootChildren);

//     this.nodeInfosToRender = this.options.InfoNodesFlatHandler(flat);
//   }
// }
