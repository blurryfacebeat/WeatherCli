import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -c [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    -f получить погоду на 4 дня
    `)
  );
};

export { printError, printSuccess, printHelp };
