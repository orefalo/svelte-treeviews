import type { NodeInfo } from './NodeInfo.svelte';
import { ProcessorOptions, type PartialOptions } from './ProcessorOptions';

export class PreProcessorOptionsSvelte extends ProcessorOptions {
  // vuejs: this used to be statsHandler2
  public preProcessor?: (input: NodeInfo) => NodeInfo;

  private filter<T>(func: Function | null | undefined, input: T): T {
    return func ? func(input) : input;
  }

  constructor(o: PartialOptions) {
    super(o);
  }

  // public infoHandler(input: NodeInfo) {
  //   if (this.preProcessor) {
  //     input = this.preProcessor(input);
  //   }
  //   let inputReactive = $state(input);
  //   return this.filter(super.infoHandler, inputReactive);
  // }

  // public infoNodesHandler(input: NodeInfo[]) {
  //   let inputReactive = $state(input);
  //   return this.filter(super.infoNodesHandler, inputReactive);
  // }

  // public InfoNodesFlatHandler(input: NodeInfo[]) {
  //   let inputReactive = $state(input);
  //   return this.filter(super.InfoNodesFlatHandler, inputReactive);
  // }
}
