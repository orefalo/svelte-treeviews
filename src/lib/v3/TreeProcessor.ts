import { type NodeD, NodeI } from './NodeI.svelte';
import * as hp from '$lib/jshelper';

export class TreeProcessor {
  public nodeInfos: NodeI[] = [];
  //   public nodeInfosToRender: NodeI[] = [];
  // used to find info from data

  private _infosMap: Map<NodeD, NodeI> = new Map();

  // private options: Options;
  private initialized: boolean = false;

  constructor(/*opt?: Options*/) {
    // this.nodeInfos = [];
    // this.nodeInfosFlat
    // this._infosMap = null;
    //   this.options = opt ? opt : new Options();
  }

  public init(nodeData: any): NodeI[] {
    if (!this.initialized) {
      this.initialized = true;
      console.log('TreeProcessor.init() called');
      const childrenKey = /*this.options.childrenKey*/ 'children';

      const td = new hp.TreeData([] as NodeI[]);
      this._infosMap.clear();
      hp.walkTreeData(
        nodeData,
        (data, index, parent, path) => {
          const nodeInfo = new NodeI({
            nodeData: data,
            expanded: Boolean(false),
            parent: td.getParent(path),
            children: [],
            level: path.length
          });

          this._infosMap.set(data, nodeInfo);
          td.set(path, nodeInfo);
        },
        { childrenKey }
      );

      console.log(td);

      this.nodeInfos = td.rootChildren;

      // nodeInfosFlat = this.options.InfoNodesFlatHandler(flat)
      //   const flat: typeof td.rootChildren = [];
      //   td.walk(nodeInfo => {
      //     flat.push(nodeInfo);
      //   });

      //   console.log('rootChildren', td.rootChildren);

      //   this.nodeInfosToRender = this.options.InfoNodesFlatHandler(flat);
    }
    return this.nodeInfos;
  }
}
