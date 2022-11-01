let gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	jade = require('gulp-jade'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	replace = require('gulp-replace'),
	extractMediaQuery = require('gulp-extract-media-query'),
	sassPath = './#src/sass/**/*.sass',
	jadePath = './#src/**/*.jade',

	del = require('del');
	
function style()
{
	return gulp.src(sassPath)
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(replace('  ', '	'))
	.pipe(extractMediaQuery({
		match: '(min-width: 375px)',
		postfix: '-375'
	}))
	.pipe(extractMediaQuery({
		match: '(min-width: 768px)',
		postfix: '-768'
	}))
	.pipe(extractMediaQuery({
		match: '(min-width: 992px)',
		postfix: '-992'
	}))
	.pipe(extractMediaQuery({
		match: '(min-width: 1200px)',
		postfix: '-1200'
	}))
	.pipe(extractMediaQuery({
		match: '(min-width: 1400px)',
		postfix: '-1400'
	}))
	.pipe(extractMediaQuery({
		match: '(min-width: 1600px)',
		postfix: '-1600'
	}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(cleanCSS(
		{
			debug: true,
			inline: ['none'],
		},
		(details) => {
			console.log(`${details.name}: ${details.stats.originalSize}`);
			console.log(`${details.name}: ${details.stats.minifiedSize}`);
    	}
	))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream());
}

function styleMinify()
{
	return gulp.src('./dist/css')
		.pipe(cleanCSS(
			{
				debug: true,
				inline: ['none'],
			},
			(details) => {
				console.log(`${details.name}: ${details.stats.originalSize}`);
				console.log(`${details.name}: ${details.stats.minifiedSize}`);
	    	}
		))
		.pipe(gulp.dest('./dist/css.min'));
}

function clean()
{
	return del('./dist/includes', { force: true });
}

function html()
{
	return gulp.src(jadePath)
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
}

function watch()
{
	browserSync.init({
		server: { baseDir: './dist/' },
		notify: false,
	});
	gulp.watch(sassPath, style);
	// gulp.watch(sassPath, styleMinify);
	gulp.watch(jadePath, html);
	gulp.watch(['./dist/js/*.js', './gulpfile.js']).on('change', browserSync.reload);
}
	
exports.styleMinify = styleMinify;
exports.clean = clean;
exports.style = style;
exports.watch = watch;
exports.html = html;
exports.default = watch;
