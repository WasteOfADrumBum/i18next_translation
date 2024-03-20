module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'react/display-name': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
