const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const { baseConfig } = require("@blueprintjs/webpack-build-scripts");

module.exports = Object.assign({}, baseConfig, {
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist")
	},
	plugins: [
		...baseConfig.plugins,
		new HtmlWebpackPlugin({
			title: "invliD Tools",
		}),
	],
});
