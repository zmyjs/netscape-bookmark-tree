const fs = require("fs");
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin'); // 压缩html
const ejs = require('gulp-ejs'); // ejs
const rimraf = require('rimraf'); // 删除文件

const basePath = {
    src: 'src/',
    dist: 'dist/'
};

const htmlConfig = {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
};

exports.default = function (cb) {
    fs.readFile(basePath.src + 'bookmarks.txt', 'utf8', function (err, data) {
        if (err)
            return console.error(err);

        rimraf(basePath.dist + '*', function () {
            const ejsData = {
                body: data
                    .replace(/<![\s\S]+TITLE>/, '')
                    .replace(/<p>/g, '')
                    .replace(/DL>/g, 'ol>')
                    .replace(/DT>/g, 'li>')
                    .replace(/<A ([\s\S]+?)>/g, function (a, b) {
                        const attr = b.split(' ');
                        let icon = attr[2];
                        if (icon)
                            icon = icon.replace(/^ICON/g, 'src');
                        else
                            icon = 'alt="icon"';
                        return `<img ${icon} /><A ${attr[0]}>`;
                    })
            };

            gulp.src(basePath.src + 'index.ejs')
                .pipe(ejs(ejsData, {}, { ext: '.html' }))
                .pipe(htmlmin(htmlConfig))
                .pipe(gulp.dest(basePath.dist));

            cb();
        });

    });

};