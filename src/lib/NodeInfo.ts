// NodeData is your data!
export type NodeData = any;

// NodeInfo is the medadata to hold a not in a tree
export class NodeInfo {
  // TODO: that's the catch all, check if can be removed
  //  [x: string]: any;
  nodeData: NodeData;
  expended: boolean;
  parent: NodeInfo | null;
  children: NodeInfo[];
  level: number;
  hidden: boolean;
  checked: boolean | number; // 0 mean just part of children checked, number allows for intermediary states
  // 0 mean just part of children checked
  draggable: boolean | null; //null mean inherit parent
  //null mean inherit parent
  droppable: boolean | null; //null mean inherit parent
  //null mean inherit parent
  style: string | null;
  class: string | null;

  // used to identify if the data is a node or the data of the node
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
    this.style = o?.style || null;
    this.class = o?.class || null;

    this._ignoreCheckedOnce = o?._ignoreCheckedOnce;
  }

  public toggleExpand() {
    console.log('nodeInfo.toggleExpand');
    this.expended = !this.expended;
    console.log(this.expended)
  }
  public toggleChecked() {
    console.log('nodeInfo.toggleChecked');
    this.checked = !this.checked;
    console.log(this.checked)
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
