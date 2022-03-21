import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

const printError = (error) => {
  console.log(`${chalk.bgRed(' ОШИБКА ')} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(' УСПЕХ ')} ${message}`);
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' СПРАВКА ')}
    Без параметров - вывод погоды
    -c [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    -f получить погоду на 4 дня
    -p показать текущие настройки
    -l [LANG] для установки языка
    `)
  );
};

const printWeather = async (data) => {
  console.log(
    dedent(`${chalk.bgYellow(` ПОГОДА В ГОРОДЕ ${data.name} `)}
    ${await getIcon(data.weather[0].icon)} ${data.weather[0].description}
    Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
    Влажность: ${data.main.humidity}%
    Скорость ветра: ${data.wind.speed}
    `)
  );
};

const printPreferences = () => {};

export { printError, printSuccess, printHelp, printPreferences, printWeather };
