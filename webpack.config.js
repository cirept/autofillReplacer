const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: "./src/js/autofillTag.js",
	plugins: [
    new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: "Auotfill Tool Test",
		}),
	],
	output: {
		filename: "bundle.js",
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
				test: /\.xml$/,
				use: [ "xml-loader" ],
			},
		],
	},
};
