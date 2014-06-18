var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var notify = require('gulp-notify');

var codeFiles = ['./*.js', './lib/*.js', './tests/*.js'];
var jshintReporter = process.env.NODE_ENV === 'test' ? jshint.reporter('jslint_xml') : jshint.reporter(stylish);

function handleError(error) {
  console.log(error.message);
  notify.onError('Error: <%= error.message =>');
  this.emit('end');
}
gulp.task('lint', function() {
  return gulp.src(codeFiles)
             .pipe(jshint())
             .pipe(jshintReporter)
             .pipe(notify(function(file) {
               if(file.jshint.success) {
                return false;
               }

               var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                  return '(' + data.error.line + ':' + data.error.character + ')' + data.error.reason;
                }
               }).join('\n');
               return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
             }));
});

gulp.task('mocha', function() {
  return gulp.src(['./tests/*.js']).pipe(mocha({ reporter: 'nyan' })).on('error', handleError);
});

gulp.task('watch', function() {
  var watcher = gulp.watch(codeFiles, ['mocha', 'lint']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
  });
});
