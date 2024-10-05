// NodeData is your data!
export type NodeData = any;

/**
 * NodeInfo is shows at very element in the tree structure.
 * it shows the medadata (exoended, selected, children..etc), but also the data of the node itself
 **/
export class NodeInfo {
  // TODO: that's the catch all, check if it can be removed
  //  [x: string]: any;

  // vuejs: used to be called data
  nodeData: NodeData;
  expended: boolean;
  parent: NodeInfo | null;
  children: NodeInfo[];
  level: number;
  hidden: boolean;
  // 0 mean just part of children checked, number allows for intermediary states
  checked: boolean | number;
  //null mean inherit parent
  draggable: boolean | null;
  //null mean inherit parent
  droppable: boolean | null;
  //null mean inherit parent
  style?: string;
  class?: string;

  // used to identify if the data is a node or the data of the node
  // not needed anymore, it's a class
  //isNodeInfo: true;

  _ignoreCheckedOnce?: boolean;

  constructor(o?: PartialNodeInfo) {
    this.nodeData = o?.nodeData || null;
    this.expended = o?.expended || false;
    this.parent = o?.parent || null;
    this.children = o?.children || [];
    this.level = o?.level || 0;
    this.hidden = o?.hidden || false;
    this.checked = o?.checked || false;

    this.draggable = o?.draggable || null;
    this.droppable = o?.droppable || null;
    this.style = o?.style;
    this.class = o?.class;

    this._ignoreCheckedOnce = o?._ignoreCheckedOnce;
  }

  public toggleExpand() {
    console.log('nodeInfo.toggleExpand');
    this.expended = !this.expended;
    console.log(this.expended);
  }

  public toggleChecked() {
    console.log('nodeInfo.toggleChecked');
    this.checked = !this.checked;
    console.log(this.checked);
  }
}

export interface PartialNodeInfo extends Partial<NodeInfo> {}

// export function defaults(): NodeInfo {
//   return new NodeInfo();
//   // return {
//   //   nodeData: null,
//   //   open: false,
//   //   parent: null,
//   //   children: [],
//   //   level: 0,
//   //   hidden: false,
//   //   checked: false,
//   //   draggable: null,
//   //   droppable: null,
//   //   style: null,
//   //   class: null,
//   //   isNodeInfo: true
//   // };
// }
