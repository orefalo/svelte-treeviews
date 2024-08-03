import type { NodeInfo } from '$lib/NodeInfo';
import { CHILDREN } from '$lib/TreeProcessor';

export class Options {
  childrenKey: string = CHILDREN;
  defaultOpen: boolean = false;
  // when true, the init() method must be called manually
  noInitialization?: boolean = false;

  constructor(o?: PartialOptions) {
    this.childrenKey = o?.childrenKey || CHILDREN;
    this.defaultOpen = o?.defaultOpen || false;
    this.noInitialization = o?.noInitialization || false;
  }

  public infoNodesHandler(infos: NodeInfo[]) {
    return infos;
  }

  public InfoNodesFlatHandler(infosFlat: NodeInfo[]) {
    return infosFlat;
  }

  public afterSetInfoNode(_info: NodeInfo, _parent: NodeInfo | null, _index: number) {}

  public afterRemoveInfoNode(_info: NodeInfo) {}

  public infoHandler(info: NodeInfo) {
    return info;
  }
}

export class PreProcessorOptions extends Options {
  // this used to be statsHandler2
  public preProcessor?: (input: NodeInfo) => NodeInfo;

  private filter<T>(func: Function | null | undefined, input: T): T {
    return func ? func(input) : input;
  }

  constructor(o: PartialOptions) {
    super(o);
  }

  public infoHandler(input: NodeInfo) {
    if (this.preProcessor) {
      input = this.preProcessor(input);
    }
    let inputReactive = $state(input);
    return this.filter(super.infoHandler, inputReactive);
  }

  public infoNodesHandler(input: NodeInfo[]) {
    let inputReactive = $state(input);
    return this.filter(super.infoNodesHandler, inputReactive);
  }

  public InfoNodesFlatHandler(input: NodeInfo[]) {
    let inputReactive = $state(input);
    return this.filter(super.InfoNodesFlatHandler, inputReactive);
  }
}

export interface PartialOptions extends Partial<Options> {}
