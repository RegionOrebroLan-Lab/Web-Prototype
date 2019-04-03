/// <binding AfterBuild="default" Clean="clean" ProjectOpened="watch" />
"use strict";
{
	var del = require("del");
	var fileSystem = require("fs");
	var gulp = require("gulp");
	var gulpSvgSrite = require("gulp-svg-sprite");
	var gulpPlumber = require("gulp-plumber");
	var path = require("path");
	var webpackStream = require("webpack-stream");

	var destinationRootDirectoryName = "wwwroot";
	var fontsDirectoryName = "Fonts";
	var iconsDirectoryName = "Icons";
	var imagesDirectoryName = "Images";
	var scriptsDirectoryName = "Scripts";
	var styleDirectoryName = "Style";

	var fontsDestinationDirectory = path.join(destinationRootDirectoryName, styleDirectoryName, fontsDirectoryName);
	var fontsSourceDirectory = path.join(styleDirectoryName, fontsDirectoryName);
	var iconsSourceDirectory = path.join(styleDirectoryName, iconsDirectoryName);
	var imagesDestinationDirectory = path.join(destinationRootDirectoryName, styleDirectoryName, imagesDirectoryName);
	var imagesSourceDirectory = path.join(styleDirectoryName, imagesDirectoryName);
	var scriptsDestinationDirectory = path.join(destinationRootDirectoryName, scriptsDirectoryName);
	var scriptsSourceDirectory = scriptsDirectoryName;
	var spritesDestinationDirectory = path.join(destinationRootDirectoryName, styleDirectoryName, iconsDirectoryName);
	var styleDestinationDirectory = path.join(destinationRootDirectoryName, styleDirectoryName);


	function clean() {
		console.log(`Deleting directory \"${scriptsDestinationDirectory}\"...`);
		console.log(`Deleting directory \"${styleDestinationDirectory}\"...`);

		return del([scriptsDestinationDirectory, styleDestinationDirectory]);
	};
	
	function fonts() {
		console.log("Copying fonts...");

		if (fileSystem.existsSync(fontsDestinationDirectory))
			del(fontsDestinationDirectory);

		return gulp.src(path.join(fontsSourceDirectory, "**/*")).pipe(gulp.dest(destinationRootDirectoryName));
	}

	function images() {
		console.log("Copying images...");

		if (fileSystem.existsSync(imagesDestinationDirectory))
			del(imagesDestinationDirectory);

		return gulp.src(path.join(imagesSourceDirectory, "**/*")).pipe(gulp.dest(destinationRootDirectoryName));
	}

	function scripts() {
		console.log("Creating scripts...");

		if (fileSystem.existsSync(scriptsDestinationDirectory))
			del(scriptsDestinationDirectory);

		return gulp.src(path.join(scriptsSourceDirectory, "Index.ts"))
			.pipe(webpackStream({
				devtool: "source-map",
				mode: "production",
				module: {
					rules: [
						{
							exclude: /node_modules/,
							loader: "ts-loader",
							test: /\.tsx?$/
						}
					]
				},
				optimization: {
					minimize: false
				},
				output: {
					filename: "Index.js",
					path: path.resolve(process.cwd(), scriptsDestinationDirectory)
				},
				plugins: [

				],
				resolve: {
					extensions: [".tsx", ".ts", ".js"]
				}
			}))
			.pipe(gulp.dest(scriptsDestinationDirectory));
	}

	function sprites() {
		console.log("Creating sprites...");

		if (fileSystem.existsSync(spritesDestinationDirectory))
			del(spritesDestinationDirectory);

		return gulp.src(path.join(iconsSourceDirectory, "**/*.svg"))
			.pipe(gulpPlumber())
			.pipe(gulpSvgSrite({
				mode: {
					symbol: {
						dest: "",
						render: false,
						sprite: "sprite.svg"
					}
				}
			}))
			.on("error", function (error) {
				if (!error)
					return;

				const errorMessage = error.message || error;

				log.error("Failed to compile sprite.", errorMessage.toString());
				this.emit("end");
			})
			.pipe(gulp.dest(spritesDestinationDirectory));
	}

	function watchFonts() {

		const patterns = [
			path.join(fontsSourceDirectory, "**/*").replace(/\\/g, "/")
		];

		gulp.watch(patterns, fonts);
	}

	function watchImages() {

		const patterns = [
			path.join(imagesSourceDirectory, "**/*").replace(/\\/g, "/")
		];

		gulp.watch(patterns, images);
	}

	function watchScripts() {

		const patterns = [
			path.join(scriptsSourceDirectory, "**/*.js").replace(/\\/g, "/"),
			path.join(scriptsSourceDirectory, "**/*.ts").replace(/\\/g, "/")
		]; 

		gulp.watch(patterns, scripts);
	}

	function watchSprites() {

		const patterns = [
			path.join(iconsSourceDirectory, "**/*.svg").replace(/\\/g, "/")
		];

		gulp.watch(patterns, sprites);
	}

	gulp.task("clean", gulp.series(clean));

	gulp.task("default", gulp.parallel(fonts, images, scripts, sprites));

	gulp.task("fonts", gulp.series(fonts, watchFonts));

	gulp.task("images", gulp.series(images, watchImages));

	gulp.task("scripts", gulp.series(scripts, watchScripts));

	gulp.task("sprites", gulp.series(sprites, watchSprites));

	gulp.task("watch", gulp.parallel(watchFonts, watchImages, watchScripts, watchSprites));
}