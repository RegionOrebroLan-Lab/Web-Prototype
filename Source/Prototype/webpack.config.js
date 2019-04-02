"use strict";
{
	var CleanWebpackPlugin = require("clean-webpack-plugin");
	var outputPath = "wwwroot/Scripts/";
	var path = require("path");

	module.exports = {
		devtool: "source-map",
		entry: "./Scripts/Index.ts",
		module: {
			rules: [
				{
					exclude: /node_modules/,
					loader: "ts-loader",
					test: /\.tsx?$/
				}
			]
		},
		output: {
			filename: "Index.js",
			path: path.resolve(process.cwd(), outputPath)
		},
		plugins: [
			new CleanWebpackPlugin()
		],
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		}
	};
}