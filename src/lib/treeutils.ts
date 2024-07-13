import * as hp from './jshelper';
import { statDefault, type Stat } from './Stat';

export const CHILDREN = 'children'; // inner childrenKey

class COptions {
  childrenKey: string = 'children';
  defaultOpen: boolean = false;

  public statsHandler(stats: Stat[]) {
    return stats;
  }
  public statsFlatHandler(statsFlat: Stat[]) {
    return statsFlat;
  }
  public afterSetStat(_stat: Stat, _parent: Stat | null, _index: number) {}
  public afterRemoveStat(_stat: Stat) {}
  public statHandler(stat: Stat) {
    return stat;
  }
}

export interface Options extends Partial<COptions> {
  noInitialization?: boolean;
}

export class TreeProcessor<T> {
  public data: any;
  public stats: Stat[] | null;
  public statsFlat: Stat[] | null;
  private _statsMap: Map<T, Stat> | null;
  //  private initialized: boolean;

  private options: COptions;

  constructor(opt?: COptions) {
    this.stats = null;
    this.statsFlat = null;
    this._statsMap = null;
    // this.initialized = false;
    this.options = opt ? opt : new COptions();
  }

  public init() {
    const { childrenKey } = this.options;
    const td = new hp.TreeData([] as Stat[]);
    this._statsMap = new Map();
    hp.walkTreeData(
      this.data,
      (nodeData, index, parent, path) => {
        const stat = this.options.statHandler({
          ...statDefault(),
          data: nodeData,
          open: Boolean(this.options.defaultOpen),
          parent: td.getParent(path),
          children: [],
          level: path.length
        });
        this._statsMap!.set(nodeData, stat);
        td.set(path, stat);
      },
      { childrenKey }
    );

    const statsFlat: typeof td.rootChildren = [];
    td.walk(stat => {
      statsFlat.push(stat);
    });
    this.stats = this.options.statsHandler(td.rootChildren);
    this.statsFlat = this.options.statsFlatHandler(statsFlat);
    // this.initialized = true;
  }

  public getStat(nodeData: T): Stat {
    const r: Stat = this._statsMap!.get(nodeData)!;
    if (!r) {
      throw new StatNotFoundError(`Stat not found`);
    }
    return r;
  }

  public has(nodeData: T | Stat): boolean {
    if (nodeData['isStat']) {
      // @ts-ignore
      return this.statsFlat.indexOf(nodeData) > -1;
    } else {
      try {
        // @ts-ignore
        const r = this.getStat(nodeData);
        return Boolean(r);
      } catch (error) {
        if (error instanceof StatNotFoundError) {
          return false;
        }
        throw error;
      }
    }
  }

  private _getPathByStat(stat: Stat | null): Array<number> {
    if (stat === null) {
      return [];
    }
    const siblings = this.getSiblings(stat);
    const index = siblings.indexOf(stat);
    return [...(stat.parent ? this._getPathByStat(stat.parent) : []), index];
  }

  /**
   * call it after a stat's `checked` changed
   * @param stat
   * @returns return false mean ignored
   */
  public afterOneCheckChanged(stat: Stat): boolean {
    const { checked } = stat;
    if (stat._ignoreCheckedOnce) {
      delete stat._ignoreCheckedOnce;
      return false;
    }

    // change parent
    const checkParent = (stat: Stat) => {
      const { parent } = stat;
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
    checkParent(stat);
    // change children
    hp.walkTreeData(
      stat.children,
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
  private _ignoreCheckedOnce(stat: Stat) {
    stat._ignoreCheckedOnce = true;
    // cancel ignore immediately if not triggered
    setTimeout(() => {
      if (stat._ignoreCheckedOnce) {
        stat._ignoreCheckedOnce = false;
      }
    }, 100);
  }
  private isVisible(statOrNodeData: T | Stat) {
    // @ts-ignore
    const stat: Stat = statOrNodeData["isStat"] ? statOrNodeData : this.getStat(statOrNodeData); // prettier-ignore
    const walk: (stat: Stat | null) => boolean = (stat: Stat | null) => {
      return !stat || (!stat.hidden && stat.open && walk(stat.parent));
    };
    return Boolean(!stat.hidden && walk(stat.parent));
  }
  /**
   * call it to update all stats' `checked`
   */
  public updateCheck() {
    hp.walkTreeData(
      this.stats!,
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
    return this.statsFlat!.filter(v => {
      return v.checked || (withDemi && v.checked === 0);
    });
  }
  public getUnchecked(withDemi = true) {
    return this.statsFlat!.filter(v => {
      return withDemi ? !v.checked : v.checked === false;
    });
  }
  /**
   * open all nodes
   */
  public openAll() {
    for (const stat of this.statsFlat!) {
      stat.open = true;
    }
  }
  /**
   * close all nodes
   */
  public closeAll() {
    for (const stat of this.statsFlat!) {
      stat.open = false;
    }
  }

  public openNodeAndParents(nodeOrStat: T | Stat) {
    // @ts-ignore
    const stat:Stat = nodeOrStat["isStat"] ? nodeOrStat : this.getStat(nodeOrStat) // prettier-ignore
    for (const parentStat of this.iterateParent(stat, {
      withSelf: true
    })) {
      parentStat.open = true;
    }
  }

  // actions
  private _calcFlatIndex(parent: Stat | null, index: number) {
    let flatIndex = parent ? this.statsFlat!.indexOf(parent) + 1 : 0;
    const siblings = parent ? parent.children : this.stats!;
    for (let i = 0; i < index; i++) {
      flatIndex += this._count(siblings[i]);
    }
    return flatIndex;
  }

  public add(nodeData: T, parent?: Stat | null, index?: number | null) {
    if (this.has(nodeData)) {
      throw `Can't add because data exists in tree`;
    }
    const siblings = parent ? parent.children : this.stats!;
    if (index == null) {
      index = siblings.length;
    }

    const stat: Stat = this.options.statHandler({
      ...statDefault(),
      open: Boolean(this.options.defaultOpen),
      data: nodeData,
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

  public remove(stat: Stat) {
    const siblings = this.getSiblings(stat);
    if (siblings.includes(stat)) {
      hp.arrayRemove(siblings, stat);
      const stats = this._flat(stat);
      this.statsFlat!.splice(this.statsFlat!.indexOf(stat), stats.length);
      for (const stat of stats) {
        this._statsMap!.delete(stat.data);
      }
      this.options.afterRemoveStat(stat);
      return true;
    }
    return false;
  }

  public getSiblings(stat: Stat) {
    const { parent } = stat;
    return parent ? parent.children : this.stats!;
  }
  /**
   * The node should not exsit.
   * @param node
   * @param parent
   * @param index
   */
  private _setPosition(stat: Stat, parent: Stat | null, index: number) {
    const siblings = parent ? parent.children : this.stats!;
    siblings.splice(index, 0, stat);
    stat.parent = parent;
    stat.level = parent ? parent.level + 1 : 1;
    const flatIndex = this._calcFlatIndex(parent, index);
    const stats = this._flat(stat);
    this.statsFlat!.splice(flatIndex, 0, ...stats);
    for (const stat of stats) {
      if (!this._statsMap!.has(stat.data)) {
        this._statsMap!.set(stat.data, stat);
      }
    }
    hp.walkTreeData(
      stat,
      (node, index, parent) => {
        if (parent) {
          node.level = parent.level + 1;
        }
      },
      { childrenKey: CHILDREN }
    );
    this.options.afterSetStat(stat, parent, index);
  }

  // this is a generqtor function '*'
  public *iterateParent(stat: Stat, opt?: { withSelf: boolean }) {
    let t = opt?.withSelf ? stat : stat.parent;
    while (t) {
      yield t;
      t = t.parent;
    }
  }

  public move(stat: Stat, parent: Stat | null, index: number) {
    if (this.has(stat)) {
      if (stat.parent === parent && this.getSiblings(stat).indexOf(stat) === index) {
        return false;
      }
      // check if is self
      if (stat === parent) {
        // 不允许移动目标为自己
        throw new Error(`Can't move node to it self`);
      }
      // check if is descendant
      if (parent && stat.level < parent.level) {
        let t;
        for (const item of this.iterateParent(parent)) {
          if (item.level === stat.level) {
            t = item;
            break;
          }
        }
        if (stat === t) {
          // 不允许移动节点到其后代节点下
          throw new Error(`Can't move node to its descendant`);
        }
      }
      this.remove(stat);
    }
    this._setPosition(stat, parent, index);
    return true;
  }
  /**
   * convert stat and its children to one-dimensional array
   * 转换节点和其后代节点为一维数组
   * @param stat
   * @returns
   */
  private _flat(stat: Stat) {
    const r: Stat[] = [];
    hp.walkTreeData(
      stat,
      child => {
        r.push(child);
      },
      { childrenKey: CHILDREN }
    );
    return r;
  }
  /**
   * get count of stat and its all children
   * 统计节点和其后代节点数量
   * @param stat
   */
  private _count(stat: Stat) {
    return this._flat(stat).length;
  }

  public getData(filter?: (data: T) => T, root?: Stat) {
    const { childrenKey } = this.options;
    const td = new hp.TreeData<T>([]);
    td.childrenKey = childrenKey;
    hp.walkTreeData(
      root || this.stats!,
      (stat, index, parent, path) => {
        let newData = { ...stat.data, [childrenKey]: [] };
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

class StatNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StatNotFoundError';
  }
}
