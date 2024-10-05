import type { NodeInfo } from '$lib/NodeInfo';

import { CHILDREN } from '$lib/Constants';

// this structure define the tree options.
// in it we can configure how element make it from the model to visual using the processors
export class ProcessorOptions {
  childrenKey: string = CHILDREN;
  defaultOpen: boolean = false;
  // when true, the init() method must be called manually
  noInitialization?: boolean = false;

  // this used to be afterSetStat
  afterSetInfoNode?: (_info: NodeInfo, _parent: NodeInfo | null, _index: number) => void;
  // this used to be afterRemoveStat
  afterRemoveInfoNode?: (_info: NodeInfo) => null;

  constructor(o?: PartialOptions) {
    this.childrenKey = o?.childrenKey || CHILDREN;
    this.defaultOpen = o?.defaultOpen || false;
    this.noInitialization = o?.noInitialization || false;
    this.afterSetInfoNode = o?.afterSetInfoNode;
    this.afterRemoveInfoNode = o?.afterRemoveInfoNode;
  }

  // this used to be statsHandler: (stats: Stat<any>[]) => Stat<any>[];
  public infoNodesHandler(infos: NodeInfo[]): NodeInfo[] {
    return infos;
  }

  // this used to be  statsFlatHandler: (statsFlat: Stat<any>[]) => Stat<any>[];
  public InfoNodesFlatHandler(infosFlat: NodeInfo[]): NodeInfo[] {
    return infosFlat;
  }

  // this used to be  statHandler: (stat: Stat<any>) => Stat<any>;
  public infoHandler(info: NodeInfo) {
    return info;
  }
}

export interface PartialOptions extends Partial<ProcessorOptions> {}
