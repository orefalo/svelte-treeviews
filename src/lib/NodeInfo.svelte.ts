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
  data: NodeData;
  expended: boolean = $state(false);
  parent?: NodeInfo;
  children: NodeInfo[] = $state([]);
  level: number = 0;
  hidden: boolean = $state(false);
  // 0 mean just part of children checked, number allows for intermediary states
  checked: boolean | number = $state(false);
  //null mean inherit parent
  draggable?: boolean;
  //null mean inherit parent
  droppable?: boolean;
  //null mean inherit parent
  style?: string = $state('');
  class?: string = $state('');

  // used to identify if the data is a node or the data of the node
  // not needed anymore, it's a class
  //isNodeInfo: true;

  _ignoreCheckedOnce?: boolean;

  constructor(o?: PartialNodeInfo) {
    this.data = o?.data || null;
    this.expended = o?.expended || false;
    this.parent = o?.parent;
    this.children = o?.children || [];
    this.level = o?.level || 0;
    this.hidden = o?.hidden || false;
    this.checked = o?.checked || false;

    this.draggable = o?.draggable;
    this.droppable = o?.droppable;
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
