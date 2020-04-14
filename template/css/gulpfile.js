const { src, dest, parallel, watch } = require("gulp");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const minifyCSS = require("gulp-csso");

const lessFiles = "src/**/*.less";

function cssDev() {
  return src(lessFiles)
    .pipe(less())
    .pipe(dest("demo/"))
    .pipe(connect.reload());
}

function cssBuild() {
  return src(lessFiles)
    .pipe(less())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(dest("lib/"));
}

function dev() {
  watch([lessFiles], cssDev);
  connect.server({
    root: "./demo/",
    livereload: true,
    port: 2727
  });
}
exports.build = parallel(cssBuild);
exports.default = parallel(cssDev, dev);
