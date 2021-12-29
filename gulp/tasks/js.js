import webpackStream from 'webpack-stream';

export const js = () => {
    return app.gulp
        .src(app.path.src.js, { sourcemaps: Boolean(app.isDev) })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: 'JS',
                    message: 'Error: <%= error.message %>',
                }),
            ),
        )
        .pipe(
            webpackStream({
                mode: app.isBuild ? 'production' : 'development',
                entry: {
                    page404: './src/js/page404.js',
                    dimensions: './src/js/app.js',
                    policy: './src/js/policy.js',
                    resolutions: './src/js/resolutions.js',
                },
                output: {
                    filename: '[name].min.js',
                },
                module: app.isBuild ? {
                    rules: [
                        {
                            test: /\.js/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                    ],
                } : {},
                // devtool: 'source-map', // раскоментируй если нужен sourcemap для js файлов
            }),
        )
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
};
