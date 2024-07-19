import { makeTreeProcessor } from './TreeProcessorFactory';
import type { Options } from './TreeProcessor';
export * from './TreeProcessor';

function filter<T>(func: Function | null | undefined, input: T): T {
  return func ? func(input) : input;
}

export function svelteMakeTreeProcessor<T>(data: T[], options: Options = {}) {
  let _statHandler2: (input: T) => T | undefined;

  const opt = {
    ...options,
    statHandler(input: any) {
      if (_statHandler2 !== undefined) {
        input = _statHandler2(input);
      }
      let inputReactive = $state(input);
      return filter(options.statHandler, inputReactive);
    },
    statsHandler(input: unknown) {
      let inputReactive = $state(input);
      return filter(options.statsHandler, inputReactive);
    },
    statsFlatHandler(input: unknown) {
      let inputReactive = $state(input);
      return filter(options.statsFlatHandler, inputReactive);
    }
  };
  return makeTreeProcessor(data, opt as Options);
}
