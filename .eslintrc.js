module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:react-hooks/recommended',
		'plugin:jest-dom/recommended',
		'plugin:testing-library/react',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		// Explicitly set rules that are causing conflicts
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
