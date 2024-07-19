// Todo: rename to NodeDecorator

export type NodeData = any;

export interface NodeInfo {
  // TODO: that's the catch all, check if can be removed
  //  [x: string]: any;
  nodeData: NodeData;
  open: boolean;
  parent: NodeInfo | null;
  children: NodeInfo[];
  level: number;
  hidden: boolean;
  checked: boolean | 0; // 0 mean just part of children checked
  // 0 mean just part of children checked
  draggable: boolean | null; //null mean inherit parent
  //null mean inherit parent
  droppable: boolean | null; //null mean inherit parent
  //null mean inherit parent
  style: string | null;
  class: string | null;

  // used to identify if the data is a node or the data of the node
  isNodeInfo: true;

  _ignoreCheckedOnce?: boolean;
}

export function defaults(): NodeInfo {
  return {
    nodeData: null,
    open: false,
    parent: null,
    children: [],
    level: 0,
    hidden: false,
    checked: false,
    draggable: null,
    droppable: null,
    style: null,
    class: null,
    isNodeInfo: true
  };
}
