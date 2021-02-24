const gulp = require("gulp"),
  browsersync = require("browser-sync"),
  del = require("del"),
  concat = require("gulp-concat"),
  cssnano = require("gulp-cssnano"),
  filesize = require("gulp-filesize"),
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  eslint = require("gulp-eslint"),
  babel = require("gulp-babel"),
  stylus = require("gulp-stylus"),
  svgmin = require("gulp-svgmin"),
  uglify = require("gulp-uglify");

const server = browsersync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: "./assets/dist",
    },
    files: [
      paths.src.css,
      paths.src.html,
      paths.src.img,
      paths.src.js,
      paths.src.svg,
      paths.src.favicon,
    ],
  });
  done();
}

let paths = {
  src: {
    css: "assets/src/styl/**/*.styl",
    fonts: "assets/src/fonts/**/*",
    html: "assets/src/html/*.html",
    img: "assets/src/img/**/*",
    js: "assets/src/js/**/*.js",
    styl: "assets/src/styl/style.styl",
    svg: "assets/src/svg/**/*",
    favicon: "assets/src/favicon/*",
    vendorcss: [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
      "node_modules/slick-carousel/slick/slick.css",
      "node_modules/aos/dist/aos.css",
    ],
    vendorjs: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      "node_modules/slick-carousel/slick/slick.min.js",
      "node_modules/jquery-validation/dist/jquery.validate.min.js",
      "node_modules/aos/dist/aos.js",
    ],
  },
  dist: {
    css: "assets/dist/css",
    dist: "assets/dist/**/*",
    fonts: "assets/dist/fonts",
    html: "assets/dist",
    img: "assets/dist/img",
    js: "assets/dist/js",
    favicon: "assets/dist/favicon",
    svg: "assets/dist/svg",
  },
};

function clean() {
  return del(paths.dist.dist);
}

function css() {
  return gulp
    .src(paths.src.styl)
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(concat("main.css"))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function fonts() {
  return (
    gulp
      .src("node_modules/@fortawesome/fontawesome-free/webfonts/*")
      .pipe(gulp.dest("assets/dist/webfonts/")),
    gulp
      .src("node_modules/slick-carousel/slick/fonts/*")
      .pipe(gulp.dest("assets/dist/css/fonts/")),
    gulp
      .src("node_modules/slick-carousel/slick/ajax-loader.gif")
      .pipe(gulp.dest("assets/dist/css/")),
    gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dist.fonts))
  );
}

function html() {
  return gulp
    .src(paths.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function img() {
  return gulp
    .src(paths.src.img)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 85, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function js() {
  return gulp
    .src(paths.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function svg() {
  return gulp
    .src(paths.src.svg)
    .pipe(svgmin())
    .pipe(gulp.dest(paths.dist.svg))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function favicon() {
  return gulp
    .src(paths.src.favicon)
    .pipe(gulp.dest(paths.dist.favicon))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

function vendorscss() {
  return gulp
    .src(paths.src.vendorcss)
    .pipe(concat("vendors.css"))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(filesize());
}

function vendorsjs() {
  return gulp
    .src(paths.src.vendorjs)
    .pipe(concat("vendors.js"))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browsersync.stream())
    .pipe(filesize());
}

const watch = () => {
  gulp.watch(paths.src.css, gulp.series(css, reload));
  gulp.watch(paths.src.fonts, gulp.series(fonts, reload));
  gulp.watch(paths.src.html, gulp.series(html, reload));
  gulp.watch(paths.src.img, gulp.series(img, reload));
  gulp.watch(paths.src.js, gulp.series(js, reload));
  gulp.watch(paths.src.svg, gulp.series(svg, reload));
  gulp.watch(paths.src.favicon, gulp.series(favicon, reload));
};

const serveDev = gulp.series(
  clean,
  js,
  css,
  fonts,
  html,
  img,
  svg,
  favicon,
  vendorscss,
  vendorsjs,
  serve,
  watch
);
const build = gulp.series(
  clean,
  js,
  css,
  fonts,
  html,
  img,
  svg,
  favicon,
  vendorscss,
  vendorsjs
);

gulp.task("default", serveDev);
gulp.task("build", build);
