// import type { NodeInfo } from './NodeInfo';
import { TreeProcessor } from './TreeProcessor.svelte';
import { type PartialOptions } from '$lib/ProcessorOptions.js';
import { PreProcessorOptionsSvelte } from './PreProcessorOptions.svelte';

// output=func(input)
// function filter<T>(func: Function | null | undefined, input: T): T {
//   return func ? func(input) : input;
// }

export function createTreeProcessor(data: any[], options: PartialOptions) {
  // let preProcessor: (input: NodeInfo) => NodeInfo;

  // const opt = {
  //   ...options,
  //   statHandler(input: NodeInfo) {
  //     if (preProcessor !== undefined) {
  //       input = preProcessor(input);
  //     }
  //     let inputReactive = $state(input);
  //     return filter(options.statHandler, inputReactive);
  //   },
  //   statsHandler(input: NodeInfo[]) {
  //     let inputReactive = $state(input);
  //     return filter(options.statsHandler, inputReactive);
  //   },
  //   statsFlatHandler(input: NodeInfo) {
  //     let inputReactive = $state(input);
  //     return filter(options.statsFlatHandler, inputReactive);
  //   }
  // };
  // const opt = new PreProcessorOptionsSvelte(opt);
  const opt = new PreProcessorOptionsSvelte(options);

  const instance = new TreeProcessor(data, opt);
  if (!opt.noInitialization) instance.init();
  return instance;
}
