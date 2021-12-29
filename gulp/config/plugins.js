import replace from 'gulp-replace'; // поиск и замена
import plumber from 'gulp-plumber'; // обработка ошибок
import notify from 'gulp-notify'; // сообщения (подсказки)
import browsersync from 'browser-sync'; // локальный сервер
import newer from 'gulp-newer'; // будет проверять есть ли новые файлы в указаной папке, если есть, то компилирует их, если нет то ничего
import ifPlugin from 'gulp-if';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
};
