module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [0, 'always', 100],
		'scope-case': [0, 'always', 'pascal-case'],
		'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'ci',
				'docs',
				'feat',
				'fix',
				'wip', // ADDED
				'perf',
				'refactor',
				'revert',
				'style',
				'test'
			]
		]
	}
};
