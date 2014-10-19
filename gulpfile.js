var gulp             = require('gulp');
var less             = require('gulp-less');
var plumber          = require('gulp-plumber');
var rename           = require('gulp-rename');
var clean            = require('gulp-rimraf');
// var uglify           = require('gulp-uglify');
var util             = require('gulp-util');
var watch            = require('gulp-watch');
var _                = require('lodash');
var path             = require('path');


var distFolder = '/dist/';

var config = {
    clean: {
        defaults: {
            input: [path.join(__dirname, distFolder, '*')]
        },
        build: {
            input: [path.join(__dirname, distFolder, '*')]
        }
    },
    less: {
        defaults: {
            input: path.join(__dirname, '/less/fluency.less'),
            output: path.join(__dirname, distFolder, 'css/')
        },
        build: {
            input: path.join(__dirname, '/less/fluency.less'),
            less: {
                cleancss: true
            },
            output: path.join(__dirname, distFolder, 'css/')
        }
    }
};


gulp.task('default', [
    'less',
]);

gulp.task('build', [
    'less:build'
    // 'uglify'
]);

gulp.task('clean', function() {
    var opts = _.clone(config.clean.defaults);
    return gulp.src(opts.input, {read: false})
        .pipe(clean());
});

gulp.task('clean:build', function() {
    var opts = _.clone(config.clean.build);
    return gulp.src(opts.input, {read: false})
        .pipe(clean());
});

gulp.task('less', function() {
    var opts = _.clone(config.less.defaults);
    gulp.src(opts.input)
        .pipe(watch(opts.input, function(files) {
            return files
                .pipe(plumber())
                .pipe(less(opts.less))
                .pipe(gulp.dest(opts.output));
        }));
});

gulp.task('less:build', function() {
    var opts = _.clone(config.less.build);
    return gulp.src(opts.input)
            .pipe(plumber())
            .pipe(less(opts.less))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(opts.output));
});

// gulp.task('test', function() {
//     var opts = _.clone(config.test.defaults);
//     return gulp.src(opts.input)
//         .pipe(karma({
//             action: 'run',
//             configFile: 'karma.conf.js'
//         }))
//         .on('error', function(err) {
//             // Make sure failed tests cause gulp to exit with a non-zero status
//             throw err;
//         });
// });


// gulp.task('uglify', function() {
//     var opts = _.clone(config.uglify.defaults);
//     return gulp.src(opts.input)
//         .pipe(uglify(opts.options))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest(opts.output));
// });