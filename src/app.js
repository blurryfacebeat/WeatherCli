#!/usr/bin/env node
/**
 * TODO
 * 1) Сделать прогноз погоды на 4 дня, 2 недели и т.д. есть апи на сайте
 * 2) Сделать просмотр сохраненных настроек
 * 3) Сделать смену языков
 */
import { getArgs } from './helpers/args.helper.js';
import figlet from 'figlet';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
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

const saveCity = async (city) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город успешно сохранен');
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  const city = await getKeyValue(TOKEN_DICTIONARY.city);
  if (!city) {
    printError('Нет сохраненного города. Воспользуйтесь командой -c [CITY]');
    return;
  }

  try {
    const weather = await getWeather(city);
    return printWeather(weather);
  } catch (e) {
    switch (e.response?.status) {
      case 404:
        printError('Неверно указан город');
        break;
      case 401:
        printError('Неверно указан токен');
        break;
      default:
        printError(e.message);
    }
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
      return saveCity(c);
    }

    if (t) {
      return saveToken(t);
    }

    return getForecast();
  });
};

initCli();
