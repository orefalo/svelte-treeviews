import { TreeProcessor, type Options } from './treeutils';

export function makeTreeProcessor<T>(data: T[], opt: Options<T>):TreeProcessor<T> {
	const instance = new TreeProcessor<T>(opt)
	if (!opt.noInitialization)
		instance.init()
	return instance
}
