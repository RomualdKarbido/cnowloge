var gulp 			= require('gulp'),
	less 			= require('gulp-less'),
	browserSync 	= require('browser-sync'),
	del 			= require('del');




gulp.task('less', function() {
  return gulp.src('app/less/style.less') 
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
})
gulp.task('less-2', function() {
  return gulp.src('app/less/libs.less') 
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});




gulp.task('watch', ['browser-sync','less-2', 'less'], function() {
	gulp.watch('app/less/libs.less', ['less-2']);
	gulp.watch('app/less/style.less', ['less']);
	gulp.watch('app/less/*.less', ['less'], browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('builg-time/*.*', browserSync.reload);
});

gulp.task('build', ['clean', 'less'], function(){

	var buildCss = gulp.src ([
		'app/css/style.css',
		'app/css/libs.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src ('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src ('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src ('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildImg = gulp.src ('app/img/**/*')
	.pipe(gulp.dest('dist/img'));

	var buildlibs = gulp.src ('app/libs/**/*')
	.pipe(gulp.dest('dist/libs'));
});



