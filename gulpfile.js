var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var coffee      = require('gulp-coffee');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var plumber     = require('gulp-plumber');
var reload      = browserSync.reload;

var paths = {
  html:['index.html'],
  css:['css/style.css'],
  script:['js/main.js'],
  sass:['sass/main.sass']
};

gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('main'))
    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('script', function(){
    gulp.src(paths.script)
    .pipe(reload({stream:true}));
  });

  gulp.task('css', function(){
    gulp.src(paths.css)
    .pipe(reload({stream:true}));
  });

// ////////////////////////////
// Sass
// ////////////////////////////
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src(paths.sass) // Берем источник
        .pipe(plumber())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

//////////////////////////////
// Browser-sync
//////////////////////////////
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch',function(){
  gulp.watch(paths.css, ['mincss']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('watch', ['browser-sync', 'sass', 'html', 'script','css'], function() {
    gulp.watch('app/sass/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('index.html', ['html']);// Наблюдение за другими типами файлов
    gulp.watch('app/js/*.js', ['script']);
    gulp.watch('css/*.css', ['css']);
});

gulp.task('default', ['watch', 'browserSync']);