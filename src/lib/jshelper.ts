function isArray<T>(v: unknown): v is any[] {
  return Object.prototype.toString.call(v) === '[object Array]';
}

function isObject(v: unknown): v is object {
  return Object.prototype.toString.call(v) === '[object Object]';
}
function isFunction(v: unknown): v is Function {
  return typeof v === 'function';
}

function arrayLast<T>(arr: T[]) {
  return arr[arr.length - 1];
}

/**
 * If n greater than `max`, return `max`, else n.
 * 如果n大于max, 返回max, 否则n.
 * @param n
 * @param max
 * @returns
 */
// function notGreaterThan<T>(n: T, max: T) {
//   return n < max ? n : max;
// }

//YES
export function arrayRemove(arr: any[], v: any) {
  let index;
  let count = 0;
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }
  return count;
}

// loop for Array, Object, NodeList, String
export type IterateAllOptions = {
  reverse?: boolean;
  exclude?: (info: { value: any; index: number } | { value: any; key: string }) => boolean;
};
export function* iterateAll<T>(
  val: string | any[] | object | NodeList | HTMLCollection,
  opt: IterateAllOptions = {}
): Generator<{ value: T; index?: number; key?: string }> {
  // opt: {reverse, exclude}
  if (!opt.reverse) {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = 0; i < val.length; i++) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  } else {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = val.length - 1; i >= 0; i--) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val);
      keys.reverse();
      for (const key of keys) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  }
}

// YES
export function assignIfNoKey(obj: object, key: string, val: any) {
  if (!obj.hasOwnProperty(key)) {
    obj[key] = val;
  }
}

//YES
export function objectAssignIfNoKey<T extends object>(obj1: T, obj2: object) {
  Object.keys(obj2).forEach(key => {
    assignIfNoKey(obj1, key, obj2[key]);
  });
  return obj1;
}

export function withoutUndefined<T extends object>(obj: T) {
  // @ts-ignore
  const r: T = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      r[key] = obj[key];
    }
  });
  return r;
}

export type MapObjectTreeHandler = (
  value: any,
  key: string | number,
  parent: object | any[],
  newParent: object | any[]
) =>
  | void
  | null
  | undefined
  | {
      key?: string;
      delete?: boolean;
      value?: any;
      skip?: boolean; // skip children
      stop?: boolean;
    };
/**
 * walk object and change key, value, delete key. return cloned new object.
 * 深度遍历对象, 可以改变key, value, 删除key. 返回克隆的新对象.
 * @param obj
 * @param handler
 * return null: don't change anything
 * return {delete: true}: delete
 * return {key: newKey}: change key
 * return {value: newValue}: change value
 * return {skip: true}: skip children
 * return {stop: true}: stop
 * @param limit to prevent circular reference.
 * @returns
 */
export function mapObjectTree(obj: object, handler: MapObjectTreeHandler, limit = 10000): object {
  let r;
  let count = 0;
  const stack = [{ value: obj }];
  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`;
    }
    count++;
    // @ts-ignore
    const { value, key, parent, newParent } = stack.shift();
    const t = handler(value, key, parent, newParent);
    const assign = (value, key, canPush) => {
      if (isArray(value)) {
        value = [];
      } else if (isObject(value)) {
        value = {};
      }
      if (parent) {
        if (isArray(newParent) && canPush) {
          newParent.push(value);
        } else {
          newParent[key] = value;
        }
      } else {
        r = value;
      }
      // value may changed
      return value;
    };
    let newVal, val, toDelete, stop, skip;
    if (!t) {
      // no change
      val = value;
      // @ts-ignore
      newVal = assign(value, key);
    } else {
      const { key: key2, value } = t;
      val = value;
      // @ts-ignore
      if (t.delete || key2 === false) {
        // del
        toDelete = true;
      } else if (key2 == null) {
        // don't change key
        newVal = assign(value, key, true);
      } else if (t.hasOwnProperty('value')) {
        // @ts-ignore
        newVal = assign(value, key2);
      }
      ({ stop, skip } = t);
    }
    if (toDelete) {
      continue;
    }
    if (skip) {
      continue;
    }
    if (stop) {
      break;
    }
    if (isArray(val)) {
      const len = val.length;
      for (let i = 0; i < len; i++) {
        // @ts-ignore
        stack.push({ value: val[i], key: i, parent: val, newParent: newVal });
      }
    } else if (isObject(val)) {
      Object.keys(val).forEach(key => {
        // @ts-ignore
        stack.push({ value: val[key], key, parent: val, newParent: newVal });
      });
    }
  }
  return r;
}

/**
 * [{id: 1}, {id: 2}] to {'1':{id: 1}, '2': {id: 2}}
 * @param arr
 * @param idKey
 * @returns
 */
export function mapObjects<T>(
  arr: T[],
  idKey: string | ((item: T, index: number) => string)
): { [key: string]: T } {
  const r = {};
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    // @ts-ignore
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }
  return r;
}

/**
 * example: pairRows(users, userProfiles, 'id', 'user_id')
 * @param rows1
 * @param rows2
 * @param key1
 * @param key2
 * @returns [{row1|null, row2|null},...]
 */
export function joinRows<T, Y>(
  rows1: T[],
  rows2: Y[],
  key1: string | ((row: T, index: number) => any),
  key2?: string,
  ignoreUnmatched?: boolean
): [T | null, Y | null][] {
  if (key2 === null) {
    // @ts-ignore
    key2 = key1;
  }
  const m1 = new Map<unknown, T>();
  const m2 = new Map<unknown, Y>();
  const r: any = [];
  rows2.forEach((row, index) => {
    // @ts-ignore
    const key = typeof key2 === 'function' ? key2(row, index) : row[key2];
    m2.set(key, row);
  });
  const usedRows2 = new Set();
  rows1.forEach((row, index) => {
    // @ts-ignore
    const key = typeof key1 === 'function' ? key1(row, index) : row[key1];
    m1.set(key, row);
    let row2 = m2.has(key) ? m2.get(key) : null;
    if (m2.has(key) || !ignoreUnmatched) {
      r.push([row, row2]);
      usedRows2.add(row2);
    }
  });
  if (!ignoreUnmatched) {
    rows2.forEach((row, index) => {
      // @ts-ignore
      const key = typeof key2 === 'function' ? key2(row, index) : row[key2];
      if (!usedRows2.has(row)) {
        r.push([null, row]);
      }
    });
  }
  return r;
}

export type TreeDataPath = number[];
export type WalkTreeDataHandler<T> = (
  node: T,
  index: number,
  parent: T | null,
  path: TreeDataPath
) => void | false | 'skip children' | 'skip siblings';
export type WalkTreeDataOptions = {
  childrenKey?: string;
  reverse?: boolean;
  childFirst?: boolean;
};
/**
 * walk tree data by with depth first search. tree data example: `[{children: [{}, {}]}]`
 * 深度优先遍历树形数据. 树形数据示例: `[{children: [{}, {}]}]`
 * @param obj
 * @param handler
 * @param opt
 */
//YES
export function walkTreeData<T>(
  obj: T | T[],
  handler: WalkTreeDataHandler<T>,
  opt: WalkTreeDataOptions = {}
) {
  opt = objectAssignIfNoKey(
    { ...opt },
    {
      childrenKey: 'children'
    }
  );
  const childrenKey = opt.childrenKey as string;
  const rootChildren = isArray(obj) ? obj : [obj];
  //
  class StopException {}
  const func = (children, parent, parentPath) => {
    if (opt.reverse) {
      children = children.slice();
      children.reverse();
    }
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const item = children[i];
      const index = opt.reverse ? len - i - 1 : i;
      const path = parentPath ? [...parentPath, index] : [];
      let childReturn;
      if (opt.childFirst) {
        if (item[childrenKey] != null) {
          childReturn = func(item[childrenKey], item, path);
        }
      }
      const r = handler(item, index, parent, path);
      if (r === false) {
        // stop
        throw new StopException();
      } else if (r === 'skip children') {
        continue;
      } else if (r === 'skip siblings') {
        break;
      }
      if (!opt.childFirst) {
        if (item[childrenKey] != null) {
          func(item[childrenKey], item, path);
        }
      }
    }
  };
  try {
    func(rootChildren, null, isArray(obj) ? [] : null);
  } catch (e) {
    if (e instanceof StopException) {
      // stop
    } else {
      throw e;
    }
  }
}
export type TreeDataNodeInfo<T> = {
  node: T;
  index: number;
  parent: T | null;
  path: TreeDataPath;
};
/**
 * like Array.find
 * @param obj
 * @param handler return true when found.
 * @param opt
 * @returns
 */
export function findInfoInTreeData<T>(
  obj: T | T[],
  handler: FindTreeDataHandler<T>,
  opt: FindTreeDataOptions = {}
): TreeDataNodeInfo<T> | undefined {
  let r: TreeDataNodeInfo<T>;
  walkTreeData(
    obj,
    (...args) => {
      if (handler(...args)) {
        r = {
          node: args[0],
          index: args[1],
          parent: args[2],
          path: args[3]
        };
        return false;
      }
    },
    opt
  );
  return r;
}

/**
 * like Array.find
 * @param obj
 * @param handler return true when found.
 * @param opt
 * @returns
 */
export function findTreeData<T>(
  obj: T | T[],
  handler: FindTreeDataHandler<T>,
  opt: FindTreeDataOptions = {}
): T | undefined {
  const r = findInfoInTreeData(obj, handler, opt);
  return r?.node;
}
export type FindTreeDataHandler<T> = ReplaceReturnType<WalkTreeDataHandler<T>, any>;
export type FindTreeDataOptions = WalkTreeDataOptions;

export function cloneTreeData<T>(
  root: T,
  options?: { childrenKey?: string; nodeHandler?: CloneTreeNodeHandler<any> }
) {
  const opt: typeof options = {
    childrenKey: 'children'
  };
  if (options) {
    Object.assign(opt, options);
  }

  const childrenKey = opt.childrenKey as string;
  const nodeHandler = opt.nodeHandler;

  const td = new TreeData();
  td.childrenKey = childrenKey as string;
  walkTreeData(
    root,
    (node, index, parent, path) => {
      let newNode = Object.assign({}, node);
      if (newNode[childrenKey]) {
        newNode[childrenKey] = [];
      }
      if (nodeHandler) {
        newNode = nodeHandler(newNode, { oldNode: node, index, parent, path });
      }
      td.set(path, newNode);
    },
    { childrenKey }
  );
  return td.data as T;
}

export type CloneTreeNodeHandler<T> = (
  node: T,
  info: {
    oldNode: T;
    index: number;
    parent: T | null;
    path: TreeDataPath;
  }
) => T;

// tree data helpers
export class TreeData<Node> {
  data: Node | Node[];
  childrenKey = 'children';
  // data = null;
  constructor(data: Node | Node[] = []) {
    this.data = data;
  }
  get rootChildren(): Node[] {
    const { childrenKey } = this;
    const { data } = this;
    return isArray(data) ? data : data[childrenKey];
  }
  *iteratePath(
    path: TreeDataPath,
    opt: { reverse?: boolean } = {}
  ): IterableIterator<{ path: TreeDataPath; node: Node }> {
    const { childrenKey, rootChildren } = this;
    if (!opt.reverse) {
      let prevPath: number[] = [];
      let prevNode;
      let prevChildren = rootChildren;
      for (const index of path) {
        const currentPath = [...prevPath, index];
        const currentNode = prevChildren[index];
        yield { path: currentPath, node: currentNode };
        prevPath = currentPath;
        prevNode = currentNode;
        prevChildren = currentNode[childrenKey];
      }
    } else {
      const list = [...this.iteratePath(path, { ...opt, reverse: false })];
      list.reverse();
      for (const { path: path0, node } of list) {
        const path = <TreeDataPath>path0;
        yield { path, node };
      }
    }
  }
  getFamily(path: TreeDataPath) {
    const all: Node[] = [];
    for (const { node } of this.iteratePath(path)) {
      all.push(node);
    }
    return all;
  }
  get(path: TreeDataPath): Node {
    return arrayLast(this.getFamily(path));
  }
  getParentAndIndex(path: TreeDataPath) {
    const parentPath = path.slice();
    const index = parentPath.pop() as number;
    return { parent: this.get(parentPath), index, parentPath };
  }
  getParent(path: TreeDataPath) {
    return this.getParentAndIndex(path).parent;
  }
  set(path: TreeDataPath, node: Node) {
    if (path === null || path.length === 0) {
      this.data = node;
    } else {
      const { childrenKey } = this;
      let { rootChildren } = this;
      const { parent, index } = this.getParentAndIndex(path);
      let parentChildren;
      if (path.length === 1) {
        // fix data
        if (!rootChildren) {
          if (this.data) {
            this.data[childrenKey] = [];
          } else {
            this.data = [];
          }
        }
        parentChildren = rootChildren;
      } else {
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        parentChildren = parent[childrenKey];
      }
      parentChildren[index] = node;
    }
  }
  delete(path: TreeDataPath): Node | undefined {
    const { childrenKey, rootChildren } = this;
    const { parent, index } = this.getParentAndIndex(path);
    const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
    const node = parentChildren[index];
    parentChildren.splice(index, 1);
    return node;
  }
  walk(handler: WalkTreeDataHandler<Node>, opt?: { reverse?: boolean }) {
    const { childrenKey, data } = this;
    // @ts-ignore
    return walkTreeData(data, handler, childrenKey, opt);
  }
  clone(
    opt: {
      nodeHandler?: CloneTreeNodeHandler<Node>;
    } = {}
  ) {
    cloneTreeData;
    return (
      cloneTreeData(this.data),
      withoutUndefined({
        childrenKey: this.childrenKey,
        nodeHandler: opt.nodeHandler || undefined
      })
    );
  }
}

/**
 * wrap function, bind context(this).
 * @param action
 * @param context
 * @returns
 */
export function bindContext<T extends Function>(action: T, context: any): T {
  const wrapped = function (...args: any) {
    return action.apply(context, args);
  };
  // @ts-ignore
  return wrapped;
}

/**
 * Cache function return by arguments
 * @param func
 * @returns
 */
export function cacheFunction<T extends Function>(func: T, options: { capacity?: number } = {}) {
  const cachedArgsArr: any[] = [];
  let map: ArrayKeyMap<any> | null;
  const defaultValue = {};
  let noArgsCache = defaultValue;
  const wrapped = function (...args: any[]) {
    if (args.length === 0) {
      if (noArgsCache === defaultValue) {
        noArgsCache = func();
      }
      return noArgsCache;
    }
    if (!map) {
      map = new ArrayKeyMap();
    }
    if (!map.has(args)) {
      map.set(args, func(...args));
      if (options.capacity !== null) {
        cachedArgsArr.push(args);
        const removed = cachedArgsArr.splice(0, cachedArgsArr.length - (options.capacity || 0));
        for (const args of removed) {
          map.delete(args);
        }
      }
    }
    return map.get(args);
  };
  const clearCache = () => {
    map = null;
    cachedArgsArr.splice(0, cachedArgsArr.length);
  };
  return {
    // @ts-ignore
    action: wrapped as T,
    clearCache
  };
}

/**
 * Split array every n. n can be getter, which argument is the times.
 * 每n个拆分数组. n可以是方法, 参数是第几次分块
 * @param arr
 * @param n
 * @returns
 */
export function splitArray<T>(arr: T[], n: number | ((times: number) => number)): T[][] {
  const r: Array<T[]> = [];
  if (isFunction(n)) {
    const getChunkLength = n;
    let times = 1;
    let i = 0;
    while (i < arr.length) {
      const n = getChunkLength(times);
      const end = i + n;
      r.push(arr.slice(i, end));
      i = end;
      times++;
    }
  } else {
    let i = 0;
    while (i < arr.length) {
      const end = i + <number>n;
      r.push(arr.slice(i, end));
      i = end;
    }
  }
  return r;
}

/**
 * NOT RECOMMEND. Use Node.contains instead.
 */
//YES
export function isDescendantOf(el: Node, parent: Node) {
  while (true) {
    if (el.parentNode == null) {
      return false;
    } else if (el.parentNode === parent) {
      return true;
    } else {
      el = el.parentNode;
    }
  }
}

/**
 * listen event on element
 * @param el
 * @param name
 * @param handler
 * @param options
 */
//YES
export function on<T extends Event>(
  el: Node | Window | Document,
  name: string,
  handler: (event: T) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (el.addEventListener) {
    // All mainstream browsers, except IE 8 and earlier versions.
    // @ts-ignore
    el.addEventListener(name, handler, options);
    // @ts-ignore
  } else if (el.attachEvent) {
    // IE 8 and earlier versions.
    // @ts-ignore
    el.attachEvent(`on${name}`, handler, options);
  }
}

/**
 * cancel event lisitener on element
 * @param el
 * @param name
 * @param handler
 * @param options
 */
// YES
export function off<T extends Event>(
  el: Node | Window | Document,
  name: string,
  handler: (event: T) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    // @ts-ignore
    el.removeEventListener(name, handler, options);
    // @ts-ignore
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    // @ts-ignore
    el.detachEvent(`on${name}`, handler, options);
  }
}

export type BinarySearchReturn<T> = {
  index: number;
  value: T;
  count: number;
  hit: boolean;
  greater?: boolean;
} | null;
export interface BinarySearchOptions {
  start?: number;
  end?: number;
  returnNearestIfNoHit?: boolean;
  maxTimes?: number;
}
/**
 * binarySearch, 二分查找
 * @param arr
 * @param callback return `mid - your_value` for ascending array
 * @param opt
 * @returns
 */
export function binarySearch<T>(
  arr: T[],
  callback: (mid: T, index: number, count: number) => number,
  opt: BinarySearchOptions = {}
): BinarySearchReturn<T> {
  opt = {
    start: 0,
    end: arr.length - 1,
    maxTimes: 1000,
    ...opt
  };
  let start = opt.start as number
  let end = opt.end as number
  const returnNearestIfNoHit=opt.returnNearestIfNoHit
  const maxTimes = opt.maxTimes as number
 // let { start, end } = opt;
 //  const { returnNearestIfNoHit, maxTimes } = opt;
  let midNum;
  let mid;
  if (!start) {
    start = 0;
    end = arr.length - 1;
  }
  let i = 0;
  let r;
  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error(`binarySearch: loop times is over ${maxTimes}, you can increase the limit.`);
    }
    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    const count = i + 1;
    r = callback(mid, midNum, count);
    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return { index: midNum as number, value: mid as T, count, hit: true };
    }
    i++;
  }
  return returnNearestIfNoHit
    ? {
        index: midNum as number,
        value: mid as T,
        count: i + 1,
        hit: false,
        greater: r > 0
      }
    : null;
}

/**
 * Like Map, support array as key. array order is used.
 */
export class ArrayKeyMap<T> {
  _map = new Map<any, [string, number]>();
  _values: Record<string, [any[], T]> = {};
  _objCount = 0;
  _keysToString(keys: any[]): string | null {
    let t: Array<string> = [];
    for (const key of keys) {
      if (!this._map.has(key)) {
        return null;
      }
      const v = this._map.get(key);
      v && t.push(v[0]);
    }
    return t.toString();
  }
  has(keys: any[]) {
    if (this._keysToString(keys) == null) {
      return false;
    }
    return true;
  }
  /**
   * throw error if not found
   * @param keys
   * @returns
   */
  get(keys: any[]) {
    // const { _values } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw 'Value not found by specified keys';
    }
    return this._values[key2][1];
  }
  set(keys: any[], value: T) {
    const { _map, _values } = this;
    let t: Array<string> = [];
    for (const key of keys) {
      let str: string;
      let count = 1;
      if (_map.has(key)) {
        [str, count] = _map.get(key);
        count++;
      } else {
        this._objCount++;
        str = this._objCount.toString();
      }
      _map.set(key, [str, count]);
      t.push(str);
    }
    _values[t.toString()] = [keys.slice(), value];
  }
  delete(keys: any[]) {
    const { _values, _map } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw 'Value not found by specified keys';
    }
    delete _values[key2];
    for (const key of keys) {
      const v = _map.get(key);
      let count = v ? v[1] : 0;

      count--;
      if (count === 0) {
        _map.delete(key);
      } else {
        _map.set(key, [v ? v[0] : 'notset', count]);
      }
    }
  }
  clear() {
    this._map.clear();
    this._values = {};
  }
  *entries() {
    for (const key in this._values) {
      const [keys, value] = this._values[key];
      yield [keys, value];
    }
  }
  count() {
    return [...this.entries()].length;
  }
}

/**
 * lisiten multi events, and can stop and resume them. start listening by default. start is alias for resume
 * @param info
 * @returns
 */
export function extendedListen(
  info: [
    element: Element | Window | Document,
    name: string,
    handler: (event: any) => void,
    options?: boolean | AddEventListenerOptions
  ][]
) {
  let destroyFuncs: Array<Function> = [];
  const listenAll = () => {
    if (r.listening) {
      return;
    }
    for (const item of info) {
      on.apply(this, item);
      const destroy = () => off.apply(this, item);
      destroyFuncs.push(destroy);
    }
    r.listening = true;
  };
  const destroyAll = () => {
    if (!r.listening) {
      return;
    }
    for (const destroy of destroyFuncs) {
      destroy();
    }
    destroyFuncs = [];
    r.listening = false;
  };
  const r = {
    listening: false,
    stop: destroyAll,
    resume: listenAll,
    start: listenAll
  };
  r.start();
  return r;
}

export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

export type Nullable<T> = T | null;
