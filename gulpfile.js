'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	sassLint = require('gulp-sass-lint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint'),
	babel = require("gulp-babel");

gulp.task('sass-lint'), function() {
	return gulp.src('./assets/scss/**/*.scss')
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
}

gulp.task('sass', function () {
	var processors = [
		autoprefixer({browsers: ['>30%']})
	]
	return gulp.src('./assets/css/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./assets/css'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('./assets/js/src/scripts.js')
		.pipe(eslint())
		.pipe(babel())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/dist/js'))
});

gulp.task('watch', function () {
	gulp.watch(['./assets/css/scss/**/*.scss'], ['sass-lint', 'sass']);
	gulp.watch('./assets/js/src/**/*.js', ['scripts']);
});

gulp.task('default',['sass-lint', 'sass', 'scripts', 'watch']);