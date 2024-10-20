import * as hp from './jshelper';
import { type NodeData, NodeInfo } from './NodeInfo.svelte';
import { ProcessorOptions } from '$lib/ProcessorOptions.js';
import { CHILDREN } from '$lib/Constants';

export class TreeProcessor {
  // this is the input, typically a JSON document typically provided by the called
  //TODO: not sure we need to keep a ref on rawData
  public rawData: any;

  public nodeInfos: NodeInfo[] = $state([]);

  // this is a flattened tree, ready for virtuallist consumption
  public nodeInfosToRender: NodeInfo[] = $state([]);

  // used to find info from data
  private _infosMap: Map<NodeData, NodeInfo> = $state(new Map());

  private options: ProcessorOptions;

  // vuejs: this used to be afterSetStat
  afterSetInfoNode?: (info: NodeInfo, parent: NodeInfo | undefined, index: number) => void;
  // vuejs: this used to be afterRemoveStat
  afterRemoveInfoNode?: (info: NodeInfo) => void;

  // vuejs: this used to be statsHandler: (stats: Stat<any>[]) => Stat<any>[];
  infoNodesHandler?: (infos: NodeInfo[]) => NodeInfo[];

  // vuejs: this used to be  statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
  infoNodesFlatHandler?: (infosFlat: NodeInfo[]) => NodeInfo[];

  // vuejs: this used to be  statHandler: (stat: Stat<any>) => Stat<any>;
  infoHandler: (info: NodeInfo) => NodeInfo = info => info;

  private initialized: boolean = false;

  //TODO looks like data is not used!
  constructor(data: any[], opt?: ProcessorOptions) {
    this.options = opt ? opt : new ProcessorOptions();
  }

  public init() {
    if (!this.initialized) {
      this.initialized = true;
      console.log('TreeProcessor.init() called');
      const childrenKey = this.options.childrenKey;

      const td = new hp.TreeData([] as NodeInfo[]);
      this._infosMap.clear();

      hp.walkTreeData(
        this.rawData,
        (data, index, parent, path) => {
          const nodeInfo = this.infoHandler(
            new NodeInfo({
              data: data,
              expended: this.options.defaultOpen,
              parent: td.getParent(path),
              children: [],
              level: path.length
            })
          );
          this._infosMap.set(data, nodeInfo);
          td.set(path, nodeInfo);
        },
        { childrenKey }
      );

      console.log('td', td);

      const flat: typeof td.rootChildren = [];
      td.walk(nodeInfo => {
        flat.push(nodeInfo);
      });

      console.log('flat', flat);

      this.nodeInfos = this.infoNodesHandler
        ? this.infoNodesHandler(td.rootChildren)
        : td.rootChildren;
      this.nodeInfosToRender = this.infoNodesFlatHandler ? this.infoNodesFlatHandler(flat) : flat;
    }
  }

  public getNodeInfo(data: NodeData): NodeInfo {
    const r: NodeInfo = this._infosMap!.get(data)!;
    if (!r) {
      throw new NodeInfoNotFoundError('NodeInfo not found');
    }
    return r;
  }

  public has(infoOrData: NodeData | NodeInfo): boolean {
    if (infoOrData instanceof NodeInfo) {
      return this.nodeInfosToRender.indexOf(infoOrData) > -1;
    } else {
      try {
        const r = this.getNodeInfo(infoOrData);
        //TODO that's just a return true
        return Boolean(r).valueOf();
      } catch (error) {
        if (error instanceof NodeInfoNotFoundError) {
          return false;
        }
        throw error;
      }
    }
  }

  public _getPathByStat(info: NodeInfo | null): Array<number> {
    if (info === null) {
      return [];
    }
    const siblings = this.getSiblings(info);
    const index = siblings.indexOf(info);
    return [...(info.parent ? this._getPathByStat(info.parent) : []), index];
  }

  /**
   * call it after a nodeInfo's `checked` changed
   * @param info
   * @returns return false mean ignored
   */
  public afterOneCheckChanged(info: NodeInfo): boolean {
    const { checked } = info;
    if (info._ignoreCheckedOnce) {
      delete info._ignoreCheckedOnce;
      return false;
    }

    // change parent
    const checkParent = (info: NodeInfo) => {
      const parent = info.parent;
      if (parent) {
        let hasChecked = false;
        let hasUnchecked = false;
        let hasHalfChecked = false;
        for (const child of parent.children) {
          if (child.checked) {
            hasChecked = true;
          } else if (child.checked === 0) {
            hasHalfChecked = true;
          } else {
            hasUnchecked = true;
          }
        }

        const parentChecked = hasHalfChecked ? 0 : !hasUnchecked ? true : hasChecked ? 0 : false;

        if (parent.checked !== parentChecked) {
          this._ignoreCheckedOnce(parent);
          parent.checked = parentChecked;
        }
        checkParent(parent);
      }
    };

    checkParent(info);

    // change children
    hp.walkTreeData(
      info.children,
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

  private _ignoreCheckedOnce(info: NodeInfo) {
    info._ignoreCheckedOnce = true;
    // cancel ignore immediately if not triggered
    setTimeout(() => {
      if (info._ignoreCheckedOnce) {
        info._ignoreCheckedOnce = false;
      }
    }, 100);
  }

  public isVisible(infoOrData: NodeData | NodeInfo): boolean {
    const info: NodeInfo =
      infoOrData instanceof NodeInfo ? infoOrData : this.getNodeInfo(infoOrData);

    const walk = (n: NodeInfo | null | undefined) => {
      return !n || (!n.hidden && n.expended && walk(n.parent));
    };

    return !info.hidden && walk(info.parent);
  }

  /**
   * call it to update all stats' `checked`
   */
  public updateCheckboxes() {
    hp.walkTreeData(
      this.nodeInfos!,
      info => {
        if (info.children && info.children.length > 0) {
          const checked = info.children.every(v => v.checked);
          if (info.checked !== checked) {
            this._ignoreCheckedOnce(info);
            info.checked = checked;
          }
        }
      },
      { childFirst: true, childrenKey: CHILDREN }
    );
  }
  public getChecked(withDemi = false) {
    return this.nodeInfosToRender!.filter(v => {
      return v.checked || (withDemi && v.checked === 0);
    });
  }
  public getUnchecked(withDemi = true) {
    return this.nodeInfosToRender!.filter(v => {
      return withDemi ? !v.checked : v.checked === false;
    });
  }
  /**
   * open all nodes
   */
  public openAll() {
    for (const i of this.nodeInfosToRender!) {
      i.expended = true;
    }
  }
  /**
   * close all nodes
   */
  public closeAll() {
    for (const i of this.nodeInfosToRender!) {
      i.expended = false;
    }
  }

  public openNodeAndParents(infoOrData: NodeData | NodeInfo) {
    // @ts-ignore
    const stat:NodeInfo = infoOrData instanceof NodeInfo ? infoOrData : this.getNodeInfo(infoOrData) // prettier-ignore
    for (const parentStat of this.iterateParent(stat, {
      withSelf: true
    })) {
      parentStat.expended = true;
    }
  }

  // actions
  private _calcFlatIndex(parent?: NodeInfo, index: number) {
    let flatIndex = parent ? this.nodeInfosToRender!.indexOf(parent) + 1 : 0;
    const siblings = parent ? parent.children : this.nodeInfos!;
    for (let i = 0; i < index; i++) {
      flatIndex += this._count(siblings[i]);
    }
    return flatIndex;
  }

  public add(data: NodeData, parent?: NodeInfo | null, index?: number | null) {
    if (this.has(data)) {
      throw `Can't add because data exists in tree`;
    }
    const siblings = parent ? parent.children : this.nodeInfos!;
    if (index == null) {
      index = siblings.length;
    }

    const info: NodeInfo = this.infoHandler(
      new NodeInfo({
        expended: Boolean(this.options.defaultOpen),
        data: data,
        parent: parent || null,
        children: [],
        level: parent ? parent.level + 1 : 1
      })
    );
    this._setPosition(info, parent || null, index);
    // @ts-expect-error implicit any type
    const children = data[this.childrenKey];
    if (children) {
      const childrenSnap = children.slice();
      for (const child of childrenSnap) {
        this.add(child, info);
      }
    }
  }

  public remove(info: NodeInfo) {
    const siblings = this.getSiblings(info);
    if (siblings.includes(info)) {
      hp.arrayRemove(siblings, info);
      const stats = this._flat(info);
      this.nodeInfosToRender!.splice(this.nodeInfosToRender!.indexOf(info), stats.length);
      for (const stat of stats) {
        this._infosMap!.delete(stat.data);
      }
      //  this.afterRemoveStat(stat);
      this.afterRemoveInfoNode?.(info);
      return true;
    }
    return false;
  }

  public getSiblings(info: NodeInfo) {
    const { parent } = info;
    return parent ? parent.children : this.nodeInfos!;
  }
  /**
   * The node should not exist.
   */
  private _setPosition(info: NodeInfo, parent: NodeInfo | undefined, index: number) {
    const siblings = parent ? parent.children : this.nodeInfos!;
    siblings.splice(index, 0, info);
    info.parent = parent;
    info.level = parent ? parent.level + 1 : 1;
    const flatIndex = this._calcFlatIndex(parent, index);
    const stats = this._flat(info);
    this.nodeInfosToRender!.splice(flatIndex, 0, ...stats);
    for (const stat of stats) {
      if (!this._infosMap!.has(stat.data)) {
        this._infosMap!.set(stat.data, stat);
      }
    }
    hp.walkTreeData(
      info,
      (node, index, parent) => {
        if (parent) {
          node.level = parent.level + 1;
        }
      },
      { childrenKey: CHILDREN }
    );
    // vuejs: this.afterSetStat(stat, parent, index);
    this.afterSetInfoNode?.(info, parent, index);
  }

  // this is a generator function '*'
  public *iterateParent(info: NodeInfo, opt?: { withSelf: boolean }) {
    let t = opt?.withSelf ? info : info.parent;
    while (t) {
      yield t;
      t = t.parent;
    }
  }

  public move(info: NodeInfo, parent: NodeInfo | undefined, index: number) {
    if (this.has(info)) {
      if (info.parent === parent && this.getSiblings(info).indexOf(info) === index) {
        return false;
      }
      // check if is self
      if (info === parent) {
        // 不允许移动目标为自己
        throw new Error(`Can't move node to itself`);
      }
      // check if is descendant
      if (parent && info.level < parent.level) {
        let t;
        for (const item of this.iterateParent(parent)) {
          if (item.level === info.level) {
            t = item;
            break;
          }
        }
        if (info === t) {
          // 不允许移动节点到其后代节点下
          throw new Error(`Can't move node to its descendant`);
        }
      }
      this.remove(info);
    }
    this._setPosition(info, parent, index);
    return true;
  }
  /**
   * convert nodeInfo and its children to one-dimensional array
   * 转换节点和其后代节点为一维数组
   * @param info
   * @returns
   */
  private _flat(info: NodeInfo) {
    const r: NodeInfo[] = [];
    hp.walkTreeData(
      info,
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
   * @param info
   */
  private _count(info: NodeInfo) {
    return this._flat(info).length;
  }

  public getData(filter?: (data: NodeData) => NodeData, root?: NodeInfo) {
    const { childrenKey } = this.options;
    const td = new hp.TreeData<NodeData>([]);
    td.childrenKey = childrenKey;
    hp.walkTreeData(
      root || this.nodeInfos!,
      (info, index, parent, path) => {
        let newData = { ...info.data, [childrenKey]: [] };
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
