import fs from 'fs';
import fonter from 'gulp-fonter'; // преобразует шрифты из otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // ищем файлы шрифтов .otf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*.otf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: 'FONTS',
                        message: 'Error: <%= error.message %>',
                    }),
                ),
            )
            // конвертируем в .ttf
            .pipe(
                fonter({
                    formats: ['ttf'],
                }),
            )
            .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    );
};

export const ttfToWoff = () => {
    // ищем файлы шрифтов .ttf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: 'FONTS',
                        message: 'Error: <%= error.message %>',
                    }),
                ),
            )
            // конвертируем в .woff
            .pipe(
                fonter({
                    formats: ['woff'],
                }),
            )
            // выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
            // ищем файлы шрифтов .ttf
            .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
            // конвертируем в .woff2
            .pipe(ttf2woff2())
            // выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    );
};

export const fontsStyle = () => {
    // файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/utils/_fonts.scss`;
    // проверяем существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // проверяем существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // если файла нет, то создаём его
                fs.writeFile(fontsFile, '', callback);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    // записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        // имена шрифтов дожны выглядеть так: (названиеШрифта-толщина-стиль.формат) толщина и стиль необязательны
                        // разделим имя файла шрифта на название, толщину, стиль
                        let fontName = fontFileName.split('-')[0]
                            ? fontFileName.split('-')[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split('-')[1]
                            ? fontFileName.split('-')[1]
                            : fontFileName;
                        let fontStyle = fontFileName.split('-')[2]
                            ? fontFileName.split('-')[2]
                            : 'normal';
                        switch (fontWeight.toLowerCase()) {
                            case 'thin':
                                fontWeight = 100;
                                break;
                            case 'extralight':
                                fontWeight = 200;
                                break;
                            case 'light':
                                fontWeight = 300;
                                break;
                            case 'medium':
                                fontWeight = 500;
                                break;
                            case 'semibold':
                                fontWeight = 600;
                                break;
                            case 'bold':
                                fontWeight = 700;
                                break;
                            case 'extrabold':
                            case 'heavy':
                                fontWeight = 800;
                                break;
                            case 'black':
                                fontWeight = 900;
                                break;
                            default:
                                fontWeight = 400;
                                break;
                        }
                        fs.appendFile(
                            fontsFile,
                            `@font-face {\n    font-family: '${fontName}';\n    font-display: swap;\n    src: local('${fontName}'),\n        url('../fonts/${fontFileName}.woff2') format('woff2'),\n        url('../fonts/${fontFileName}.woff') format('woff');\n    font-weight: ${fontWeight};\n    font-style: ${fontStyle};\r\n}\r\n`,
                            callback,
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // если файл существует, выводим сообщение в консоль
                console.log(
                    'Файл scss/_fonts.scss уже существует. Для обновления файла нужно его удалить',
                );
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function callback() {}
};
