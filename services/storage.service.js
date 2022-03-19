import { homedir } from 'os';
import { join } from 'path';

const homeDir = homedir();
const filePath = join(homeDir, 'weather-cli-data.json');

const saveKeyValue = (key, value) => {};

export { saveKeyValue };
