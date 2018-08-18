const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty",
	},
	entry: {
		app: "./src/index.js",
		fontawesome: "./src/utils/fontawesome.js",
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
	},
	plugins: [
		new CleanWebpackPlugin([ "dist" ]),
		new HtmlWebpackPlugin({
			title: "Auotfill Tool Test",
		}),
	],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ],
			},
			{
				test: /\.(csv|tsv)$/,
				use: [ "csv-loader" ],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [ "file-loader" ],
			},
			{
				test: /\.xml$/,
				use: [ "xml-loader" ],
			},
		],
	},
};
