#!/usr/bin/env node
/**
 * TODO
 * 1) Сделать прогноз погоды на 4 дня, 2 недели и т.д. есть апи на сайте
 * 2) Сделать просмотр сохраненного токена
 */
import { getArgs } from './helpers/args.helper.js';
import figlet from 'figlet';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';
import { TOKEN_DICTIONARY } from './constants/index.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен успешно сохранен');
  } catch (e) {
    printError(e.message);
  }
};

const initCli = () => {
  figlet.text('Weather CLI', 'Standard', (err, data) => {
    if (err) {
      console.dir(err);
    }
    console.log(data);

    const args = getArgs(process.argv);
    const { h, c, t } = args;

    if (h) {
      printHelp();
    }

    if (c) {
    }

    if (t) {
      return saveToken(t);
    }

    return getWeather('Стрежевой');
  });
};

initCli();
