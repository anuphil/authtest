var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('rename');
var livereload = require('gulp-livereload');

gulp.task('html', function() {
	gulp.src('jade/*.jade')
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest('build'))
		.pipe(livereload())
});

gulp.task('watch', function() {
	gulp.watch('jade/*.jade', ['html']);
})