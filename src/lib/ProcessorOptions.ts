import { CHILDREN } from '$lib/Constants';

// this structure define the tree options.
// in it we can configure how element make it from the model to visual using the processors
export class ProcessorOptions {
  childrenKey: string = CHILDREN;
  defaultOpen: boolean = false;
  // when true, the init() method must be called manually
  noInitialization?: boolean = false;

  constructor(o?: PartialOptions) {
    this.childrenKey = o?.childrenKey || CHILDREN;
    this.defaultOpen = o?.defaultOpen || false;
    this.noInitialization = o?.noInitialization || false;
    // this.afterSetInfoNode = o?.afterSetInfoNode;
    // this.afterRemoveInfoNode = o?.afterRemoveInfoNode;
  }
}

export interface PartialOptions extends Partial<ProcessorOptions> {}
