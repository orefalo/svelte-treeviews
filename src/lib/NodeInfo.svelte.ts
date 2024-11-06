/*
 * NodeInfo is shows at very element in the tree structure.
 * it shows the medadata (exoended, selected, children..etc), but also the data of the node itself
 **/
export class NodeInfo<T> {
  data: T;
  expended: boolean = $state(false);
  parent?: NodeInfo<T>;
  children: NodeInfo<T>[] = $state([]);
  level: number = 0;
  hidden: boolean = $state(false);
  // 0 means indetermined, true/false
  checked: boolean | 0 = $state(false);
  //null mean inherit parent
  draggable?: boolean;
  //null mean inherit parent
  droppable?: boolean;
  //null mean inherit parent
  style?: string = $state('');
  class?: string = $state('');

  _ignoreCheckedOnce?: boolean;

  constructor(o?: PartialNodeInfo<T>) {
    this.data = o?.data || (null as T);
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
    this.expended = !this.expended;
  }

  public toggleChecked() {
    this.checked = !this.checked;
  }
}

export interface PartialNodeInfo<T> extends Partial<NodeInfo<T>> {}
