#!/usr/bin/env node
import { getArgs } from './helpers/args.helper.js';
import figlet from 'figlet';
import { printHelp } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

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
      saveKeyValue('token', t);
    }

    // вывести погоду
  });
};

initCli();
