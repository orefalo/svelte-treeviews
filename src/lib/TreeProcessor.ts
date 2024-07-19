import * as hp from './jshelper';
import { defaults, type NodeInfo, type NodeData } from './NodeInfo';

export const CHILDREN = 'children'; // inner childrenKey

class COptions {
  childrenKey: string = 'children';
  defaultOpen: boolean = false;

  public statsHandler(stats: NodeInfo[]) {
    return stats;
  }
  public statsFlatHandler(statsFlat: NodeInfo[]) {
    return statsFlat;
  }
  public afterSetStat(_stat: NodeInfo, _parent: NodeInfo | null, _index: number) {}
  public afterRemoveStat(_stat: NodeInfo) {}
  public statHandler(nodeInfo: NodeInfo) {
    return nodeInfo;
  }
}

export interface Options extends Partial<COptions> {
  noInitialization?: boolean;
}

export class TreeProcessor {
  public nodeData: NodeData;
  public nodeInfos: NodeInfo[];
  public nodeInfosFlat: NodeInfo[];
  private _infosMap: Map<NodeData, NodeInfo> | null;

  private options: COptions;

  constructor(opt?: COptions) {
    this.nodeInfos = [];
    this.nodeInfosFlat = [];
    this._infosMap = null;

    this.options = opt ? opt : new COptions();
  }

  public init() {
    const { childrenKey } = this.options;
    const td = new hp.TreeData([] as NodeInfo[]);
    this._infosMap = new Map();
    hp.walkTreeData(
      this.nodeData,
      (nodeData, index, parent, path) => {
        const nodeInfo = this.options.statHandler({
          ...defaults(),
          nodeData: nodeData,
          open: Boolean(this.options.defaultOpen),
          parent: td.getParent(path),
          children: [],
          level: path.length
        });
        this._infosMap!.set(nodeData, nodeInfo);
        td.set(path, nodeInfo);
      },
      { childrenKey }
    );

    const statsFlat: typeof td.rootChildren = [];
    td.walk(nodeInfo => {
      statsFlat.push(nodeInfo);
    });
    this.nodeInfos = this.options.statsHandler(td.rootChildren);
    this.nodeInfosFlat = this.options.statsFlatHandler(statsFlat);
    // this.initialized = true;
  }

  public getStat(nodeData: NodeData): NodeInfo {
    const r: NodeInfo = this._infosMap!.get(nodeData)!;
    if (!r) {
      throw new NodeInfoNotFoundError("NodeInfo not found");
    }
    return r;
  }

  public has(nodeInfoOrNodeData: NodeData | NodeInfo): boolean {
    if (nodeInfoOrNodeData['isNodeInfo']) {
      // @ts-ignore
      return this.nodeInfosFlat.indexOf(nodeInfoOrNodeData) > -1;
    } else {
      try {
        // @ts-ignore
        const r = this.getStat(nodeInfoOrNodeData);
        return Boolean(r);
      } catch (error) {
        if (error instanceof NodeInfoNotFoundError) {
          return false;
        }
        throw error;
      }
    }
  }

  private _getPathByStat(nodeInfo: NodeInfo | null): Array<number> {
    if (nodeInfo === null) {
      return [];
    }
    const siblings = this.getSiblings(nodeInfo);
    const index = siblings.indexOf(nodeInfo);
    return [...(nodeInfo.parent ? this._getPathByStat(nodeInfo.parent) : []), index];
  }

  /**
   * call it after a nodeInfo's `checked` changed
   * @param nodeInfo
   * @returns return false mean ignored
   */
  public afterOneCheckChanged(nodeInfo: NodeInfo): boolean {
    const { checked } = nodeInfo;
    if (nodeInfo._ignoreCheckedOnce) {
      delete nodeInfo._ignoreCheckedOnce;
      return false;
    }

    // change parent
    const checkParent = (nodeInfo: NodeInfo) => {
      const { parent } = nodeInfo;
      if (parent) {
        let hasChecked: boolean = false;
        let hasUnchecked: boolean = false;
        for (const child of parent.children) {
          if (child.checked || child.checked === 0) {
            hasChecked = true;
          } else {
            hasUnchecked = true;
            if (hasChecked && hasUnchecked) {
              break;
            }
          }
        }
        const parentChecked = !hasUnchecked ? true : hasChecked ? 0 : false;

        if (parent.checked !== parentChecked) {
          this._ignoreCheckedOnce(parent);
          parent.checked = parentChecked;
        }
        checkParent(parent);
      }
    };
    checkParent(nodeInfo);
    // change children
    hp.walkTreeData(
      nodeInfo.children,
      child => {
        if (child.checked !== checked) {
          this._ignoreCheckedOnce(child);
          child.checked = checked;
        }
      },
      { childrenKey: CHILDREN }
    );
    return true;
  }
  private _ignoreCheckedOnce(nodeInfo: NodeInfo) {
    nodeInfo._ignoreCheckedOnce = true;
    // cancel ignore immediately if not triggered
    setTimeout(() => {
      if (nodeInfo._ignoreCheckedOnce) {
        nodeInfo._ignoreCheckedOnce = false;
      }
    }, 100);
  }

  private isVisible(nodeInfoOrNodeData: NodeData | NodeInfo) {
    // @ts-ignore
    const nodeInfo: NodeInfo = nodeInfoOrNodeData["isNodeInfo"] ? nodeInfoOrNodeData : this.getStat(nodeInfoOrNodeData); // prettier-ignore
    const walk: (nodeInfo: NodeInfo | null) => boolean = (nodeInfo: NodeInfo | null) => {
      return !nodeInfo || (!nodeInfo.hidden && nodeInfo.open && walk(nodeInfo.parent));
    };
    return Boolean(!nodeInfo.hidden && walk(nodeInfo.parent));
  }
  /**
   * call it to update all stats' `checked`
   */
  public updateCheck() {
    hp.walkTreeData(
      this.nodeInfos!,
      stat => {
        if (stat.children && stat.children.length > 0) {
          const checked = stat.children.every(v => v.checked);
          if (stat.checked !== checked) {
            this._ignoreCheckedOnce(stat);
            stat.checked = checked;
          }
        }
      },
      { childFirst: true, childrenKey: CHILDREN }
    );
  }
  public getChecked(withDemi = false) {
    return this.nodeInfosFlat!.filter(v => {
      return v.checked || (withDemi && v.checked === 0);
    });
  }
  public getUnchecked(withDemi = true) {
    return this.nodeInfosFlat!.filter(v => {
      return withDemi ? !v.checked : v.checked === false;
    });
  }
  /**
   * open all nodes
   */
  public openAll() {
    for (const stat of this.nodeInfosFlat!) {
      stat.open = true;
    }
  }
  /**
   * close all nodes
   */
  public closeAll() {
    for (const stat of this.nodeInfosFlat!) {
      stat.open = false;
    }
  }

  public openNodeAndParents(nodeDataOrNodeInfo: NodeData | NodeInfo) {
    // @ts-ignore
    const stat:NodeInfo = nodeDataOrNodeInfo["isNodeInfo"] ? nodeDataOrNodeInfo : this.getStat(nodeDataOrNodeInfo) // prettier-ignore
    for (const parentStat of this.iterateParent(stat, {
      withSelf: true
    })) {
      parentStat.open = true;
    }
  }

  // actions
  private _calcFlatIndex(parent: NodeInfo | null, index: number) {
    let flatIndex = parent ? this.nodeInfosFlat!.indexOf(parent) + 1 : 0;
    const siblings = parent ? parent.children : this.nodeInfos!;
    for (let i = 0; i < index; i++) {
      flatIndex += this._count(siblings[i]);
    }
    return flatIndex;
  }

  public add(nodeData: NodeData, parent?: NodeInfo | null, index?: number | null) {
    if (this.has(nodeData)) {
      throw `Can't add because data exists in tree`;
    }
    const siblings = parent ? parent.children : this.nodeInfos!;
    if (index == null) {
      index = siblings.length;
    }

    const stat: NodeInfo = this.options.statHandler({
      ...defaults(),
      open: Boolean(this.options.defaultOpen),
      nodeData: nodeData,
      parent: parent || null,
      children: [],
      level: parent ? parent.level + 1 : 1
    });
    this._setPosition(stat, parent || null, index);
    // @ts-expect-error implicit any type
    const children = nodeData[this.childrenKey];
    if (children) {
      const childrenSnap = children.slice();
      for (const child of childrenSnap) {
        this.add(child, stat);
      }
    }
  }

  public remove(nodeInfo: NodeInfo) {
    const siblings = this.getSiblings(nodeInfo);
    if (siblings.includes(nodeInfo)) {
      hp.arrayRemove(siblings, nodeInfo);
      const stats = this._flat(nodeInfo);
      this.nodeInfosFlat!.splice(this.nodeInfosFlat!.indexOf(nodeInfo), stats.length);
      for (const stat of stats) {
        this._infosMap!.delete(stat.nodeData);
      }
      this.options.afterRemoveStat(nodeInfo);
      return true;
    }
    return false;
  }

  public getSiblings(nodeInfo: NodeInfo) {
    const { parent } = nodeInfo;
    return parent ? parent.children : this.nodeInfos!;
  }
  /**
   * The node should not exist.
   */
  private _setPosition(nodeInfo: NodeInfo, parent: NodeInfo | null, index: number) {
    const siblings = parent ? parent.children : this.nodeInfos!;
    siblings.splice(index, 0, nodeInfo);
    nodeInfo.parent = parent;
    nodeInfo.level = parent ? parent.level + 1 : 1;
    const flatIndex = this._calcFlatIndex(parent, index);
    const stats = this._flat(nodeInfo);
    this.nodeInfosFlat!.splice(flatIndex, 0, ...stats);
    for (const stat of stats) {
      if (!this._infosMap!.has(stat.nodeData)) {
        this._infosMap!.set(stat.nodeData, stat);
      }
    }
    hp.walkTreeData(
      nodeInfo,
      (node, index, parent) => {
        if (parent) {
          node.level = parent.level + 1;
        }
      },
      { childrenKey: CHILDREN }
    );
    this.options.afterSetStat(nodeInfo, parent, index);
  }

  // this is a generqtor function '*'
  public *iterateParent(stat: NodeInfo, opt?: { withSelf: boolean }) {
    let t = opt?.withSelf ? stat : stat.parent;
    while (t) {
      yield t;
      t = t.parent;
    }
  }

  public move(nodeInfo: NodeInfo, parent: NodeInfo | null, index: number) {
    if (this.has(nodeInfo)) {
      if (nodeInfo.parent === parent && this.getSiblings(nodeInfo).indexOf(nodeInfo) === index) {
        return false;
      }
      // check if is self
      if (nodeInfo === parent) {
        // 不允许移动目标为自己
        throw new Error(`Can't move node to it self`);
      }
      // check if is descendant
      if (parent && nodeInfo.level < parent.level) {
        let t;
        for (const item of this.iterateParent(parent)) {
          if (item.level === nodeInfo.level) {
            t = item;
            break;
          }
        }
        if (nodeInfo === t) {
          // 不允许移动节点到其后代节点下
          throw new Error(`Can't move node to its descendant`);
        }
      }
      this.remove(nodeInfo);
    }
    this._setPosition(nodeInfo, parent, index);
    return true;
  }
  /**
   * convert nodeInfo and its children to one-dimensional array
   * 转换节点和其后代节点为一维数组
   * @param nodeInfo
   * @returns
   */
  private _flat(nodeInfo: NodeInfo) {
    const r: NodeInfo[] = [];
    hp.walkTreeData(
      nodeInfo,
      child => {
        r.push(child);
      },
      { childrenKey: CHILDREN }
    );
    return r;
  }
  /**
   * get count of nodeInfo and its all children
   * 统计节点和其后代节点数量
   * @param nodeInfo
   */
  private _count(nodeInfo: NodeInfo) {
    return this._flat(nodeInfo).length;
  }

  public getData(filter?: (data: NodeData) => NodeData, root?: NodeInfo) {
    const { childrenKey } = this.options;
    const td = new hp.TreeData<NodeData>([]);
    td.childrenKey = childrenKey;
    hp.walkTreeData(
      root || this.nodeInfos!,
      (stat, index, parent, path) => {
        let newData = { ...stat.nodeData, [childrenKey]: [] };
        if (filter) {
          // @ts-ignore
          newData = filter(newData);
        }
        td.set(path, newData);
      },
      {
        childrenKey: CHILDREN
      }
    );
    return td.data;
  }
}

class NodeInfoNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StatNotFoundError';
  }
}
