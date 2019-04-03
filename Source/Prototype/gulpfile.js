/// <binding AfterBuild="default" Clean="clean" />
"use strict";
{
	var del = require("del");
	var gulp = require("gulp");
	var gulpSvgSrite = require("gulp-svg-sprite");
	var gulpPlumber = require("gulp-plumber");
	var path = require("path");

	var destinationRootDirectoryName = "wwwroot";
	var fontsDirectoryName = "Fonts";
	var iconsDirectoryName = "Icons";
	var imagesDirectoryName = "Images";
	var scriptsDirectoryName = "Scripts";
	var styleDirectoryName = "Style";

	var paths = {
		fontsDestinationDirectory: path.join(destinationRootDirectoryName, styleDirectoryName, fontsDirectoryName),
		fontsSourceDirectory: path.join(styleDirectoryName, fontsDirectoryName),
		iconsSourceDirectory: path.join(styleDirectoryName, iconsDirectoryName),
		imagesDestinationDirectory: path.join(destinationRootDirectoryName, styleDirectoryName, imagesDirectoryName),
		imagesSourceDirectory: path.join(styleDirectoryName, imagesDirectoryName),
		scriptsDestinationDirectory: path.join(destinationRootDirectoryName, scriptsDirectoryName),
		scriptsSourceDirectory: scriptsDirectoryName,
		spriteDestinationDirectory: path.join(destinationRootDirectoryName, styleDirectoryName, iconsDirectoryName),
		styleDestinationDirectory: path.join(destinationRootDirectoryName, styleDirectoryName),
	};

	gulp.task("clean", gulp.series(function () {
		console.log(`Deleting directory \"${paths.scriptsDestinationDirectory}\"...`);
		console.log(`Deleting directory \"${paths.styleDestinationDirectory}\"...`);
		return del([paths.scriptsDestinationDirectory, paths.styleDestinationDirectory]);
	}));

	gulp.task("fonts", gulp.series(function () {
		console.log("Copying fonts...");
		del(paths.fontsDestinationDirectory);

		return gulp.src(path.join(paths.fontsSourceDirectory, "**/*")).pipe(gulp.dest(destinationRootDirectoryName));
	}));

	gulp.task("images", gulp.series(function () {
		console.log("Copying images...");
		del(paths.imagesDestinationDirectory);

		return gulp.src(path.join(paths.imagesSourceDirectory, "**/*")).pipe(gulp.dest(destinationRootDirectoryName));
	}));

	gulp.task("scripts", gulp.series(function (done) {
		console.log("Creating scripts...");
		// gulp.src(paths.scriptsSourceDirectory).pipe(gulp.dest(paths.scriptsDestinationDirectory));
		done();
	}));

	gulp.task("sprites", gulp.series(function () {
		console.log("Creating sprites...");
		del(paths.spriteDestinationDirectory);

		return gulp.src(path.join(paths.iconsSourceDirectory, "**/*.svg"))
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
			.on("error", function(error) {
				if (!error)
					return;

				const errorMessage = error.message || error;

				log.error("Failed to compile sprite.", errorMessage.toString());
				this.emit("end");
			})
			.pipe(gulp.dest(paths.spriteDestinationDirectory));
	}));

	gulp.task("default", gulp.series(["fonts", "images", "scripts", "sprites"], function (done) {
		done();
	}));
}