import { TreeProcessor, type Options } from './TreeProcessor';

export function makeTreeProcessor(data: any[], opt: Options): TreeProcessor {
  const instance = new TreeProcessor(opt);
  if (!opt.noInitialization) instance.init();
  return instance;
}
