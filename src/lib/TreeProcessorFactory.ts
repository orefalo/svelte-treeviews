import { TreeProcessor, type Options } from './treeutils';

export function makeTreeProcessor(data: any[], opt: Options): TreeProcessor<T> {
  const instance = new TreeProcessor(opt);
  if (!opt.noInitialization) instance.init();
  return instance;
}
