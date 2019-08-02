const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { baseConfig } = require("@blueprintjs/webpack-build-scripts");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const cssLoaders = [
    // Only extract CSS to separate file in production mode.
    IS_PRODUCTION ? MiniCssExtractPlugin.loader : require.resolve("style-loader"),
    {
        loader: require.resolve("css-loader"),
        options: {
            // necessary to minify @import-ed files using cssnano
            importLoaders: 1,
        },
    },
    {
        loader: require.resolve("postcss-loader"),
        options: {
            plugins: [
                require("autoprefixer"),
                require("cssnano")({ preset: "default" }),
            ],
        },
    },
];

module.exports = Object.assign({}, baseConfig, {
	entry: {
		app: "./src/index.tsx",
	},
	module: {
		...baseConfig.module,
		rules: [
			...baseConfig.module.rules,
			{
                test: /\.css$/,
                use: cssLoaders,
            },
		]
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
