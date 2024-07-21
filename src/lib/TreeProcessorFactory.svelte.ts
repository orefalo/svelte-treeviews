import { Options, TreeProcessor, type PartialOptions } from './TreeProcessor';
//export * from './TreeProcessor';

function filter<T>(func: Function | null | undefined, input: T): T {
  return func ? func(input) : input;
}

export function treeProcessorFactory<T>(data: T[], options: PartialOptions = {}) {
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

  const instance = new TreeProcessor(opt);
  if (!opt.noInitialization) instance.init();
  return instance;
}
