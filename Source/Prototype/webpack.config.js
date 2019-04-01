"use strict";
{
	var outputPath = "wwwroot/Scripts/";
	var path = require("path");

	module.exports = {
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
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		}
	};
}