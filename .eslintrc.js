const path = require("path");

module.exports = {
	extends: [
		"@blueprintjs/eslint-config",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		project: path.resolve(__dirname, "./src/tsconfig.json"),
	},
	rules: {
		"@typescript-eslint/tslint/config": ["error", {
			lintFile: path.resolve(__dirname, "./tslint.json"),
		}],
		"deprecation/deprecation": "warn",
		"header/header": "off",
		"no-bitwise": "off",
	},
};
