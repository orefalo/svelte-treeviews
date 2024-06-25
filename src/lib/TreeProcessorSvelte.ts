import { makeTreeProcessor, type Options } from './treeutils';
export * from './treeutils';

export function svelteMakeTreeProcessor<T>(data: T[], options: Options = {}) {
	let _statHandler2: (input: T) => T;

	const opt = {
		...options,
		statHandler(input: unknown) {
			if (this['_statHandler2']) {
				input = this['_statHandler2'](input);
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
	return makeTreeProcessor(data, opt);
}
function filter<T>(func: Function | null | undefined, input: T): T {
	return func ? func(input) : input;
}
