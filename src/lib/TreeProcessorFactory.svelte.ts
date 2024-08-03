// import type { NodeInfo } from './NodeInfo';
import { TreeProcessor } from './TreeProcessor';
import { Options, PreProcessorOptions, type PartialOptions } from '$lib/Options.svelte.js';

// output=func(input)
// function filter<T>(func: Function | null | undefined, input: T): T {
//   return func ? func(input) : input;
// }

export function createTreeProcessor<T>(data: T[], options: PartialOptions) {
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
  const opt = new PreProcessorOptions(options);

  const instance = new TreeProcessor(opt);
  if (!opt.noInitialization) instance.init();
  return instance;
}
